import { headers } from "../../_shared";

export const onRequest: PagesFunction = async (context): Promise<Response> => {
  const { novelID, file } = context.params;

  return await serveImage(novelID as string, file as string);
};
export const onRequestPost: PagesFunction = async (context): Promise<Response> => {
  const { novelID, file } = context.params;

  return await serveImage(novelID as string, file as string, await context.request.json());
};

async function serveImage(novel: string, file: string, body: any = {}): Promise<Response> {
  const key = `image:${novel ? novel + ":" : ""}${file}`;
  const { width, height, type, imageresizeservice } = body;
  let fileBuffer: any = await BUCKET.get(key, "arrayBuffer");

  if (!fileBuffer) {
    return new Response("File not found.", {
      status: 404,
    });
  }

  if (imageresizeservice) {
    const imgUrl =
      imageresizeservice +
      `/resize?width=${width}&height=${height}&type=${type || "jpeg"}&nocrop=false&stripmeta=true`;
    try {
      const imageRes = (await fetch(imgUrl, {
        method: "POST",
        headers: {
          "Content-Type": "image/*",
        },
        body: fileBuffer,
      })) as any;
      const { readable, writable } = new TransformStream();
      imageRes.body.pipeTo(writable);
      return new Response(readable, {
        status: 200,
        headers,
      });
    } catch (error) {
      return new Response(JSON.stringify(error), {
        status: 500,
      });
    }
  } else {
    console.log("🎨 serve original image...");
    return new Response(fileBuffer, {
      status: 200,
      headers,
    });
  }
}
