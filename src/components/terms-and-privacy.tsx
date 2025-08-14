import { InfoIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export function TermsAndPrivacy() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button size="icon" variant="ghost">
          <InfoIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms and Privacy</DialogTitle>
          <DialogDescription className="text-justify">
            This web app is used for OCR (Optical Character Recognition)
            purpose. It is not used for any other purpose. The images are not
            stored on the server.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
