import { LINE_COLORS } from '../constants';

/**
 * Get color for a line/operator
 */
export const getLineColor = (lineId: string, lineName: string): string => {
  const id = lineId.toLowerCase();
  const name = lineName.toLowerCase();
  
  // Check by line ID first
  if (LINE_COLORS[id]) {
    return LINE_COLORS[id];
  }
  
  // Check by line name
  if (LINE_COLORS[name]) {
    return LINE_COLORS[name];
  }
  
  // Check for partial matches (e.g., "elizabeth line" in name)
  for (const [key, color] of Object.entries(LINE_COLORS)) {
    if (name.includes(key) || id.includes(key)) {
      return color;
    }
  }
  
  // Default color
  return LINE_COLORS.default;
};

/**
 * Format time to station display
 */
export const formatTimeToStation = (seconds: number): { display: string; subtext: string } => {
  if (seconds <= 30) {
    return { display: 'Due', subtext: `${seconds}s` };
  }
  
  if (seconds < 60) {
    return { display: `${seconds}s`, subtext: '' };
  }
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes === 1) {
    return { display: '1 min', subtext: `${remainingSeconds}s` };
  }
  
  return { display: `${minutes} mins`, subtext: '' };
};

/**
 * Get relative time string
 */
export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  
  if (diffSecs < 60) {
    return 'just now';
  }
  
  const diffMins = Math.floor(diffSecs / 60);
  if (diffMins === 1) {
    return '1 min ago';
  }
  if (diffMins < 60) {
    return `${diffMins} mins ago`;
  }
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours === 1) {
    return '1 hour ago';
  }
  return `${diffHours} hours ago`;
};

/**
 * Capitalize first letter of each word
 */
export const titleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

