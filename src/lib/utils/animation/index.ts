import { browser } from "$app/environment";
import { tick } from "svelte";

export async function frameTick() {
  if (!browser) return;
  await tick();
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await new Promise((resolve) => requestAnimationFrame(resolve));
}

export const loadWorklet = (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    if ("animationWorklet" in CSS && "paintWorklet" in CSS) {
      try {
        await Promise.all([
          (CSS as any).paintWorklet.addModule("/worklet/paint-worklet.js"),
          (CSS as any).animationWorklet.addModule("/worklet/animation-worklet.js"),
        ]);
      } catch (error) {
        console.error("Error loading worklets...");
        // console.error(error);
        reject(error);
      }
    }

    resolve("");
  });
};
