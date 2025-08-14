import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { prettyJSON } from "hono/pretty-json";
import { APIErrorResponse, APISuccessResponse } from "./models/response";
import { ocrService } from "./services/ocr";

const app = new Hono();

app.use("/*", cors());
app.use(compress());

app.use(prettyJSON());

app.post(
  "/api/ocr",
  bodyLimit({
    maxSize: 1024 * 1024 * 10, //
    onError: (c) => {
      return c.json(
        new APIErrorResponse(413, "Payload Too Large", "Image is too large"),
        413
      );
    },
  }),
  async (c) => {
    try {
      const formdata = await c.req.parseBody();
      const image = formdata["image"] as File | string;

      if (!image) {
        throw new HTTPException(400, {
          message: "Image is required",
        });
      }

      if (typeof image === "string") {
        if (!image.includes("image/")) {
          throw new HTTPException(400, {
            message: "File is not an image",
          });
        }
      } else {
        if (!(image as File).type.startsWith("image/")) {
          throw new HTTPException(400, {
            message: "File is not an image",
          });
        }
      }

      const text = await ocrService(image);

      return c.json(new APISuccessResponse(200, "Success", { text }));
    } catch (err: any) {
      console.log(err);
      throw new HTTPException(err.status, { message: err.message });
    }
  }
);

app.get("/", (c) => {
  return c.json(new APISuccessResponse(200, "Success", "OCR API"));
});

export default app;
