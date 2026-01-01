import { render, screen } from '@testing-library/react';
import Card from '../card';
import '@testing-library/jest-dom';

describe('Card Component', () => {
  it('should render children content', () => {
    render(<Card>Test Content</Card>);
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should apply default classes', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild as HTMLElement;
    
    expect(card).toHaveClass('bg-white');
    expect(card).toHaveClass('shadow');
    expect(card).toHaveClass('rounded-lg');
  });

  it('should apply custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    const card = container.firstChild as HTMLElement;
    
    expect(card).toHaveClass('custom-class');
    expect(card).toHaveClass('bg-white'); // Should still have default classes
  });

  it('should render complex children', () => {
    render(
      <Card>
        <h1>Title</h1>
        <p>Paragraph</p>
      </Card>
    );
    
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
  });

  it('should render empty card', () => {
    const { container } = render(<Card />);
    
    expect(container.firstChild).toBeInTheDocument();
  });
});
