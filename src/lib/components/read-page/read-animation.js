import { animate } from "../../utils/animation/animation-worklet.js";

const outKeyframe = [
  {
    transform: "translateY(0)",
    opacity: 1,
  },
  {
    transform: "translateY(2px)",
    opacity: 0,
  },
];

const inKeyframe = [
  {
    transform: "translateY(4px)",
    opacity: 0,
  },
  {
    transform: "translateY(0)",
    opacity: 1,
  },
];

const easing = "ease-in";

export function animateBody(el, out = true) {
  if (out) {
    animate(el, outKeyframe, 125, 0, easing);
  } else {
    animate(el, inKeyframe, 275, 0, "ease-in");
  }
}
