import "@cloudflare/workers-types";
import "../api-types";
import { DB, headers } from "./_shared";

export const onRequest: PagesFunction = async (context): Promise<Response> => {
  let meta;
  try {
    meta = await DB.getSiteMetadata();
  } catch (error) {
    console.error(error);
    return new Response("Error connecting to KV database BUCKET.", {
      status: 501,
      statusText: "Error connecting to KV database BUCKET.",
    });
  }

  return new Response(
    JSON.stringify(
      {
        site_title: meta.site_title || "",
        contact: meta.contact || "",
        global_payment_pointers: meta.global_payment_pointers || {},
        limit_global_payment_pointers_share_in_novel:
          meta.limit_global_payment_pointers_share_in_novel || "10%",
        backend_api: meta.backend_api || "",
        novels: meta.novels || [],
        cors: meta.cors || "*",
        novelsMetadata: meta.novelsMetadata || [],
        disqus_id: meta.disqus_id || "",
      },
      null,
      2,
    ),
    { headers },
  );
};
