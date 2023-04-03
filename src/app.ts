import express, { Application, Request, Response, NextFunction } from "express";
import { getAllImages, prepareImageList } from "./controllers/image.controller";

const app: Application = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response) => {
  const images = prepareImageList(await getAllImages());

  res.render("index", {
    images: images || [],
    error: null,
    success: null,
  });
});

app.get("/*", (req: Request, res: Response) => res.redirect("/"));

const API = "/api/v1";
app.use(`${API}/image`, require("./routes/image.routes"));

export default app;
