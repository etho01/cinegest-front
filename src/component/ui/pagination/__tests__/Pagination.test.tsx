import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';
import '@testing-library/jest-dom';

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('should render pagination buttons', () => {
    render(<Pagination currentPage={1} lastPage={5} onPageChange={mockOnPageChange} />);
    
    expect(screen.getByText('Première')).toBeInTheDocument();
    expect(screen.getByText('Précédente')).toBeInTheDocument();
    expect(screen.getByText('Suivante')).toBeInTheDocument();
    expect(screen.getByText('Dernière')).toBeInTheDocument();
  });

  it('should render page numbers within window', () => {
    render(<Pagination currentPage={3} lastPage={10} onPageChange={mockOnPageChange} windowSize={2} />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should disable first and previous buttons on first page', () => {
    render(<Pagination currentPage={1} lastPage={5} onPageChange={mockOnPageChange} />);
    
    expect(screen.getByText('Première')).toBeDisabled();
    expect(screen.getByText('Précédente')).toBeDisabled();
  });

  it('should disable last and next buttons on last page', () => {
    render(<Pagination currentPage={5} lastPage={5} onPageChange={mockOnPageChange} />);
    
    expect(screen.getByText('Suivante')).toBeDisabled();
    expect(screen.getByText('Dernière')).toBeDisabled();
  });

  it('should call onPageChange when clicking page number', () => {
    render(<Pagination currentPage={1} lastPage={5} onPageChange={mockOnPageChange} />);
    
    fireEvent.click(screen.getByText('2'));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('should call onPageChange when clicking next button', () => {
    render(<Pagination currentPage={2} lastPage={5} onPageChange={mockOnPageChange} />);
    
    fireEvent.click(screen.getByText('Suivante'));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('should call onPageChange when clicking previous button', () => {
    render(<Pagination currentPage={3} lastPage={5} onPageChange={mockOnPageChange} />);
    
    fireEvent.click(screen.getByText('Précédente'));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('should call onPageChange when clicking first button', () => {
    render(<Pagination currentPage={3} lastPage={5} onPageChange={mockOnPageChange} />);
    
    fireEvent.click(screen.getByText('Première'));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('should call onPageChange when clicking last button', () => {
    render(<Pagination currentPage={2} lastPage={5} onPageChange={mockOnPageChange} />);
    
    fireEvent.click(screen.getByText('Dernière'));
    expect(mockOnPageChange).toHaveBeenCalledWith(5);
  });

  it('should highlight current page', () => {
    render(<Pagination currentPage={3} lastPage={5} onPageChange={mockOnPageChange} />);
    
    const currentPageButton = screen.getByText('3');
    expect(currentPageButton).toHaveClass('bg-gray-100');
    expect(currentPageButton).toHaveClass('font-semibold');
  });

  it('should show ellipsis when pages are skipped', () => {
    render(<Pagination currentPage={5} lastPage={10} onPageChange={mockOnPageChange} windowSize={1} />);
    
    const ellipsis = screen.getAllByText('…');
    expect(ellipsis.length).toBeGreaterThan(0);
  });

  it('should disable all buttons when disabled prop is true', () => {
    render(<Pagination currentPage={3} lastPage={5} onPageChange={mockOnPageChange} disabled={true} />);
    
    expect(screen.getByText('Première')).toBeDisabled();
    expect(screen.getByText('Précédente')).toBeDisabled();
    expect(screen.getByText('Suivante')).toBeDisabled();
    expect(screen.getByText('Dernière')).toBeDisabled();
    expect(screen.getByText('3')).toBeDisabled();
  });

  it('should return null when lastPage is undefined', () => {
    const { container } = render(<Pagination currentPage={1} lastPage={undefined} onPageChange={mockOnPageChange} />);
    
    expect(container.firstChild).toBeNull();
  });

  it('should handle single page correctly', () => {
    render(<Pagination currentPage={1} lastPage={1} onPageChange={mockOnPageChange} />);
    
    expect(screen.getByText('Première')).toBeDisabled();
    expect(screen.getByText('Précédente')).toBeDisabled();
    expect(screen.getByText('Suivante')).toBeDisabled();
    expect(screen.getByText('Dernière')).toBeDisabled();
  });

  it('should respect custom windowSize', () => {
    render(<Pagination currentPage={5} lastPage={10} onPageChange={mockOnPageChange} windowSize={3} />);
    
    // Should show pages 2-8 (5 ± 3)
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
  });
});
