export const out = [
  { transform: "scale(1)", opacity: 1 },
  { transform: "scale(0.65)", opacity: 0 },
];

export const enter = [
  { transform: "scale(0.8)", opacity: 0 },
  { transform: "scale(1)", opacity: 1 },
];

export const feather = [
  { transform: "translateY(-2px)", opacity: 0 },
  { transform: "translateY(-2px)", opacity: 1, offset: 0.7 },
  { transform: "translateY(0)", opacity: 1 },
];

export const rubber = [
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
];

export const flash = [
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
];

export const fly = [
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
];

export const fade = [
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
];
