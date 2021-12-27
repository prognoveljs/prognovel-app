export const onRequest: PagesFunction = async (context): Promise<Response> => {
  const { file } = context.params;

  const key = `data:${file}`;
  const fileBuffer: any = await BUCKET.get(key, "arrayBuffer");
  // const { readable, writable } = new TransformStream();
  // fileBuffer.pipeTo(writable);
  if (fileBuffer) {
    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        // 'Cache-Control': 'private, max-age=86400000',
        "Content-Type": "image/png",
      },
    });
  } else {
    return new Response("File not found.", {
      status: 404,
    });
  }
};
