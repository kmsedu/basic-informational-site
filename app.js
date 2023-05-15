import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { existsSync, readdirSync } from "fs";
import { cleanPath } from "./lib/clean-path.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use((req, res) => {
  let filePath = cleanPath(req.path);

  res.setHeader("Content-Type", "text/html");

  if (existsSync(path.join(__dirname, filePath))) {
    res.status = 200;
  } else {
    res.status = 404;
    filePath = "404.html";
  }

  res.sendFile(path.join(__dirname, filePath));
});

app.listen(8080, () => {
  console.log("Listening now on port 8080");
});
