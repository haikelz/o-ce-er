import { createWorker, type ImageLike } from "tesseract.js";
import { TESSERACT_LANG } from "../configs/tesseract.js";

export async function ocrService(image: File | string) {
  try {
    let imageBuffer: ArrayBuffer;

    if (typeof image === "string") {
      imageBuffer = await fetch(image).then((res) => res.arrayBuffer());
    } else {
      imageBuffer = await (image as File).arrayBuffer();
    }

    const worker = await createWorker(TESSERACT_LANG);
    const {
      data: { text },
    } = await worker.recognize(imageBuffer as unknown as ImageLike);

    await worker.terminate();

    return text;
  } catch (err: any) {
    throw new Error(err.message);
  }
}
