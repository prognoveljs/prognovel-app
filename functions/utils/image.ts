export const IMAGE_RESIZE_ENDPOINT = 'https://image-resize.fly.dev';

export function imageBase64Encode(arrayBuffer: Iterable<number>, type: imageType) {
  let b64encoded = btoa(
    [].reduce.call(
      new Uint8Array(arrayBuffer),
      // @ts-ignore
      (p: string, c: number) => {
        return p + String.fromCharCode(c);
      },
      '',
    ),
  );

  let mimetype = 'image/' + type;
  return 'data:' + mimetype + ';base64,' + b64encoded;
}
