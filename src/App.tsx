import { useState } from "react";
import Markdown from "react-markdown";
import { createWorker } from "tesseract.js";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

function App() {
  const [result, setResult] = useState("");

  async function readImageToText(imagePath: string) {
    const worker = await createWorker("eng");
    const ret = await worker.recognize(imagePath);

    console.log(ret.data);
    setResult(ret.data.text);
    await worker.terminate();
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Input type="file" />
      <Button onClick={() => readImageToText("/struk-example.png")}>
        Convert
      </Button>
      <p>OCR Services</p>
      <p>Please input the picture that you want to convert to text</p>
      <p className="prose prose-sm prose-sky">
        {result ? <Markdown>{result}</Markdown> : "Belum ada hasil!"}
      </p>
    </div>
  );
}

export default App;
