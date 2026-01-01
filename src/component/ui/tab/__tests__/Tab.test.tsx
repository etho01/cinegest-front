import { render, screen, fireEvent } from '@testing-library/react';
import { Tab } from '../Tab';
import '@testing-library/jest-dom';

describe('Tab Component', () => {
  const mockTabList = [
    {
      header: { title: 'Tab 1', className: 'custom-header-1' },
      body: { content: <div>Content 1</div>, className: 'custom-body-1' },
    },
    {
      header: { title: 'Tab 2' },
      body: { content: <div>Content 2</div> },
    },
    {
      header: { title: 'Tab 3' },
      body: { content: <div>Content 3</div> },
    },
  ];

  it('should render all tab headers', () => {
    render(<Tab tabList={mockTabList} />);
    
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
  });

  it('should show first tab content by default', () => {
    render(<Tab tabList={mockTabList} />);
    
    const content1 = screen.getByText('Content 1').parentElement;
    const content2 = screen.getByText('Content 2').parentElement;
    const content3 = screen.getByText('Content 3').parentElement;
    
    expect(content1).toHaveClass('block');
    expect(content2).toHaveClass('hidden');
    expect(content3).toHaveClass('hidden');
  });

  it('should switch to selected tab when clicked', () => {
    render(<Tab tabList={mockTabList} />);
    
    fireEvent.click(screen.getByText('Tab 2'));
    
    const content2 = screen.getByText('Content 2').parentElement;
    const content1 = screen.getByText('Content 1').parentElement;
    
    expect(content2).toHaveClass('block');
    expect(content1).toHaveClass('hidden');
  });

  it('should apply active styles to selected tab', () => {
    render(<Tab tabList={mockTabList} />);
    
    const tab1 = screen.getByText('Tab 1').parentElement;
    expect(tab1).toHaveClass('font-bold');
    expect(tab1).toHaveClass('border-primary');
    
    const tab2 = screen.getByText('Tab 2').parentElement;
    expect(tab2).toHaveClass('text-gray-500');
    expect(tab2).toHaveClass('cursor-pointer');
  });

  it('should update active styles when switching tabs', () => {
    render(<Tab tabList={mockTabList} />);
    
    fireEvent.click(screen.getByText('Tab 2'));
    
    const tab2 = screen.getByText('Tab 2').parentElement;
    expect(tab2).toHaveClass('font-bold');
    expect(tab2).toHaveClass('border-primary');
    
    const tab1 = screen.getByText('Tab 1').parentElement;
    expect(tab1).toHaveClass('text-gray-500');
  });

  it('should apply custom className to wrapper', () => {
    const { container } = render(<Tab tabList={mockTabList} className="custom-wrapper" />);
    
    expect(container.firstChild).toHaveClass('custom-wrapper');
  });

  it('should apply custom header className', () => {
    render(<Tab tabList={mockTabList} />);
    
    const tab1Header = screen.getByText('Tab 1').parentElement;
    expect(tab1Header).toHaveClass('custom-header-1');
  });

  it('should apply custom body className', () => {
    render(<Tab tabList={mockTabList} />);
    
    const content1Container = screen.getByText('Content 1').parentElement;
    expect(content1Container).toHaveClass('custom-body-1');
  });

  it('should start with specified selectTab', () => {
    render(<Tab tabList={mockTabList} selectTab={1} />);
    
    const content2 = screen.getByText('Content 2').parentElement;
    const content1 = screen.getByText('Content 1').parentElement;
    
    expect(content2).toHaveClass('block');
    expect(content1).toHaveClass('hidden');
    
    const tab2 = screen.getByText('Tab 2').parentElement;
    expect(tab2).toHaveClass('font-bold');
  });

  it('should handle complex content in tabs', () => {
    const complexTabList = [
      {
        header: { title: 'Complex Tab' },
        body: {
          content: (
            <div>
              <h1>Title</h1>
              <p>Paragraph</p>
              <button>Click me</button>
            </div>
          ),
        },
      },
    ];
    
    render(<Tab tabList={complexTabList} />);
    
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should render all tab contents but hide non-selected', () => {
    const { container } = render(<Tab tabList={mockTabList} />);
    
    const contents = container.querySelectorAll('.block, .hidden');
    expect(contents.length).toBe(3);
  });
});
