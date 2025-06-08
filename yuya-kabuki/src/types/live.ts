export interface CurrentLive {
  title: string;
  viewers: number;
  startTime: string;
  thumbnail: string;
  description?: string;
}

export interface LiveCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  stats: {
    label: string;
    value: string;
  };
}

export interface ScheduleItem {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
  description: string;
  thumbnail?: string;
}

export interface ArchiveItem {
  id: string;
  title: string;
  date: string;
  duration: string;
  views: number;
  thumbnail: string;
  tags: string[];
  description?: string;
} 