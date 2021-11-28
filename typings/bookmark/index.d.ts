export interface Bookmark {
  id: string;
  title: string;
  lastChapter?: string;
  lastChapterRead: string;
  cover: string;
  lastReadAt: DOMHighResTimeStamp;
  progress?: number;
}
