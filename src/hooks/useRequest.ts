import { useCallback, useState } from 'react';
import { message } from 'antd';

interface UseRequestOptions<T, P extends unknown[]> {
  requestFn: (...args: P) => Promise<T>;
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
}

interface UseRequestReturn<T, P extends unknown[]> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  run: (...args: P) => Promise<T | null>;
  reset: () => void;
}

export function useRequest<T, P extends unknown[] = unknown[]>(
  options: UseRequestOptions<T, P>,
): UseRequestReturn<T, P> {
  const { requestFn, onSuccess, onError, successMessage, errorMessage } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const run = useCallback(
    async (...args: P): Promise<T | null> => {
      setLoading(true);
      setError(null);

      try {
        const result = await requestFn(...args);
        setData(result);

        if (successMessage) {
          message.success(successMessage);
        }

        onSuccess?.(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);

        if (errorMessage) {
          message.error(errorMessage);
        } else {
          message.error(`${err}`);
        }

        onError?.(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [requestFn, onSuccess, onError, successMessage, errorMessage],
  );

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return {
    data,
    loading,
    error,
    run,
    reset,
  };
}
