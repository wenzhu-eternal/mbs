import '@testing-library/jest-dom';
import { vi } from 'vitest';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const mockConfig = {
  IP: {
    development: 'http://localhost:9001/',
    production: 'http://aieternal.icu:9001/',
  },
  routers: [],
};

vi.stubGlobal('__CONFIG__', mockConfig);

vi.stubGlobal('import.meta', {
  env: {
    MODE: 'development',
  },
});
