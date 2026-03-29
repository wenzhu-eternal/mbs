import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Loading from '@/components/Loading';

describe('Loading', () => {
  it('should render loading component', () => {
    const { container } = render(<Loading />);

    expect(container.querySelector('._bg_73caf7')).toBeInTheDocument();
  });
});
