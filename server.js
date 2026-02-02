const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const { getDate } = require("./modules/utils");
const { greeting } = require("./lang/en/en");

class Server {
  constructor(port) {
    this.port = port || 3000;
    this.filePath = path.join(__dirname, "file.txt");
    this.server = http.createServer(this.requestHandler.bind(this));
  }

  requestHandler(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    res.writeHead(200, { "Content-Type": "text/html" });

    if (pathname.includes("writeFile")) {
      const text = parsedUrl.query.text;
      fs.appendFileSync(this.filePath, text + "\n");
      res.end(`<p style="color:blue;">"${text}" was appended to file.txt</p>`);
    } else if (pathname.includes("getDate")) {
      const name = parsedUrl.query.name;
      const message = name ? greeting(name, getDate()) : "Please provide your name using ?name=YourName";
      res.end(`<p style="color:blue;">${message}</p>`);
    }

    if (pathname.includes("readFile")) {
      const content = fs.existsSync(this.filePath) ? fs.readFileSync(this.filePath, "utf8") : "";
      res.end(`<p style="color:blue;">${content}</p>`);
    }
  }
}

const app = new Server(3000);
app.server.listen(app.port, () => {
  console.log(`Server running on port ${app.port}`);
});
