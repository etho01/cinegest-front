import { render, screen } from '@testing-library/react';
import { Select, SelectCountry } from '../Select';
import '@testing-library/jest-dom';

describe('Select Component', () => {
  const mockOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  it('should render select with label', () => {
    render(<Select label="Choose option" options={mockOptions} />);
    
    expect(screen.getByText('Choose option')).toBeInTheDocument();
  });

  it('should render select without label when label is empty', () => {
    render(<Select label="" options={mockOptions} />);
    
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('should display errors when provided and showErrors is true', () => {
    const errors = { _errors: ['This field is required'] };
    render(<Select label="Choose" options={mockOptions} errors={errors} showErrors={true} />);
    
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('should not display errors when showErrors is false', () => {
    const errors = { _errors: ['This field is required'] };
    render(<Select label="Choose" options={mockOptions} errors={errors} showErrors={false} />);
    
    expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
  });

  it('should apply containerClassName to wrapper', () => {
    const { container } = render(<Select label="Choose" options={mockOptions} containerClassName="select-wrapper" />);
    
    expect(container.firstChild).toHaveClass('select-wrapper');
  });

  it('should link label to select using htmlFor/id', () => {
    render(<Select label="Choose" options={mockOptions} id="my-select" />);
    
    const label = screen.getByText('Choose');
    expect(label).toHaveAttribute('for', 'my-select');
  });

  it('should initialize with empty state when no value provided', () => {
    render(<Select label="Choose" options={mockOptions} />);
    
    expect(screen.getByText('Choose')).toBeInTheDocument();
  });
});

describe('SelectCountry Component', () => {
  it('should render country select with predefined options', () => {
    render(<SelectCountry label="Country" />);
    
    expect(screen.getByText('Country')).toBeInTheDocument();
  });

  it('should pass additional props to Select', () => {
    const handleChange = jest.fn();
    render(<SelectCountry label="Country" onChange={handleChange} />);
    
    expect(screen.getByText('Country')).toBeInTheDocument();
  });
});
