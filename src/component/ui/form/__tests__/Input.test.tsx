import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../Input';
import '@testing-library/jest-dom';

describe('Input Component', () => {
  it('should render input with label', () => {
    render(<Input label="Test Label" />);
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render input without label when label is empty', () => {
    render(<Input label="" />);
    
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should update value on user input', () => {
    render(<Input label="Name" />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'John Doe' } });
    
    expect(input).toHaveValue('John Doe');
  });

  it('should call onChange callback when value changes', () => {
    const handleChange = jest.fn();
    render(<Input label="Name" onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Test Value' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('Test Value', expect.any(Object));
  });

  it('should display initial value', () => {
    render(<Input label="Name" initialValue="Initial Value" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Initial Value');
  });

  it('should render with different input types', () => {
    render(<Input label="Email" type="email" />);
    const emailInput = screen.getByRole('textbox');
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  it('should display errors when provided and showErrors is true', () => {
    const errors = { _errors: ['This field is required', 'Must be valid email'] };
    render(<Input label="Email" errors={errors} showErrors={true} />);
    
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByText('Must be valid email')).toBeInTheDocument();
  });

  it('should not display errors when showErrors is false', () => {
    const errors = { _errors: ['This field is required'] };
    render(<Input label="Email" errors={errors} showErrors={false} />);
    
    expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<Input label="Name" className="custom-class" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('should apply containerClassName to wrapper', () => {
    const { container } = render(<Input label="Name" containerClassName="container-class" />);
    
    expect(container.firstChild).toHaveClass('container-class');
  });

  it('should pass through additional props to input element', () => {
    render(<Input label="Name" placeholder="Enter name" required disabled />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Enter name');
    expect(input).toBeRequired();
    expect(input).toBeDisabled();
  });

  it('should link label to input using htmlFor/id', () => {
    render(<Input label="Name" id="name-input" />);
    
    const label = screen.getByText('Name');
    expect(label).toHaveAttribute('for', 'name-input');
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'name-input');
  });

  it('should handle multiple onChange events', () => {
    const handleChange = jest.fn();
    render(<Input label="Name" onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'A' } });
    fireEvent.change(input, { target: { value: 'AB' } });
    fireEvent.change(input, { target: { value: 'ABC' } });
    
    expect(handleChange).toHaveBeenCalledTimes(3);
    expect(input).toHaveValue('ABC');
  });

  it('should handle empty string as initial value', () => {
    render(<Input label="Name" initialValue="" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');
  });
});
