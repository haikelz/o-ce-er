import { cn } from "@/lib/utils";
import { convertImageToText } from "@/services/ocr";
import { fileAtom, isFileFromDeviceAtom, resultAtom } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { X } from "lucide-react";
import Dropzone, { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { ImagePreview } from "./image-preview";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function CustomDropzone() {
  const file = useAtomValue(fileAtom);
  const setFile = useSetAtom(fileAtom);
  const setResult = useSetAtom(resultAtom);
  const setIsFileFromDevice = useSetAtom(isFileFromDeviceAtom);

  const { isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const imageToTextMutation = useMutation({
    mutationFn: async (image: File) => convertImageToText(image),
    onSuccess: (data) => {
      toast.success("Conversion successful", {
        description: "The image has been converted to text",
      });

      setResult(data.data.text);
    },
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setIsFileFromDevice(true);
    const file = e.target.files?.[0];

    console.log(file);

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

  async function handleConvertImageToText(): Promise<void> {
    if (file) {
      await imageToTextMutation.mutateAsync(file);
    }
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
        onClick={handleConvertImageToText}
        className="w-full"
        disabled={imageToTextMutation.isPending || !file}
      >
        {imageToTextMutation.isPending ? "Converting..." : "Convert"}
      </Button>
    </div>
  );
}
