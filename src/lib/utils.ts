import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: { label: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
      return rtf.format(-count, interval.label);
    }
  }

  return 'just now';
}

type VisitorStats = { date: string; visitors: number };

export function getVisitorsPerDay(data: UserSession[]): VisitorStats[] {
  const map = new Map<string, number>();

  for (const user of data) {
    const date = new Date(user.lastSession).toISOString().split("T")[0]; // Extract YYYY-MM-DD
    map.set(date, (map.get(date) || 0) + 1);
  }

  return Array.from(map.entries())
    .map(([date, visitors]) => ({ date, visitors }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}


