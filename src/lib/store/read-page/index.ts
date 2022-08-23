export {
  toc,
  currentBook,
  currentChapter,
  currentChapterCursor,
  currentChapterIndex,
  currentChapterTitle,
  currentContent,
  chaptersLoaded,
} from "./read-page-current-vars";
export {
  chapterTitles,
  chaptersAppended,
  fontSize,
  asyncTextRendering,
  registeredPlugins,
} from "./read-page-state";
export type { ChapterTitles } from "./read-page-state";
import "./read-page-trigger";

export {
  disableNextChapter,
  disablePrevChapter,
  nextChapterLink,
  prevChapterLink,
  nextChapter,
  prevChapter,
} from "./read-page-navigation";
