/**
 * 쿠키에서 name에 해당하는 값을 반환합니다.
 */
export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts[1].split(';').shift() ?? null;
  return null;
}
