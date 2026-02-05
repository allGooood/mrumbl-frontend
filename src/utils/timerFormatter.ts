/**
 * "HH:mm" 또는 이미 "8:00 am" 같은 문자열을
 * 12시간제 "H:mm AM/PM" 포맷으로 변환합니다.
 * 유효하지 않은 값이 들어오면 "—" 를 반환합니다.
 */
export const formatTimeTo12HourClock = (timeStr: string): string => {
  if (!timeStr || typeof timeStr !== "string") return "—";

  const trimmed = timeStr.trim();
  const lower = trimmed.toLowerCase();

  // 이미 AM/PM 이 포함된 경우는 그대로 사용
  if (lower.includes("am") || lower.includes("pm")) return trimmed;

  const [h, m] = trimmed.split(":");
  const hour = Number.isNaN(Number(h)) ? 0 : parseInt(h ?? "0", 10);
  const min = (m ?? "00").padStart(2, "0");

  if (hour >= 12) {
    const displayHour = hour === 12 ? 12 : hour - 12;
    return `${displayHour}:${min} PM`;
  }

  const displayHour = hour || 12;
  return `${displayHour}:${min} AM`;
};

/**
 * 오픈/클로즈 시간을 받아 "H:mm AM/PM - H:mm AM/PM" 형식의
 * 영업 시간 범위 문자열로 변환합니다.
 * 둘 중 하나라도 없으면 "—" 를 반환합니다.
 */
export const formatBusinessHoursRange = (open?: string, close?: string): string => {
  if (!open || !close) return "—";
  return `${formatTimeTo12HourClock(open)} - ${formatTimeTo12HourClock(close)}`;
};

/**
 * Formats seconds into MM:SS format
 * @param seconds - The number of seconds to format
 * @returns Formatted string in MM:SS format (e.g., "01:30")
 */
export const formatTimer = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
