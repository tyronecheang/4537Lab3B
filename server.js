const http = require("http");
const url = require("url");

const { getDate } = require("./modules/utils");
const { greeting } = require("./lang/en/en");

class Server {
  constructor(port) {
    this.port = port || 3000;
    this.server = http.createServer(this.requestHandler.bind(this));
  }

  requestHandler(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const name = parsedUrl.query.name;

    res.writeHead(200, { "Content-Type": "text/html" });

    const message = name
      ? greeting(name, getDate())
      : "Please provide your name using ?name=YourName";

    res.end(`<p style="color:blue;">${message}</p>`);
  }
}

const app = new Server(process.env.PORT);

app.server.listen(app.port, () => {
  console.log(`Server running on port ${app.port}`);
});