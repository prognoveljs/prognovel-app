import { isBrowser } from "$lib/store/states";
import { tick } from "svelte";

export async function frameTick() {
  if (!isBrowser) return;
  await tick();
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await new Promise((resolve) => requestAnimationFrame(resolve));
}

export const loadWorklet = (): Promise<any> => {
  return new Promise(async (resolve) => {
    if ("animationWorklet" in CSS && "paintWorklet" in CSS) {
      await Promise.all([
        (CSS as any).paintWorklet.addModule("worklet/paint-worklet.js"),
        (CSS as any).animationWorklet.addModule("worklet/animation-worklet.js"),
      ]);
    }

    resolve("");
  });
};
