export interface ShowChapterOptions {
  isInit?: boolean;
  isPreviousChapter?: boolean;
  path?: string;
}

export interface Chapter {
  title: string;
  html: string;
  monetization?: boolean;
  meta?: ChapterMetadata;
  contributors: {
    [role: string]: Array<{
      name: string;
      paymentPointer?: string;
    }>;
  };
}

export interface ChapterTitle {
  id: string;
  title: string;
}

export interface ChapterMetadata {
  status: string;
  index?: number;
  monetization?: boolean | string;
  author?: string | string[];
  comments_id?: string;
  translators?: string | string[];
  editors?: string | string[];
  rating?: number;
  error?: string;
}
