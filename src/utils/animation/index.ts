import { tick } from "svelte";

export async function frameTick() {
  if (!(process as any).browser) return;
  await tick();
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await new Promise((resolve) => requestAnimationFrame(resolve));
}
