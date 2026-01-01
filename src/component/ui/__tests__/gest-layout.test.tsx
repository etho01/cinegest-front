import { render, screen } from '@testing-library/react';
import { GestLayout } from '../gest-layout';
import '@testing-library/jest-dom';

describe('GestLayout Component', () => {
  it('should render children content', () => {
    render(
      <GestLayout>
        <div>Test Content</div>
      </GestLayout>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should apply layout wrapper classes', () => {
    const { container } = render(<GestLayout>Content</GestLayout>);
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('min-h-screen');
    expect(wrapper).toHaveClass('flex');
    expect(wrapper).toHaveClass('bg-gray-100');
  });

  it('should render centered layout structure', () => {
    const { container } = render(<GestLayout>Content</GestLayout>);
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('items-center');
    expect(wrapper).toHaveClass('sm:justify-center');
  });

  it('should have white background card for content', () => {
    const { container } = render(<GestLayout>Content</GestLayout>);
    
    const contentCard = container.querySelector('.bg-white');
    expect(contentCard).toBeInTheDocument();
    expect(contentCard).toHaveClass('shadow-md');
    expect(contentCard).toHaveClass('sm:rounded-lg');
  });

  it('should render complex children structure', () => {
    render(
      <GestLayout>
        <h1>Title</h1>
        <form>
          <input type="text" />
          <button>Submit</button>
        </form>
      </GestLayout>
    );
    
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should apply max width constraint', () => {
    const { container } = render(<GestLayout>Content</GestLayout>);
    
    const contentCard = container.querySelector('.sm\\:max-w-md');
    expect(contentCard).toBeInTheDocument();
  });

  it('should have responsive padding', () => {
    const { container } = render(<GestLayout>Content</GestLayout>);
    
    const innerWrapper = container.querySelector('.lg\\:px-10');
    expect(innerWrapper).toBeInTheDocument();
    expect(innerWrapper).toHaveClass('lg:py-16');
  });
});
