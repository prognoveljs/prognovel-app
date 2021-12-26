import { cleanHTML } from "../../utils/string";
import { headers } from "../_shared";
import { DB } from "../_shared";

export async function fetchNovelChapterTitles(novel: string): Promise<any> {
  try {
    const meta = await DB.getNovelMetadata(novel);
    return new Response(JSON.stringify(meta), { headers });
  } catch (error) {
    console.error("Error parsing json for novel");
    console.error(error);
    return new Response(JSON.stringify(error), {
      headers,
      status: 500,
      statusText: JSON.stringify(error),
    });
  }
}

export async function fetchNovel(novel: string): Promise<Response> {
  try {
    const { metadata, chapterTitles } = await DB.getNovelMetadata(novel);
    console.log({ metadata, chapterTitles });
    return new Response(
      JSON.stringify(
        {
          title: metadata.title || "",
          author: metadata.author || "",
          demographic: metadata.demographic || "",
          genre: metadata.genre || [],
          tags: metadata.tags || [],
          contact: metadata.contact || "",
          cover: metadata.cover,
          synopsis: cleanHTML(metadata.synopsis) || "",
          totalChapter: metadata.chapters ? metadata.chapters.length : 0,
          rev_share: metadata.rev_share || [],
          chapters: metadata.chapters || [],
          chapterTitles: chapterTitles,
          discord_group_id: (metadata.discord_group_id || "") + "",
        },
        null,
        2,
      ),
      { headers },
    );
  } catch (error) {
    throw error;
    // return {}
  }
}
