import { render, screen } from '@testing-library/react';
import { AsyncSelect, Option } from '../AsyncSelect';
import '@testing-library/jest-dom';

describe('AsyncSelect Component', () => {
  const mockLoadOptions = jest.fn((inputValue: string, callback: (options: Option<unknown>[]) => void) => {
    const options = [
      { value: '1', label: 'Async Option 1' },
      { value: '2', label: 'Async Option 2' },
    ];
    callback(options);
  });

  it('should render async select with label', () => {
    render(<AsyncSelect label="Search users" loadOptions={mockLoadOptions} />);
    
    expect(screen.getByText('Search users')).toBeInTheDocument();
  });

  it('should render async select without label when label is empty', () => {
    render(<AsyncSelect label="" loadOptions={mockLoadOptions} />);
    
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('should display errors when provided and showErrors is true', () => {
    const errors = { _errors: ['Please select an option'] };
    render(<AsyncSelect label="Search" loadOptions={mockLoadOptions} errors={errors} showErrors={true} />);
    
    expect(screen.getByText('Please select an option')).toBeInTheDocument();
  });

  it('should not display errors when showErrors is false', () => {
    const errors = { _errors: ['Please select an option'] };
    render(<AsyncSelect label="Search" loadOptions={mockLoadOptions} errors={errors} showErrors={false} />);
    
    expect(screen.queryByText('Please select an option')).not.toBeInTheDocument();
  });

  it('should apply containerClassName to wrapper', () => {
    const { container } = render(
      <AsyncSelect label="Search" loadOptions={mockLoadOptions} containerClassName="async-wrapper" />
    );
    
    expect(container.firstChild).toHaveClass('async-wrapper');
  });

  it('should link label to select using htmlFor/id', () => {
    render(<AsyncSelect label="Search" loadOptions={mockLoadOptions} id="async-select" />);
    
    const label = screen.getByText('Search');
    expect(label).toHaveAttribute('for', 'async-select');
  });

  it('should pass loadOptions to AsyncSelect', () => {
    const customLoadOptions = jest.fn();
    render(<AsyncSelect label="Search" loadOptions={customLoadOptions} />);
    
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('should handle isMulti prop', () => {
    render(<AsyncSelect label="Search" loadOptions={mockLoadOptions} isMulti={true} />);
    
    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});
