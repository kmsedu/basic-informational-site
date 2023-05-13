import http from "http";
import fs from "fs";

const HOSTNAME = "localhost";
const PORT = 8080;

const pages = [];

fs.readdir("./", (error, files) => {
  if (error) throw new Error(error);

  for (const file of files) {
    file.includes(".html") &&
      pages.push(`/${file.slice(0, file.indexOf("."))}`);
  }
});

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  if (req.url === "/") {
    fs.readFile("./index.html", "utf8", (error, data) => {
      if (error) throw new Error(error);
      res.end(data);
    });
  }

  if (pages.includes(req.url)) {
    fs.readFile(`.${req.url}.html`, "utf8", (error, data) => {
      if (error) throw new Error(error);
      res.end(data);
    });
  }

  res.statusCode = 404;

  fs.readFile("./404.html", "utf8", (error, data) => {
    if (error) throw new Error(error);
    res.end(data);
  });
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Test server running at http://${HOSTNAME}:${PORT}`);
});
