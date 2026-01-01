import { render, screen } from '@testing-library/react';
import { StatusItem } from '../StatusItem';
import '@testing-library/jest-dom';

describe('StatusItem Component', () => {
  it('should render status text', () => {
    render(<StatusItem status="Active" />);
    
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('should apply success variant styles by default', () => {
    render(<StatusItem status="Success" />);
    
    const element = screen.getByText('Success');
    expect(element).toHaveClass('text-green-600');
  });

  it('should apply danger variant styles', () => {
    render(<StatusItem status="Error" variant="danger" />);
    
    const element = screen.getByText('Error');
    expect(element).toHaveClass('text-red-600');
  });

  it('should apply warning variant styles', () => {
    render(<StatusItem status="Warning" variant="warning" />);
    
    const element = screen.getByText('Warning');
    expect(element).toHaveClass('text-yellow-600');
  });

  it('should apply primary variant styles', () => {
    render(<StatusItem status="Primary" variant="primary" />);
    
    const element = screen.getByText('Primary');
    expect(element).toHaveClass('text-primary');
  });

  it('should apply secondary variant styles', () => {
    render(<StatusItem status="Secondary" variant="secondary" />);
    
    const element = screen.getByText('Secondary');
    expect(element).toHaveClass('text-secondary');
  });

  it('should apply other variant without color class', () => {
    render(<StatusItem status="Other" variant="other" />);
    
    const element = screen.getByText('Other');
    expect(element).toHaveClass('font-semibold');
    expect(element).not.toHaveClass('text-green-600');
    expect(element).not.toHaveClass('text-red-600');
  });

  it('should apply custom className', () => {
    render(<StatusItem status="Custom" className="custom-class" />);
    
    const element = screen.getByText('Custom');
    expect(element).toHaveClass('custom-class');
  });

  it('should always apply font-semibold', () => {
    render(<StatusItem status="Test" variant="danger" />);
    
    const element = screen.getByText('Test');
    expect(element).toHaveClass('font-semibold');
  });

  it('should combine variant and custom className', () => {
    render(<StatusItem status="Combined" variant="success" className="extra-class" />);
    
    const element = screen.getByText('Combined');
    expect(element).toHaveClass('text-green-600');
    expect(element).toHaveClass('extra-class');
  });

  it('should handle empty status string', () => {
    const { container } = render(<StatusItem status="" />);
    
    const element = container.querySelector('div');
    expect(element).toBeInTheDocument();
  });

  it('should handle long status text', () => {
    const longStatus = 'This is a very long status message that should still render correctly';
    render(<StatusItem status={longStatus} />);
    
    expect(screen.getByText(longStatus)).toBeInTheDocument();
  });
});
