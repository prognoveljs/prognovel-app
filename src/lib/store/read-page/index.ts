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
  chaptersWithSpoiler,
  showTOC,
} from "./read-page-state";
export type { ChapterTitles, ChapterTitlesChildren } from "./read-page-state";
import "./read-page-trigger";

export {
  disableNextChapter,
  disablePrevChapter,
  nextChapterLink,
  prevChapterLink,
  nextChapter,
  prevChapter,
  infiniteLoading,
} from "./read-page-navigation";
