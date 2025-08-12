import { api } from "@/configs/axios";

export async function convertImageToText(image: File) {
  try {
    const formData = new FormData();
    formData.append("image", image);

    const response = await api.post("/api/ocr", formData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
