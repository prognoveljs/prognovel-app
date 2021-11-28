const PAN_CHAPTER_TRESHOLD = 200;

interface MousePosition {
  x: number;
  y: number;
  dx?: number;
  dy?: number;
}

export function onMobilePanMove(data: MousePosition) {
  if (data.dx < 0) {
    // next chapter gesture
    if (data.dx * -1 >= PAN_CHAPTER_TRESHOLD) {
      onMobileNextChapter();
    }
  } else {
    // prev chapter gesture
    if (data.dx >= PAN_CHAPTER_TRESHOLD) {
      onMobilePrevChapter();
    }
  }
}

export function onMobilePanEnd(data: MousePosition, changeChapter?: boolean) {
  _release();

  function _release() {
    // release gesture
  }
}

export function onMobilePanStart(data: MousePosition) {
  // start gesture
}

function onMobileNextChapter() {
  // end pan
}

function onMobilePrevChapter() {
  // end pan
}
