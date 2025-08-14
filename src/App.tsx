import { CodeBlocks } from "./components/codeblocks";
import { CustomDropzone } from "./components/dropzone";
import { TermsAndPrivacy } from "./components/terms-and-privacy";
import { CustomWebcam } from "./components/webcam";

export default function App() {
  return (
    <>
      <div className="text-center">
        <div className="flex space-x-2 items-center justify-center">
          <h1 className="text-3xl font-bold mb-0">O-Ce-Er</h1>
          <TermsAndPrivacy />
        </div>
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
      <CustomDropzone />
      <CodeBlocks />
      <p>Or use your camera</p>
      <CustomWebcam />
    </>
  );
}
