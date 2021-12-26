declare const BUCKET: KVNamespace;
type language = "KR" | "JP" | "CN" | "VN" | "TW" | "ID" | "EN";

interface InitParams {
  novels?: string;
}

interface RawContent {
  id: string;
  title: string;
  content: string;
  contributors: any;
  monetization?: boolean | string;
}

interface ChapterParams {
  novel: string;
  fetch: string | string[];
  stream?: boolean;
}

interface NovelParams {
  novel: string;
  titlesOnly?: boolean;
}

interface ImageParams {
  url: string;
  width: number;
  height: number;
  type: "webp" | "jpeg" | "png" | "svg" | "gif" | "jxl";
}

type ChapterResponse = {
  [chapter: string]: ChapterFetch;
};

interface ChapterFetch {
  title: string;
  html: string;
  status: number;
  monetization: boolean | string;
  contributors: any;
  author?: string | string[];
  comments_id?: string;
  translators?: string | string[];
  editors?: string | string[];
  rating?: number;
}

interface NovelResponse {
  title: string;
  author: string | string[];
  contact: string;
  demographic: string;
  genre: string;
  tags: string[];
  synopsis: string;
  totalChapter: number;
  chapters: string[];
  cover: {
    book: {
      jpeg: {
        "1x": string;
        "2x": string;
        "3x": string;
      };
      webp: {
        "1x": string;
        "2x": string;
        "3x": string;
      };
    };
    thumbnail: {
      jpeg: string;
      webp: string;
    };
    placeholder: string;
  };
  rev_share?: string[];
  donation?: number;
  rating?: number;
  reviews_id?: string[];
  translators?: string | string[];
  editors?: string | string[];
  chapterTitles?: any;
  discord_group_id?: string;
}

interface RawChapter {
  title: string;
  content: string;
  status: number;
  author?: string;
  index?: number;
  raw_url?: string;
  monetization?: boolean | string;
}

interface InitResponse {
  site_title: string;
  contact: string;
  global_payment_pointers: any;
  limit_global_payment_pointers_share_in_novel: number | string;
  backend_api: string;
  novels: string[];
  cors: string;
  novelsMetadata: any[];
  disqus_id: string;
}

declare function getCache(): {
  match: (cacheKey: CacheKey) => any;
  put: (cacheKey: CacheKey, body: any) => void;
  delete: (cacheKey: CacheKey) => void;
};

type CacheKey = string | Request;
type imageType = string | "jpg" | "jpeg" | "webp" | "png" | "gif";

interface ErrorResponse {
  status: number;
  statusText: string;
  help?: string;
}

declare module marked {
  function md(): string;
}
