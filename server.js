const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const { getDate } = require("./modules/utils");
const { greeting } = require("./lang/en/en");

class Server {
  constructor() {
    this.port = process.env.PORT || 3000;
    this.filePath = path.join(__dirname, "file.txt");
    this.server = http.createServer(this.requestHandler.bind(this));
  }

  requestHandler(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname.includes("writeFile")) {
      const text = parsedUrl.query.text;
      fs.appendFileSync(this.filePath, text + "\n");
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(text + " was appended to file.txt");
    }

    if (pathname.includes("readFile")) {
      const content = fs.existsSync(this.filePath)
        ? fs.readFileSync(this.filePath, "utf8")
        : "";
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(content);
    }

    if (pathname.includes("getDate")) {
      const name = parsedUrl.query.name;
      const message = name
        ? greeting(name, getDate())
        : "Please provide your name using ?name=YourName";
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`<p style="color:blue;">${message}</p>`);
    }
  }
}

const app = new Server();
app.server.listen(app.port, () => {
  console.log(`Server running on port ${app.port}`);
});
