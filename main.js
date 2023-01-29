import { createServer } from "node:http";
import { fileURLToPath } from "url";
import Start from "./src/index.js";
import { writeFileSync } from "fs";
import path from "path";
// import yargs from 'yargs'

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
	server.on("error", async () => {
		console.log("Maaf PORT error!!!\nTunggu sebentar sedang membangun Port Baru");
		setTimeout(async () => {
			await console.clear();
			let conf = new Start().config
			conf.PORT += 1
			await writeFileSync("config.json", JSON.stringify(conf, null, 2))
			await serverUptime({ port: conf.PORT, message: conf.message, path: conf.router, debug: true });
		}, 5000)
	});
	server.listen(port, () => {
		console.clear();
		console.log(`::debug:: [repl-uptime] => Server listening on port ${port}\nSilahkan Kunjungi Link Lokal dibawah ini:\nhttp://localhost:${port}`)
		start.bot();
	});
}
serverUptime({ port: start.config.PORT, message: start.config.message, path: start.config.router, debug: true });
