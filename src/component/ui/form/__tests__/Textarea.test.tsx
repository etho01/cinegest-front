import { render, screen, fireEvent } from '@testing-library/react';
import Textarea from '../Textarea';
import '@testing-library/jest-dom';

describe('Textarea Component', () => {
  it('should render textarea with label', () => {
    render(<Textarea label="Description" />);
    
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render textarea without label when label is empty', () => {
    render(<Textarea label="" />);
    
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should update value on user input', () => {
    render(<Textarea label="Description" />);
    
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Multi-line text content' } });
    
    expect(textarea).toHaveValue('Multi-line text content');
  });

  it('should call onChange callback when value changes', () => {
    const handleChange = jest.fn();
    render(<Textarea label="Description" onChange={handleChange} />);
    
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Test content' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('Test content', expect.any(Object));
  });

  it('should display initial value', () => {
    render(<Textarea label="Description" initialValue="Initial content" />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('Initial content');
  });

  it('should display errors when provided and showErrors is true', () => {
    const errors = { _errors: ['Description is required', 'Must be at least 10 characters'] };
    render(<Textarea label="Description" errors={errors} showErrors={true} />);
    
    expect(screen.getByText('Description is required')).toBeInTheDocument();
    expect(screen.getByText('Must be at least 10 characters')).toBeInTheDocument();
  });

  it('should not display errors when showErrors is false', () => {
    const errors = { _errors: ['Description is required'] };
    render(<Textarea label="Description" errors={errors} showErrors={false} />);
    
    expect(screen.queryByText('Description is required')).not.toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<Textarea label="Description" className="custom-textarea" />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('custom-textarea');
  });

  it('should apply containerClassName to wrapper', () => {
    const { container } = render(<Textarea label="Description" containerClassName="wrapper-class" />);
    
    expect(container.firstChild).toHaveClass('wrapper-class');
  });

  it('should pass through additional props to textarea element', () => {
    render(<Textarea label="Description" placeholder="Enter description" required disabled rows={5} />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('placeholder', 'Enter description');
    expect(textarea).toBeRequired();
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveAttribute('rows', '5');
  });

  it('should link label to textarea using htmlFor/id', () => {
    render(<Textarea label="Description" id="desc-textarea" />);
    
    const label = screen.getByText('Description');
    expect(label).toHaveAttribute('for', 'desc-textarea');
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'desc-textarea');
  });

  it('should handle multiple onChange events', () => {
    const handleChange = jest.fn();
    render(<Textarea label="Description" onChange={handleChange} />);
    
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Line 1' } });
    fireEvent.change(textarea, { target: { value: 'Line 1\nLine 2' } });
    
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(textarea).toHaveValue('Line 1\nLine 2');
  });

  it('should handle long text content', () => {
    const longText = 'Lorem ipsum '.repeat(100);
    render(<Textarea label="Description" initialValue={longText} />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue(longText);
  });

  it('should handle empty string as initial value', () => {
    render(<Textarea label="Description" initialValue="" />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('');
  });
});
