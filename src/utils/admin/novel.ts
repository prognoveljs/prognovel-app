import { ws } from ".";

export async function createNovel(novel: string) {
  ws.send(
    JSON.stringify({
      type: "CREATENOVEL",
      novel,
    }),
  );
}
