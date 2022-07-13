import { getNovelBookCoverSrc } from "$lib/utils/novel-page";

export async function waitForNovelCoverLoading(novel: string) {
  const el = new Image();
  el.src = getNovelBookCoverSrc(novel);

  await new Promise((resolve, reject) => {
    el.onload = () => resolve("");
    el.onerror = () => reject(`error on loading ${novel} cover image`);
  });

  return el.src;
}
