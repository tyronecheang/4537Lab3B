const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const { getDate } = require("./modules/utils");
const lang = require("./lang/en/en");

class Server {
  constructor() {
    this.port = process.env.PORT || 3000;
    this.filePath = path.join(__dirname, "file.txt");
    this.server = http.createServer(this.requestHandler.bind(this));
  }

  requestHandler(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname.includes("/COMP4537/labs/3/writeFile")) {
      const text = parsedUrl.query.text;
      fs.appendFileSync(this.filePath, text + "\n");
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(text + " " + lang.appended);
      return;
    }

    if (pathname.includes("/COMP4537/labs/3/readFile")) {
      const fileName = pathname.split("/").pop();
      const requestedPath = path.join(__dirname, fileName);

      if (!fs.existsSync(requestedPath)) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end(lang.fileNotFound.replace("%1", fileName));
        return;
      }

      const content = fs.readFileSync(requestedPath, "utf8");
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(content);
      return;
    }

    if (pathname.includes("/COMP4537/labs/3/getDate")) {
      const name = parsedUrl.query.name;
      const message = name
        ? lang.greeting.replace("%1", name) + " " + getDate()
        : lang.nameRequired;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`<p style="color:blue;">${message}</p>`);
      return;
    } 
  }
}

const app = new Server();
app.server.listen(app.port, () => {
  console.log(`Server running on port ${app.port}`);
});
