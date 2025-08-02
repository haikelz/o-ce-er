import { useState } from "react";
import Dropzone from "react-dropzone";
import ShikiHighlighter from "react-shiki";
import { createWorker } from "tesseract.js";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

function App() {
  const [result, setResult] = useState("");
  const [file, setFile] = useState<File | null>(null);

  async function convertImageToText() {
    const worker = await createWorker("eng");
    const ret = await worker.recognize(file as File);

    setResult(ret.data.text);
    await worker.terminate();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  }

  function handleDrop(acceptedFiles: File[]) {
    setFile(acceptedFiles[0]);
    convertImageToText();
  }

  return (
    <main className="flex flex-col prose prose-sm prose-sky max-w-full w-full items-center justify-center min-h-screen">
      <div className="flex p-4 flex-col items-center justify-center max-w-7xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold">O-Ce-Er Services by ekel.dev</h1>
          <p className="text-sm text-gray-500">
            O-Ce-Er is a OCR services that can convert image to text and also
            convert text to image.
          </p>
        </div>
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps }) => (
            <div className="flex items-center justify-center gap-2">
              <Input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                {...getRootProps()}
              />
              <Button type="submit" onClick={convertImageToText}>
                Convert
              </Button>
            </div>
          )}
        </Dropzone>
        <div className="mt-6 w-full">
          {result ? (
            <ShikiHighlighter language="text" theme="github-dark">
              {result.trim()}
            </ShikiHighlighter>
          ) : (
            <p className="text-center">No result!</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
