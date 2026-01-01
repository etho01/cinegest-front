import { render, screen } from '@testing-library/react';
import { ReviewElement } from '../ReviewElement';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';

describe('ReviewElement Component', () => {
  it('should render title and children', () => {
    render(
      <ReviewElement title="Test Title">
        <span>Test Content</span>
      </ReviewElement>
    );
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should apply custom containerClassName', () => {
    const { container } = render(
      <ReviewElement title="Title" containerClassName="custom-container">
        Content
      </ReviewElement>
    );
    
    expect(container.firstChild).toHaveClass('custom-container');
  });

  it('should apply custom titleClassName', () => {
    render(
      <ReviewElement title="Title" titleClassName="custom-title">
        Content
      </ReviewElement>
    );
    
    const title = screen.getByText('Title');
    expect(title).toHaveClass('custom-title');
  });

  it('should apply custom childrenClassName', () => {
    render(
      <ReviewElement title="Title" childrenClassName="custom-children">
        <span>Content</span>
      </ReviewElement>
    );
    
    const content = screen.getByText('Content').parentElement;
    expect(content).toHaveClass('custom-children');
  });

  it('should show update button when updateFunction is provided', () => {
    const mockUpdate = jest.fn();
    render(
      <ReviewElement title="Title" updateFunction={mockUpdate}>
        Content
      </ReviewElement>
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should not show update button when updateFunction is not provided', () => {
    render(
      <ReviewElement title="Title">
        Content
      </ReviewElement>
    );
    
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should call updateFunction when update button is clicked', () => {
    const mockUpdate = jest.fn();
    render(
      <ReviewElement title="Title" updateFunction={mockUpdate}>
        Content
      </ReviewElement>
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockUpdate).toHaveBeenCalledTimes(1);
  });

  it('should hide update button when showUpdate is false', () => {
    const mockUpdate = jest.fn();
    render(
      <ReviewElement title="Title" updateFunction={mockUpdate} showUpdate={false}>
        Content
      </ReviewElement>
    );
    
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should show update button when showUpdate is true', () => {
    const mockUpdate = jest.fn();
    render(
      <ReviewElement title="Title" updateFunction={mockUpdate} showUpdate={true}>
        Content
      </ReviewElement>
    );
    
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render complex children', () => {
    render(
      <ReviewElement title="Title">
        <div>
          <h1>Heading</h1>
          <p>Paragraph</p>
        </div>
      </ReviewElement>
    );
    
    expect(screen.getByText('Heading')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
  });

  it('should have default font-semibold class on title', () => {
    render(
      <ReviewElement title="Title">
        Content
      </ReviewElement>
    );
    
    const title = screen.getByText('Title');
    expect(title).toHaveClass('font-semibold');
  });
});
