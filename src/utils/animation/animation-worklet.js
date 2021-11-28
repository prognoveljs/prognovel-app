// @ts-nocheck

export const animate = async function (element, keyframe, duration = 225, delay = 0, easing = "ease-in-out") {
  const ANIMATION_WORKLET = !!("animationWorklet" in CSS);
  const WEB_ANIMATION = !!("animate" in element);
  const effectKeyframes = new KeyframeEffect(element, keyframe, {
    duration,
    delay,
    easing,
    fill: "both",
  });
  if (ANIMATION_WORKLET) {
    await CSS.animationWorklet.addModule("/script/worklet-animation.js");
    const animate = new WorkletAnimation("sample-animator", effectKeyframes, document.timeline, {}).play();
    console.log("Start animation worklet.");
  } else if (WEB_ANIMATION) {
    const s = new Animation(effectKeyframes, document.timeline, {}).play();
    console.log("Start animation JS.");
  } else {
    element.style.opacity = 1;
  }
};

export const keyframes = {
  fade: [
    {
      transform: "scale(3)",
      opacity: 0,
    },
    {
      transform: "scale(1.1)",
      opacity: 0.4,
      offset: 0.2,
    },
    {
      transform: "scale(1)",
      opacity: 1,
    },
  ],
  fly: [
    {
      transform: "translateY(-24px)",
      opacity: 0,
    },
    {
      transform: "translateY(-8px)",
      opacity: 0.4,
      offset: 0.8,
    },
    {
      transform: "translateY(0)",
      opacity: 1,
    },
  ],
  flash: [
    {
      transform: "scale(3)",
      opacity: 0,
    },
    {
      transform: "scale(1.1)",
      opacity: 0.4,
      offset: 0.2,
    },
    {
      transform: "scale(1)",
      opacity: 1,
    },
  ],
  rubber: [
    {
      transform: "scale(1.3)",
      opacity: 0,
    },
    {
      transform: "scale(0.8)",
      opacity: 1,
      offset: 0.7,
    },
    {
      transform: "scale(1)",
      opacity: 1,
    },
  ],
  feather: [
    { transform: "translateY(-2px)", opacity: 0 },
    { transform: "translateY(-2px)", opacity: 1, offset: 0.7 },
    { transform: "translateY(0)", opacity: 1 },
  ],
  enter: [
    { transform: "scale(0.8)", opacity: 0 },
    { transform: "scale(1)", opacity: 1 },
  ],
  out: [
    { transform: "scale(1)", opacity: 1 },
    { transform: "scale(0.65)", opacity: 0 },
  ],
};
