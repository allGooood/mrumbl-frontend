/**
 * Extracts a user-friendly error message from an unknown error (e.g. axios error).
 * Supports: response.data.message, Error.message, and custom default.
 */
export function getErrorMessage(err: unknown, defaultMessage: string): string {
  if (!err || typeof err !== 'object') {
    return defaultMessage;
  }
  // Axios-style: err.response?.data?.message
  if (
    'response' in err &&
    err.response &&
    typeof err.response === 'object' &&
    'data' in err.response
  ) {
    const data = (err.response as { data?: { message?: string } }).data;
    const message = data?.message;
    if (typeof message === 'string' && message.trim()) {
      return message;
    }
  }
  // Standard Error.message
  if ('message' in err && typeof (err as { message: unknown }).message === 'string') {
    return (err as { message: string }).message;
  }
  return defaultMessage;
}
