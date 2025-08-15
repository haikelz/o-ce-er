import { tesseractWorker } from "@/configs/tesseract";

export async function convertImageToText(image: File) {
  try {
    const result = await tesseractWorker.recognize(image);
    return result.data.text;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
