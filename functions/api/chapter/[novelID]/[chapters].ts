import "@cloudflare/workers-types";
import "../../../api-types";
import { DB, headers } from "../../_shared";
import { responseError, chapterNameNotFound, chapterNovelNotFound } from "../../../utils/errors";
const MAX_AGE = 60 * 60;
export const onRequest: PagesFunction = async (context) => {
  let { novelID, chapters } = context.params;
  chapters =
    (chapters as string)
      .trim()
      .split(",")
      .filter((s) => !!s) || [];
  if (!novelID) return responseError(chapterNovelNotFound);

  if (!chapters) return responseError(chapterNameNotFound);
  try {
    let result = await fetchChapter({ novel: novelID as string, fetch: chapters });
    const init = { headers };
    init.headers["Cache-Control"] = `private, max-age=${MAX_AGE}`;

    return new Response(JSON.stringify(result), init);
  } catch (err) {
    const init = { headers };
    init.headers["Cache-Control"] = `private, max-age=5`;

    return new Response(JSON.stringify(err), init);
  }
};

export async function fetchChapter(params: ChapterParams): Promise<ChapterResponse> {
  return await getRawChapter(params);

  async function getRawChapter({ novel, fetch }: ChapterParams): Promise<ChapterResponse> {
    if (typeof fetch === "string") fetch = [fetch];
    const result = await DB.getChapter(novel, fetch);
    console.log(result);
    return result.reduce((prev: ChapterResponse, cur: RawContent): ChapterResponse => {
      const chapter: ChapterFetch = {
        title: cur.title,
        html: cur.content,
        contributors: cur.contributors || {},
        monetization: Boolean(cur.monetization === true || cur.monetization === "true"),
        status: 200,
      };
      prev[cur.id] = chapter;
      return prev;
    }, {} as ChapterResponse);
  }
}
