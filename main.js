import { createServer } from "node:http";
import Start from "./src/index.js";
import path from "path";
import { fileURLToPath } from "url";

const start = new Start()

function serverUptime(options = {}) {
 let port = options.port || 8080;
 let customURL = options.path ? options.path.toString() : "/";
 let customResponse = options.message ? options.message.toString() : "200 OK!";
 const request = async (req, res) => {
  if (options.debug) console.log(`::debug:: [repl-uptime] => ${req.method.toLowerCase()} ${req.url}`);
  if (req.url === customURL) {
   res.writeHead(200);
   return res.end(customResponse);
  }
 };
 const server = createServer(request);
 server.listen(port, () => {
  if (options.debug) console.log(`::debug:: [repl-uptime] => Server listening on port ${port}`);
 });
}
start.bot();
serverUptime({ port: start.config.PORT, message: start.config.message, path: start.config.router, debug: true });
