interface ImageUploaderOpts {}

export async function imageUploaderSetup(input: HTMLInputElement, opts: ImageUploaderOpts) {
  input.type = "file";

  input.addEventListener("change", function () {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onloadend = () => imageToArrayBuffer(reader, opts);

    // start reading the selected file as a data URL
    reader.readAsDataURL(file);
  });

  return {
    update(opts: ImageUploaderOpts) {},
    destroy() {},
  };
}

function imageToArrayBuffer(reader: FileReader, opts: ImageUploaderOpts = {}) {
  const img = new Image();
  img.src = reader.result as string;

  const canvas = document.createElement("canvas");

  canvas.width = 200;
  canvas.height = 200;

  // get the 2D drawing context of the canvas
  const ctx = canvas.getContext("2d");

  // draw the resized image on the canvas
  ctx.drawImage(img, 0, 0, 200, 200);

  // convert the canvas to a Blob
  canvas.toBlob(async (blob) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(blob);

    await new Promise((resolve) => {
      reader.onloadend = () => resolve("");
    });

    const arrayBuffer = reader.result;
  });
}
