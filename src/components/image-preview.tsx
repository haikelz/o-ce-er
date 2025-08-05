import { useAtomValue } from "jotai";
import { ImageIcon } from "lucide-react";
import { fileAtom, isFileFromDeviceAtom } from "../store";

export function ImagePreview() {
  const file = useAtomValue(fileAtom);
  const isFileFromDevice = useAtomValue(isFileFromDeviceAtom);

  if (!file)
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <ImageIcon className="w-10 h-10 text-gray-500" />
        <p className="text-sm text-gray-500">
          Select image here or drag and drop
        </p>
      </div>
    );

  return (
    <img
      src={
        isFileFromDevice
          ? URL.createObjectURL(file as File)
          : (file as unknown as string)
      }
      alt={file?.name || "image"}
      className="w-full h-full object-cover"
    />
  );
}
