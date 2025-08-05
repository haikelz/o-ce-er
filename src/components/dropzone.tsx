import { cn } from "@/lib/utils";
import {
  fileAtom,
  isConvertingAtom,
  isFileFromDeviceAtom,
  resultAtom,
} from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { X } from "lucide-react";
import Dropzone, { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { createWorker } from "tesseract.js";
import { ImagePreview } from "./image-preview";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function CustomDropzone() {
  const file = useAtomValue(fileAtom);
  const setFile = useSetAtom(fileAtom);
  const isConverting = useAtomValue(isConvertingAtom);
  const setIsConverting = useSetAtom(isConvertingAtom);
  const setResult = useSetAtom(resultAtom);
  const setIsFileFromDevice = useSetAtom(isFileFromDeviceAtom);

  const { isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  async function convertImageToText(): Promise<void> {
    const worker = await createWorker("eng");
    setIsConverting(true);

    const ret = await worker.recognize(file as File);

    setIsConverting(false);
    setResult(ret.data.text);

    toast.success("Conversion successful", {
      description: "The image has been converted to text",
    });

    await worker.terminate();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setIsFileFromDevice(true);
    const file = e.target.files?.[0];

    if (file?.type.startsWith("image/")) {
      setFile(file);
    } else {
      toast.error("Please select an image file", {
        description: "Only image files are supported",
      });
    }
  }

  function handleDrop(acceptedFiles: File[]): void {
    setFile(acceptedFiles[0]);
  }

  function handleCancelImage(): void {
    setFile(null);
    setResult(null);
  }

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps }) => (
          <div
            className={cn(
              isDragActive ? "p-3" : "",
              "flex decoration-2 border border-dashed rounded-md overflow-hidden relative w-64 h-64 items-center justify-center gap-2"
            )}
          >
            {file ? (
              <Button
                variant="outline"
                size="icon"
                className="absolute top-0 left-0 z-10"
                onClick={handleCancelImage}
              >
                <X className="w-4 h-4" />
              </Button>
            ) : null}
            <Input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              {...getRootProps()}
              className="opacity-0 w-full h-full absolute"
            />
            <ImagePreview />
          </div>
        )}
      </Dropzone>
      <p>{file ? file.name : "No file selected"}</p>
      <Button
        onClick={convertImageToText}
        className="w-full"
        disabled={isConverting || !file}
      >
        {isConverting ? "Converting..." : "Convert"}
      </Button>
    </div>
  );
}
