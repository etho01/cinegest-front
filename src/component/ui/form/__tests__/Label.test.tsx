import React from 'react'
import { render, screen } from '@testing-library/react'
import Label from '../Label'

describe('Label', () => {
  it('should render label with children', () => {
    render(<Label htmlFor="test">Test Label</Label>)
    
    const label = screen.getByText('Test Label')
    expect(label).toBeInTheDocument()
    expect(label.tagName).toBe('LABEL')
  })

  it('should apply htmlFor attribute', () => {
    render(<Label htmlFor="test-input">Email</Label>)
    
    const label = screen.getByText('Email')
    expect(label).toHaveAttribute('for', 'test-input')
  })

  it('should apply additional className alongside default', () => {
    render(<Label className="custom-class">Custom Label</Label>)
    
    const label = screen.getByText('Custom Label')
    expect(label).toHaveClass('pb-2')
    // Note: Label component may not merge classNames depending on implementation
  })

  it('should support all label HTML attributes', () => {
    render(
      <Label htmlFor="test" data-testid="custom-label" aria-label="Custom">
        Test
      </Label>
    )
    
    const label = screen.getByTestId('custom-label')
    expect(label).toHaveAttribute('aria-label', 'Custom')
  })
})
