// const { createServer } = require("http");
// const { parse } = require("url");
// const next = require("next");

// const dev = process.env.NODE_ENV !== "production";
// const hostname = "localhost";
// const port = process.env.PORT || 3000;
// // when using middleware `hostname` and `port` must be provided below
// const app = next({ dev, hostname, port });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   createServer(async (req, res) => {
//     try {
//       // Be sure to pass `true` as the second argument to `url.parse`.
//       // This tells it to parse the query portion of the URL.
//       const parsedUrl = parse(req.url, true);
//       const { pathname, query } = parsedUrl;

//       //   if (pathname === '/a') {
//       //     await app.render(req, res, '/a', query)
//       //   } else if (pathname === '/b') {
//       //     await app.render(req, res, '/b', query)
//       //   } else {
//       //     await handle(req, res, parsedUrl)
//       //   }

//       //   ROUTE
//       switch (pathname) {
//         case "/":
//           await app.render(req, res, "/", query);
//           break;
//         // case "/dashboard":
//         //   await app.render(req, res, "/dashboard", query);
//         //   break;
//         // case "/my-profile":
//         //   await app.render(req, res, "/my-profile", query);
//         //   break;
//         default:
//           await handle(req, res, parsedUrl);
//       }
//     } catch (err) {
//       console.error("Error occurred handling", req.url, err);
//       res.statusCode = 500;
//       res.end("internal server error");
//     }
//   }).listen(port, (err) => {
//     if (err) throw err;
//     console.log(`> Ready on http://${hostname}:${port}`);
//   });
// });

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port);

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? "development" : process.env.NODE_ENV
    }`
  );
});
