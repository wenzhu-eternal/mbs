import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import LazyImage from '@/components/LazyImage';

const mockObserve = vi.fn();
const mockUnobserve = vi.fn();
const mockDisconnect = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();

  class MockIntersectionObserver {
    observe = mockObserve;
    unobserve = mockUnobserve;
    disconnect = mockDisconnect;
  }

  global.IntersectionObserver = MockIntersectionObserver as any;
});

describe('LazyImage', () => {
  it('should render placeholder when not in view', () => {
    const { container } = render(<LazyImage src="test.jpg" alt="test image" />);

    expect(container.querySelector('.ant-spin')).toBeInTheDocument();
  });

  it('should render custom placeholder', () => {
    render(
      <LazyImage src="test.jpg" alt="test image" placeholder="loading..." />,
    );

    expect(screen.getByText('loading...')).toBeInTheDocument();
  });
});
