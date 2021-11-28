export function checkTouchScreen() {
  window.isTouchScreen = false;
  window.addEventListener("touchstart", function detectTouch() {
    window.isTouchScreen = true;
    window.removeEventListener("touchstart", detectTouch);
  });
}
