import { fileAtom, isCameraAtom, isFileFromDeviceAtom } from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useRef } from "react";
import type Webcam from "react-webcam";
import ReactWebcam from "react-webcam";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";

export function CustomWebcam() {
  const isCamera = useAtomValue(isCameraAtom);
  const setIsCamera = useSetAtom(isCameraAtom);

  const setFile = useSetAtom(fileAtom);
  const setIsFileFromDevice = useSetAtom(isFileFromDeviceAtom);

  const webcamRef = useRef<Webcam>(null);

  const startCamera = useCallback(() => {
    setIsCamera(true);
    setIsFileFromDevice(true);
  }, [setIsCamera, setIsFileFromDevice]);

  const captureImage = useCallback(() => {
    const imgSrc = webcamRef.current?.getScreenshot();
    setFile(imgSrc as unknown as File);
    setIsCamera(false);
    setIsFileFromDevice(false);
  }, [webcamRef, setFile, setIsCamera, setIsFileFromDevice]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={startCamera}>Start Camera</Button>
      </DialogTrigger>
      <DialogContent>
        {isCamera ? (
          <ReactWebcam
            videoConstraints={{ width: 1280, height: 720 }}
            ref={webcamRef}
            screenshotFormat="image/png"
            minScreenshotHeight={720}
            minScreenshotWidth={1280}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <p>No camera found</p>
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild onClick={() => setIsCamera(false)}>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <DialogClose asChild onClick={captureImage}>
            <Button>Capture</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
