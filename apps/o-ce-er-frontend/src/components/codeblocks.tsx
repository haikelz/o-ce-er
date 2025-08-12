import { fileAtom, resultAtom } from "@/store";
import { useAtomValue } from "jotai";
import ShikiHighlighter from "react-shiki/web";

export function CodeBlocks() {
  const file = useAtomValue(fileAtom);
  const result = useAtomValue(resultAtom);

  return (
    <>
      {file && result ? (
        <div className="mt-6 w-full">
          <ShikiHighlighter language="markdown" theme="github-dark">
            {result.trim()}
          </ShikiHighlighter>
        </div>
      ) : null}
    </>
  );
}
