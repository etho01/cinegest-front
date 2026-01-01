import React from 'react'
import { render, screen } from '@testing-library/react'
import { FormError } from '../FormError'

describe('FormError', () => {
  it('should render error messages', () => {
    const errors = {
      _errors: ['Error 1', 'Error 2', 'Error 3']
    }

    render(<FormError errors={errors} />)
    
    expect(screen.getByText('Error 1')).toBeInTheDocument()
    expect(screen.getByText('Error 2')).toBeInTheDocument()
    expect(screen.getByText('Error 3')).toBeInTheDocument()
  })

  it('should render nothing when no errors', () => {
    const { container } = render(<FormError errors={undefined} />)
    
    // Container should have empty fragment
    expect(container.querySelector('ul')).not.toBeInTheDocument()
  })

  it('should render empty list when errors object is empty', () => {
    const errors = {}
    const { container } = render(<FormError errors={errors} />)
    
    // ul is rendered but empty
    const list = container.querySelector('ul')
    if (list) {
      expect(list.children.length).toBe(0)
    }
  })

  it('should apply red text color to error messages', () => {
    const errors = {
      _errors: ['Validation error']
    }

    render(<FormError errors={errors} />)
    
    const errorElement = screen.getByText('Validation error')
    expect(errorElement).toHaveClass('text-red-500')
  })

  it('should render multiple errors in a list', () => {
    const errors = {
      _errors: ['First error', 'Second error']
    }

    render(<FormError errors={errors} />)
    
    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
    expect(list.children).toHaveLength(2)
  })

  it('should handle single error', () => {
    const errors = {
      _errors: ['Single error message']
    }

    render(<FormError errors={errors} />)
    
    expect(screen.getByText('Single error message')).toBeInTheDocument()
  })

  it('should handle empty errors array', () => {
    const errors = {
      _errors: []
    }

    const { container } = render(<FormError errors={errors} />)
    
    // Should render ul but no li elements
    const list = container.querySelector('ul')
    expect(list).toBeInTheDocument()
    expect(list?.children).toHaveLength(0)
  })
})
