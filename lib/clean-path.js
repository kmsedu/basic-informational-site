function cleanPath(str) {
  if (str === "/") return "index.html";
  if (!str.includes(".html")) return str + ".html";
  return str;
}

export { cleanPath };
