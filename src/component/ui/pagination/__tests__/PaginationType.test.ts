import type { Paginator, PaginatorLink } from '../PaginationType';

describe('PaginationType', () => {
  it('should define PaginatorLink type', () => {
    const link: PaginatorLink = {
      url: 'http://example.com/page/1',
      label: '1',
      active: true,
    };
    
    expect(link.url).toBe('http://example.com/page/1');
    expect(link.label).toBe('1');
    expect(link.active).toBe(true);
  });

  it('should allow null url in PaginatorLink', () => {
    const link: PaginatorLink = {
      url: null,
      label: 'Previous',
      active: false,
    };
    
    expect(link.url).toBeNull();
  });

  it('should define Paginator type with generic data', () => {
    interface TestData {
      id: number;
      name: string;
    }
    
    const paginator: Paginator<TestData> = {
      current_page: 1,
      data: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ],
      first_page_url: 'http://example.com/page/1',
      from: 1,
      last_page: 5,
      last_page_url: 'http://example.com/page/5',
      links: [],
      next_page_url: 'http://example.com/page/2',
      path: 'http://example.com',
      per_page: 10,
      prev_page_url: null,
      to: 2,
      total: 50,
    };
    
    expect(paginator.current_page).toBe(1);
    expect(paginator.data).toHaveLength(2);
    expect(paginator.total).toBe(50);
  });

  it('should allow null values for optional fields', () => {
    interface TestData {
      id: number;
    }
    
    const paginator: Paginator<TestData> = {
      current_page: 1,
      data: [],
      first_page_url: null,
      from: null,
      last_page: 1,
      last_page_url: null,
      links: [],
      next_page_url: null,
      path: 'http://example.com',
      per_page: 10,
      prev_page_url: null,
      to: null,
      total: 0,
    };
    
    expect(paginator.from).toBeNull();
    expect(paginator.to).toBeNull();
    expect(paginator.next_page_url).toBeNull();
  });

  it('should handle empty data array', () => {
    const paginator: Paginator<unknown> = {
      current_page: 1,
      data: [],
      first_page_url: null,
      from: null,
      last_page: 1,
      last_page_url: null,
      links: [],
      next_page_url: null,
      path: 'http://example.com',
      per_page: 10,
      prev_page_url: null,
      to: null,
      total: 0,
    };
    
    expect(paginator.data).toEqual([]);
  });

  it('should handle complex object types in data', () => {
    interface ComplexData {
      id: number;
      nested: {
        value: string;
        count: number;
      };
      tags: string[];
    }
    
    const paginator: Paginator<ComplexData> = {
      current_page: 1,
      data: [
        {
          id: 1,
          nested: { value: 'test', count: 5 },
          tags: ['tag1', 'tag2'],
        },
      ],
      first_page_url: 'http://example.com/page/1',
      from: 1,
      last_page: 1,
      last_page_url: 'http://example.com/page/1',
      links: [],
      next_page_url: null,
      path: 'http://example.com',
      per_page: 10,
      prev_page_url: null,
      to: 1,
      total: 1,
    };
    
    expect(paginator.data[0].nested.value).toBe('test');
    expect(paginator.data[0].tags).toContain('tag1');
  });
});
