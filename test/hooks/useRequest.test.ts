import { act, renderHook, waitFor } from '@testing-library/react';
import { message } from 'antd';

import { useRequest } from '@/hooks/useRequest';

vi.mock('antd', async () => {
  const actual = await vi.importActual('antd');
  return {
    ...actual,
    message: {
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

describe('useRequest', () => {
  it('should initialize with default state', () => {
    const requestFn = vi.fn().mockResolvedValue({ data: 'test' });
    const { result } = renderHook(() => useRequest({ requestFn }));

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should run request successfully', async () => {
    const mockData = { id: 1, name: 'test' };
    const requestFn = vi.fn().mockResolvedValue(mockData);
    const onSuccess = vi.fn();

    const { result } = renderHook(() =>
      useRequest({ requestFn, onSuccess }),
    );

    await act(async () => {
      await result.current.run();
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.loading).toBe(false);
    expect(onSuccess).toHaveBeenCalledWith(mockData);
  });

  it('should handle request error', async () => {
    const error = new Error('Request failed');
    const requestFn = vi.fn().mockRejectedValue(error);
    const onError = vi.fn();

    const { result } = renderHook(() =>
      useRequest({ requestFn, onError }),
    );

    await act(async () => {
      await result.current.run();
    });

    expect(result.current.error).toEqual(error);
    expect(result.current.loading).toBe(false);
    expect(onError).toHaveBeenCalled();
    expect(message.error).toHaveBeenCalled();
  });

  it('should show success message', async () => {
    const requestFn = vi.fn().mockResolvedValue({ data: 'test' });

    const { result } = renderHook(() =>
      useRequest({ requestFn, successMessage: '操作成功' }),
    );

    await act(async () => {
      await result.current.run();
    });

    expect(message.success).toHaveBeenCalledWith('操作成功');
  });

  it('should reset state', async () => {
    const requestFn = vi.fn().mockResolvedValue({ data: 'test' });

    const { result } = renderHook(() => useRequest({ requestFn }));

    await act(async () => {
      await result.current.run();
    });

    expect(result.current.data).not.toBeNull();

    act(() => {
      result.current.reset();
    });

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should pass arguments to request function', async () => {
    const requestFn = vi.fn().mockResolvedValue({ data: 'test' });

    const { result } = renderHook(() => useRequest({ requestFn }));

    await act(async () => {
      await result.current.run('arg1', 'arg2');
    });

    expect(requestFn).toHaveBeenCalledWith('arg1', 'arg2');
  });
});
