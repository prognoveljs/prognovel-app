type novelID = string;

export type NovelsMetadata = {
  [novel: string]: NovelMetadata;
};

export interface RevShareProfile {
  name: string;
  paymentPointer: string;
  weight: string | number;
  webfundingPaymentPointer?: string;
  role?: string;
  roles?: string[];
}

export interface RevShareUser extends RevShareProfile {
  chance: string;
}

export interface NovelMetadata {
  id: string;
  author: string;
  title: string;
  demographic: string;
  genre: string[];
  tags: string[];
  lastChapter: string;
  totalChapter: number;
  chapters?: string[];
  synopsis?: string;
  rev_share?: Array<RevShareProfile>;
  contact?: string;
  cover?: BookCover;
  donation?: number;
  rating?: number;
  reviews_id?: string[];
  translators?: string | string[];
  editors?: string | string[];
  status: "pending" | "loading" | "ready" | "stale";
  stale?: boolean;
  discord_group_id?: string;
}

interface BookCover {
  book: {
    webp: string;
    jpeg: string;
  };
  thumbnail: {
    webp: string;
    jpeg: string;
  };
  placeholder: string;
}

export interface Volume {
  id: string;
  title: string;
  novel_parent: novelID;
  blurb?: string;
  order?: number;
  is_published?: boolean;
  cover_png?: string;
  cover_webp?: string;
  created?: DOMHighResTimeStamp;
  updated?: DOMHighResTimeStamp;
}
