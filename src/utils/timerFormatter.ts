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
