import { renderHook, waitFor, act } from '@testing-library/react'
import { usePaginatedResource, defaultFetcher } from '../usePaginatedResource'
import { Unauthorized } from '@/src/domain/User'

describe('usePaginatedResource', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    global.fetch = jest.fn()
    window.history.replaceState = jest.fn()
    window.history.pushState = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('defaultFetcher', () => {
    it('should fetch and parse JSON data successfully', async () => {
      const mockData = { data: [], current_page: 1, last_page: 1 }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockData,
      })

      const result = await defaultFetcher('/api/test')
      expect(result).toEqual(mockData)
    })

    it('should throw Unauthorized on 403 status', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 403,
      })

      await expect(defaultFetcher('/api/test')).rejects.toThrow(Unauthorized)
    })

    it('should throw error on non-ok response', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      })

      await expect(defaultFetcher('/api/test')).rejects.toThrow('Erreur API (500)')
    })
  })

  describe('usePaginatedResource hook', () => {
    it('should initialize with default values', () => {
      const { result } = renderHook(() =>
        usePaginatedResource({
          endpoint: '/api/users',
          syncUrl: false,
        })
      )

      expect(result.current.data).toBeNull()
      expect(result.current.page).toBe(1)
      expect(result.current.params).toEqual({})
      // The hook makes a fetch call which may set an error if not mocked properly
      // For initialization test, we don't care about the error state
    })

    it('should initialize with initial data', () => {
      const initialData = {
        data: [{ id: 1, name: 'Test' }],
        current_page: 1,
        last_page: 5,
        per_page: 10,
        total: 50,
        from: 1,
        to: 10,
        first_page_url: '/api/users?page=1',
        last_page_url: '/api/users?page=5',
        links: [],
        next_page_url: '/api/users?page=2',
        path: '/api/users',
        prev_page_url: null,
      }

      const { result } = renderHook(() =>
        usePaginatedResource({
          endpoint: '/api/users',
          initialData,
          syncUrl: false,
        })
      )

      expect(result.current.data).toEqual(initialData)
      expect(result.current.page).toBe(1)
    })

    it('should fetch data on mount', async () => {
      const mockData = {
        data: [{ id: 1, name: 'User 1' }],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 1,
        from: 1,
        to: 1,
        first_page_url: '/api/users?page=1',
        last_page_url: '/api/users?page=1',
        links: [],
        next_page_url: null,
        path: '/api/users',
        prev_page_url: null,
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockData,
      })

      const { result } = renderHook(() =>
        usePaginatedResource({
          endpoint: '/api/users',
          syncUrl: false,
        })
      )

      await waitFor(() => {
        expect(result.current.data).toEqual(mockData)
      })

      // The URL includes full path with localhost in test environment
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/users?page=1'),
        expect.objectContaining({ signal: expect.any(AbortSignal) })
      )
    })

    it('should update page and refetch', async () => {
      const mockData1 = {
        data: [{ id: 1 }],
        current_page: 1,
        last_page: 3,
        per_page: 10,
        total: 30,
        from: 1,
        to: 10,
      }

      const mockData2 = {
        data: [{ id: 11 }],
        current_page: 2,
        last_page: 3,
        per_page: 10,
        total: 30,
        from: 11,
        to: 20,
      }

      ;(global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockData1,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockData2,
        })

      const { result } = renderHook(() =>
        usePaginatedResource({
          endpoint: '/api/users',
          syncUrl: false,
        })
      )

      await waitFor(() => {
        expect(result.current.data).toEqual(mockData1)
      })

      act(() => {
        result.current.setPage(2)
      })

      await waitFor(() => {
        expect(result.current.data).toEqual(mockData2)
        expect(result.current.page).toBe(2)
      })

      // The URL includes the full path with page param
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('page=2'),
        expect.any(Object)
      )
    })

    it('should update params and reset page to 1', async () => {
      const mockData = {
        data: [],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
        from: 1,
        to: 0,
      }

      ;(global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      })

      const { result } = renderHook(() =>
        usePaginatedResource({
          endpoint: '/api/users',
          syncUrl: false,
        })
      )

      await waitFor(() => {
        expect(result.current.data).toBeTruthy()
      })

      act(() => {
        result.current.setPage(3)
      })

      await waitFor(() => {
        expect(result.current.page).toBe(3)
      })

      act(() => {
        result.current.updateParam('search', 'test')
      })

      await waitFor(() => {
        expect(result.current.page).toBe(1)
        expect(result.current.params).toEqual({ search: 'test' })
      })
    })

    it('should handle fetch errors', async () => {
      const error = new Error('Network error')
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(error)

      const { result } = renderHook(() =>
        usePaginatedResource({
          endpoint: '/api/users',
          syncUrl: false,
        })
      )

      await waitFor(() => {
        expect(result.current.error).toEqual(error)
        expect(result.current.isPending).toBe(false)
      })
    })

    it('should refresh data', async () => {
      const mockData1 = {
        data: [{ id: 1 }],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 1,
        from: 1,
        to: 1,
      }

      const mockData2 = {
        data: [{ id: 1 }, { id: 2 }],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 2,
        from: 1,
        to: 2,
      }

      ;(global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockData1,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockData2,
        })

      const { result } = renderHook(() =>
        usePaginatedResource({
          endpoint: '/api/users',
          syncUrl: false,
        })
      )

      await waitFor(() => {
        expect(result.current.data).toEqual(mockData1)
      })

      act(() => {
        result.current.refresh()
      })

      await waitFor(() => {
        expect(result.current.data).toEqual(mockData2)
      })
    })

    it('should abort previous requests when new request is made', async () => {
      const mockData = {
        data: [],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
        from: 1,
        to: 0,
      }

      let abortSignal: AbortSignal | undefined

      ;(global.fetch as jest.Mock).mockImplementation((_, init) => {
        abortSignal = init?.signal
        return Promise.resolve({
          ok: true,
          json: async () => mockData,
        })
      })

      const { result } = renderHook(() =>
        usePaginatedResource({
          endpoint: '/api/users',
          syncUrl: false,
        })
      )

      await waitFor(() => {
        expect(result.current.data).toBeTruthy()
      })

      const firstSignal = abortSignal

      act(() => {
        result.current.setPage(2)
      })

      await waitFor(() => {
        expect(firstSignal?.aborted).toBe(true)
      })
    })

    it('should sync URL when syncUrl is true', async () => {
      const mockData = {
        data: [],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
        from: 1,
        to: 0,
      }

      ;(global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      })

      // Mock location without redefining
      Object.defineProperty(window, 'location', {
        value: { pathname: '/users', search: '' },
        writable: true,
        configurable: true,
      })

      const { result } = renderHook(() =>
        usePaginatedResource({
          endpoint: '/api/users',
          syncUrl: true,
          usePushState: false,
        })
      )

      await waitFor(() => {
        expect(result.current.data).toBeTruthy()
      })

      act(() => {
        result.current.setPage(2)
      })

      await waitFor(() => {
        expect(window.history.replaceState).toHaveBeenCalled()
      })
    })

    it('should use pushState when usePushState is true', async () => {
      const mockData = {
        data: [],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
        from: 1,
        to: 0,
      }

      ;(global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      })

      // Mock location without redefining
      Object.defineProperty(window, 'location', {
        value: { pathname: '/users', search: '' },
        writable: true,
        configurable: true,
      })

      const { result } = renderHook(() =>
        usePaginatedResource({
          endpoint: '/api/users',
          syncUrl: true,
          usePushState: true,
        })
      )

      await waitFor(() => {
        expect(result.current.data).toBeTruthy()
      })

      act(() => {
        result.current.setPage(2)
      })

      await waitFor(() => {
        expect(window.history.pushState).toHaveBeenCalled()
      })
    })

    it('should handle setParams with updater function', async () => {
      const mockData = {
        data: [],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
        from: 1,
        to: 0,
      }

      ;(global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      })

      const { result } = renderHook(() =>
        usePaginatedResource({
          endpoint: '/api/users',
          syncUrl: false,
          initialParams: { filter: 'active' },
        })
      )

      await waitFor(() => {
        expect(result.current.data).toBeTruthy()
      })

      act(() => {
        result.current.setParams((prev) => ({ ...prev, search: 'test' }))
      })

      await waitFor(() => {
        expect(result.current.params).toEqual({ filter: 'active', search: 'test' })
        expect(result.current.page).toBe(1)
      })
    })
  })
})
