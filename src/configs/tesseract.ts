import * as Tesseract from "tesseract.js";

export const tesseractWorker = await Tesseract.createWorker("eng");
