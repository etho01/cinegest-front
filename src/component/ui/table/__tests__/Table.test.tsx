import React from 'react'
import { render, screen } from '@testing-library/react'
import { Table, Thead, Tbody, Tr, Th, Td } from '../Table'

describe('Table Components', () => {
  describe('Table', () => {
    it('should render table with children', () => {
      render(
        <Table>
          <thead>
            <tr>
              <th>Header</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cell</td>
            </tr>
          </tbody>
        </Table>
      )
      
      const table = screen.getByRole('table')
      expect(table).toBeInTheDocument()
      expect(screen.getByText('Header')).toBeInTheDocument()
      expect(screen.getByText('Cell')).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      const { container } = render(
        <Table className="custom-table">
          <tbody></tbody>
        </Table>
      )
      
      const table = container.querySelector('table')
      expect(table).toHaveClass('custom-table')
      expect(table).toHaveClass('w-full')
    })
  })

  describe('Thead', () => {
    it('should render thead element', () => {
      render(
        <table>
          <Thead>
            <tr>
              <th>Column 1</th>
            </tr>
          </Thead>
        </table>
      )
      
      const thead = screen.getByText('Column 1').closest('thead')
      expect(thead).toBeInTheDocument()
      expect(thead).toHaveClass('text-gray-400')
    })
  })

  describe('Tbody', () => {
    it('should render tbody element', () => {
      render(
        <table>
          <Tbody>
            <tr>
              <td>Data 1</td>
            </tr>
          </Tbody>
        </table>
      )
      
      const tbody = screen.getByText('Data 1').closest('tbody')
      expect(tbody).toBeInTheDocument()
    })
  })

  describe('Tr', () => {
    it('should render tr element', () => {
      render(
        <table>
          <tbody>
            <Tr>
              <td>Cell</td>
            </Tr>
          </tbody>
        </table>
      )
      
      const tr = screen.getByText('Cell').closest('tr')
      expect(tr).toBeInTheDocument()
    })

    it('should apply alternating row styles based on index', () => {
      render(
        <table>
          <tbody>
            <Tr index={0} data-testid="row-0">
              <td>Row 0</td>
            </Tr>
            <Tr index={1} data-testid="row-1">
              <td>Row 1</td>
            </Tr>
          </tbody>
        </table>
      )
      
      const row0 = screen.getByTestId('row-0')
      const row1 = screen.getByTestId('row-1')
      
      expect(row0).toHaveClass('bg-gray-200')
      expect(row1).toHaveClass('hover:bg-gray-100')
    })

    it('should apply custom className', () => {
      render(
        <table>
          <tbody>
            <Tr className="highlighted-row" data-testid="custom-row">
              <td>Cell</td>
            </Tr>
          </tbody>
        </table>
      )
      
      const row = screen.getByTestId('custom-row')
      expect(row).toHaveClass('highlighted-row')
    })
  })

  describe('Th', () => {
    it('should render th element', () => {
      render(
        <table>
          <thead>
            <tr>
              <Th>Column Title</Th>
            </tr>
          </thead>
        </table>
      )
      
      const th = screen.getByText('Column Title')
      expect(th.tagName).toBe('TH')
      expect(th).toHaveClass('pb-3')
    })

    it('should accept scope attribute', () => {
      render(
        <table>
          <thead>
            <tr>
              <Th scope="col">Name</Th>
            </tr>
          </thead>
        </table>
      )
      
      const th = screen.getByText('Name')
      expect(th).toHaveAttribute('scope', 'col')
    })
  })

  describe('Td', () => {
    it('should render td element', () => {
      render(
        <table>
          <tbody>
            <tr>
              <Td>Cell Content</Td>
            </tr>
          </tbody>
        </table>
      )
      
      const td = screen.getByText('Cell Content')
      expect(td.tagName).toBe('TD')
      expect(td).toHaveClass('py-2')
    })

    it('should accept colSpan attribute', () => {
      render(
        <table>
          <tbody>
            <tr>
              <Td colSpan={3}>Merged Cell</Td>
            </tr>
          </tbody>
        </table>
      )
      
      const td = screen.getByText('Merged Cell')
      expect(td).toHaveAttribute('colSpan', '3')
    })
  })

  describe('Table Integration', () => {
    it('should render complete table structure', () => {
      render(
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr index={0}>
              <Td>John Doe</Td>
              <Td>john@example.com</Td>
              <Td>Admin</Td>
            </Tr>
            <Tr index={1}>
              <Td>Jane Smith</Td>
              <Td>jane@example.com</Td>
              <Td>User</Td>
            </Tr>
          </Tbody>
        </Table>
      )
      
      expect(screen.getByRole('table')).toBeInTheDocument()
      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    })
  })
})
