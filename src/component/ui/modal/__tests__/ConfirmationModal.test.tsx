import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ConfirmationModal, ConfirmationModalRef } from '../ConfirmationModal'

// Mock du Portal de Modal
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: React.ReactNode) => node,
}))

describe('ConfirmationModal', () => {
  it('should not render dialog when closed', () => {
    const ref = React.createRef<ConfirmationModalRef>()
    render(<ConfirmationModal ref={ref} />)
    
    const modal = screen.queryByText('Confirmer')
    expect(modal).not.toBeInTheDocument()
  })

  it('should open with title and message', async () => {
    const ref = React.createRef<ConfirmationModalRef>()
    const onConfirm = jest.fn()
    
    render(<ConfirmationModal ref={ref} />)
    
    ref.current?.open('Delete Item', 'Are you sure you want to delete this item?', onConfirm)
    
    await waitFor(() => {
      expect(screen.getByText('Delete Item')).toBeInTheDocument()
    })
    expect(screen.getByText('Are you sure you want to delete this item?')).toBeInTheDocument()
  })

  it('should call onConfirm when Confirmer button is clicked', async () => {
    const ref = React.createRef<ConfirmationModalRef>()
    const onConfirm = jest.fn()
    
    render(<ConfirmationModal ref={ref} />)
    
    ref.current?.open('Confirm Action', 'Please confirm', onConfirm)
    
    await waitFor(() => {
      expect(screen.getByText('Confirmer')).toBeInTheDocument()
    })
    
    const confirmButton = screen.getByText('Confirmer')
    fireEvent.click(confirmButton)
    
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('should call onClose when Annuler button is clicked', async () => {
    const ref = React.createRef<ConfirmationModalRef>()
    const onConfirm = jest.fn()
    const onClose = jest.fn()
    
    render(<ConfirmationModal ref={ref} />)
    
    ref.current?.open('Confirm', 'Message', onConfirm, onClose)
    
    await waitFor(() => {
      expect(screen.getByText('Annuler')).toBeInTheDocument()
    })
    
    const cancelButton = screen.getByText('Annuler')
    fireEvent.click(cancelButton)
    
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(onConfirm).not.toHaveBeenCalled()
  })

  it('should close modal after confirmation', async () => {
    const ref = React.createRef<ConfirmationModalRef>()
    const onConfirm = jest.fn()
    const onClose = jest.fn()
    
    render(<ConfirmationModal ref={ref} />)
    
    ref.current?.open('Test', 'Test message', onConfirm, onClose)
    
    await waitFor(() => {
      expect(screen.getByText('Confirmer')).toBeInTheDocument()
    })
    
    const confirmButton = screen.getByText('Confirmer')
    fireEvent.click(confirmButton)
    
    expect(onConfirm).toHaveBeenCalled()
    expect(onClose).toHaveBeenCalled()
  })
})
