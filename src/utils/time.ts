export const now = () => Date.now();

export const formatIsoTime = (timestamp: number) =>
  new Date(timestamp).toISOString();

