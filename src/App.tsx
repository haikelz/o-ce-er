import { ImageIcon, X } from "lucide-react";
import { useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import ShikiHighlighter from "react-shiki/web";
import { addCopyButton } from "shiki-transformer-copy-button";
import { createWorker } from "tesseract.js";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { cn } from "./lib/utils";

export default function App() {
  const [result, setResult] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);

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
    await worker.terminate();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0];

    if (file) {
      setFile(file);
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
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold">O-Ce-Er</h1>
        <p className="text-sm text-gray-500">
          O-Ce-Er is a serverless OCR services that can recognize text in an
          image. Brought to you by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://ekel.dev"
            className="text-blue-500"
          >
            ekel.dev
          </a>
        </p>
      </div>
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
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name || "image"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <ImageIcon className="w-10 h-10 text-gray-500" />
                  <p className="text-sm text-gray-500">
                    Select image here or drag and drop
                  </p>
                </div>
              )}
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
      <div className="mt-6 w-full">
        {file && result ? (
          <ShikiHighlighter
            language="markdown"
            theme="github-dark"
            transformers={[addCopyButton({ toggle: 2000 })]}
          >
            {result.trim()}
          </ShikiHighlighter>
        ) : null}
      </div>
    </>
  );
}
