import { render, screen } from '@testing-library/react';
import { ReviewCategory } from '../ReviewCategory';
import '@testing-library/jest-dom';

describe('ReviewCategory Component', () => {
  it('should render title', () => {
    render(<ReviewCategory title="Category Title">Content</ReviewCategory>);
    
    expect(screen.getByText('Category Title')).toBeInTheDocument();
  });

  it('should render children content', () => {
    render(
      <ReviewCategory title="Title">
        <div>Child Content</div>
      </ReviewCategory>
    );
    
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('should apply heading styles to title', () => {
    render(<ReviewCategory title="Title">Content</ReviewCategory>);
    
    const title = screen.getByText('Title');
    expect(title.tagName).toBe('H2');
    expect(title).toHaveClass('text-2xl');
    expect(title).toHaveClass('font-bold');
    expect(title).toHaveClass('mb-4');
  });

  it('should render multiple children', () => {
    render(
      <ReviewCategory title="Title">
        <div>First Child</div>
        <div>Second Child</div>
        <div>Third Child</div>
      </ReviewCategory>
    );
    
    expect(screen.getByText('First Child')).toBeInTheDocument();
    expect(screen.getByText('Second Child')).toBeInTheDocument();
    expect(screen.getByText('Third Child')).toBeInTheDocument();
  });

  it('should render complex nested children', () => {
    render(
      <ReviewCategory title="Complex">
        <section>
          <h3>Subsection</h3>
          <p>Paragraph</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </section>
      </ReviewCategory>
    );
    
    expect(screen.getByText('Subsection')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('should handle empty children', () => {
    const { container } = render(<ReviewCategory title="Title" />);
    
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('should render with long title', () => {
    const longTitle = 'This is a very long category title that should still render properly';
    render(<ReviewCategory title={longTitle}>Content</ReviewCategory>);
    
    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });
});
