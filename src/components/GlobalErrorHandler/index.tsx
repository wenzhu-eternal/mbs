import { Alert } from 'antd';

import { useErrorStore } from './store';

export function GlobalErrorHandler() {
  const { error, showError, clearError } = useErrorStore();

  if (!showError || !error) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 9999,
        maxWidth: 400,
      }}
    >
      <Alert
        message="发生错误"
        description={error.message || '未知错误'}
        type="error"
        showIcon
        closable
        onClose={clearError}
      />
    </div>
  );
}