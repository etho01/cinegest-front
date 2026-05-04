import { render, screen } from '@testing-library/react'
import { PaginationTab } from '../PaginationTab'
import { Paginator } from '../PaginationType'

// Mock the hook
import { usePaginatedResource } from '../../../hook/usePaginatedResource'
jest.mock('../../../hook/usePaginatedResource', () => ({
  usePaginatedResource: jest.fn(),
}))

describe('PaginationTab', () => {
  const mockData: Paginator<{ id: number; name: string }> = {
    data: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ],
    current_page: 1,
    last_page: 3,
    per_page: 10,
    total: 25,
    from: 1,
    to: 3,
  }

  const defaultProps = {
    endpoint: '/api/items',
    colList: ['ID', 'Name', 'Actions'],
    lineRenderer: (item: { id: number; name: string }) => (
      <>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>
          <button>Edit</button>
        </td>
      </>
    ),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render loading state', () => {
    usePaginatedResource.mockReturnValue({
      data: null,
      error: null,
      isPending: true,
      page: 1,
      setPage: jest.fn(),
      updateParam: jest.fn(),
      refresh: jest.fn(),
    })

    render(<PaginationTab {...defaultProps} />)

    expect(screen.getByText('Chargement...')).toBeInTheDocument()
  })

  it('should render table headers', () => {
    usePaginatedResource.mockReturnValue({
      data: mockData,
      error: null,
      isPending: false,
      page: 1,
      setPage: jest.fn(),
      updateParam: jest.fn(),
      refresh: jest.fn(),
    })

    render(<PaginationTab {...defaultProps} />)

    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  it('should render data rows', () => {
    usePaginatedResource.mockReturnValue({
      data: mockData,
      error: null,
      isPending: false,
      page: 1,
      setPage: jest.fn(),
      updateParam: jest.fn(),
      refresh: jest.fn(),
    })

    render(<PaginationTab {...defaultProps} />)

    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
  })

  it('should render empty state when no data', () => {
    usePaginatedResource.mockReturnValue({
      data: { ...mockData, data: [] },
      error: null,
      isPending: false,
      page: 1,
      setPage: jest.fn(),
      updateParam: jest.fn(),
      refresh: jest.fn(),
    })

    render(<PaginationTab {...defaultProps} />)

    expect(screen.getByText('Aucun élément')).toBeInTheDocument()
  })

  it('should render error state', () => {
    const error = new Error('Failed to load data')
    usePaginatedResource.mockReturnValue({
      data: null,
      error,
      isPending: false,
      page: 1,
      setPage: jest.fn(),
      updateParam: jest.fn(),
      refresh: jest.fn(),
    })

    render(<PaginationTab {...defaultProps} />)

    expect(screen.getByText(/Erreur lors du chargement des données/)).toBeInTheDocument()
    expect(screen.getByText(/Failed to load data/)).toBeInTheDocument()
  })

  it('should render pagination when not pending', () => {
    usePaginatedResource.mockReturnValue({
      data: mockData,
      error: null,
      isPending: false,
      page: 1,
      setPage: jest.fn(),
      updateParam: jest.fn(),
      refresh: jest.fn(),
    })

    const { container } = render(<PaginationTab {...defaultProps} />)

    // Pagination component should be rendered - check for navigation element
    const pagination = container.querySelector('nav') || container.querySelector('[role="navigation"]')
    expect(pagination).toBeInTheDocument()
  })

  it('should not render pagination when pending', () => {
    usePaginatedResource.mockReturnValue({
      data: null,
      error: null,
      isPending: true,
      page: 1,
      setPage: jest.fn(),
      updateParam: jest.fn(),
      refresh: jest.fn(),
    })

    const { container } = render(<PaginationTab {...defaultProps} />)

    // Pagination should not be present
    const pagination = container.querySelector('nav')
    expect(pagination).not.toBeInTheDocument()
  })

  it('should pass initial data to hook', () => {
    const initialData = mockData

    usePaginatedResource.mockReturnValue({
      data: initialData,
      error: null,
      isPending: false,
      page: 1,
      setPage: jest.fn(),
      updateParam: jest.fn(),
      refresh: jest.fn(),
    })

    render(<PaginationTab {...defaultProps} initialData={initialData} />)

    expect(usePaginatedResource).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: '/api/items',
        initialData,
      })
    )
  })

  it('should pass initial params to hook', () => {
    const initialParams = { filter: 'active', sort: 'name' }

    usePaginatedResource.mockReturnValue({
      data: mockData,
      error: null,
      isPending: false,
      page: 1,
      setPage: jest.fn(),
      updateParam: jest.fn(),
      refresh: jest.fn(),
    })

    render(<PaginationTab {...defaultProps} initialParams={initialParams} />)

    expect(usePaginatedResource).toHaveBeenCalledWith(
      expect.objectContaining({
        initialParams,
      })
    )
  })

  it('should expose updateParam and refresh via ref', () => {
    const mockUpdateParam = jest.fn()
    const mockRefresh = jest.fn()
    const ref = { current: null }

    usePaginatedResource.mockReturnValue({
      data: mockData,
      error: null,
      isPending: false,
      page: 1,
      setPage: jest.fn(),
      updateParam: mockUpdateParam,
      refresh: mockRefresh,
    })

    render(<PaginationTab {...defaultProps} ref={ref} />)

    expect(ref.current).toBeTruthy()
    expect(ref.current).toHaveProperty('updateParam')
    expect(ref.current).toHaveProperty('refresh')
  })
})
