import React from 'react'
import { render, screen } from '@testing-library/react'
import { PageError } from '../PageError'

describe('PageError', () => {
  it('should render error message', () => {
    const error = new Error('Something went wrong')
    render(<PageError error={error} />)
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('should render with error styling', () => {
    const error = new Error('Error occurred')
    const { container } = render(<PageError error={error} />)
    
    const errorElement = screen.getByText('Error occurred')
    expect(errorElement).toBeInTheDocument()
    expect(errorElement).toHaveClass('font-bold')
  })

  it('should render long error messages', () => {
    const longMessage = 'This is a very long error message that provides detailed information about what went wrong in the application and how to potentially fix it.'
    const error = new Error(longMessage)
    
    render(<PageError error={error} />)
    
    expect(screen.getByText(longMessage)).toBeInTheDocument()
  })

  it('should render error in a form wrapper', () => {
    const error = new Error('Test error')
    const { container } = render(<PageError error={error} />)
    
    const form = container.querySelector('form')
    expect(form).toBeInTheDocument()
  })

  it('should center align error message', () => {
    const error = new Error('Centered error')
    render(<PageError error={error} />)
    
    const errorElement = screen.getByText('Centered error')
    expect(errorElement).toHaveClass('text-center')
  })
})
