registerAnimator(
  "passthrough",
  class {
    animate(currentTime, effect) {
      effect.localTime = currentTime;
    }
  },
);
