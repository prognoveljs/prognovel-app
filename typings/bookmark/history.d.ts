export interface HistoryRecent {
  id: string;
  lastChapter?: string;
  lastChapterRead: string;
  lastReadAt: DOMHighResTimeStamp;
  progress?: number;
}
