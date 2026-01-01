import { render, screen } from '@testing-library/react';
import { FormButton } from '../form-button';
import '@testing-library/jest-dom';

describe('FormButton Component', () => {
  it('should render button with type submit', () => {
    render(<FormButton>Submit</FormButton>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveTextContent('Submit');
  });

  it('should render with default variant', () => {
    render(<FormButton>Save</FormButton>);
    
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render with custom variant', () => {
    render(<FormButton variant="destructive">Delete</FormButton>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Delete');
  });

  it('should pass through additional Button props', () => {
    render(<FormButton disabled>Disabled Button</FormButton>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should render children content', () => {
    render(
      <FormButton>
        <span>Complex Content</span>
      </FormButton>
    );
    
    expect(screen.getByText('Complex Content')).toBeInTheDocument();
  });

  it('should maintain submit type even with other props', () => {
    render(<FormButton variant="outline" disabled>Submit Form</FormButton>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toBeDisabled();
  });
});
