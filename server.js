const http = require("http");
const url = require("url");

const { getDate } = require("./modules/utils");
const { greeting } = require("./lang/en/en");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const name = parsedUrl.query.name;

  if (pathname === "/COMP4537/labs/3/getDate/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });

    if (name) {
      const currentDate = getDate();
      const messageText = greeting(name, currentDate);

      res.end(`<p style="color:blue;">${messageText}</p>`);
    } else {
      res.end(
        `<p style="color:blue;">Please provide your name using ?name=YourName</p>`,
      );
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
