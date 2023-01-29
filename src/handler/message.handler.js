import * as Logger from "../config/logger.config.js";
import Mek from "./parser.handler.js";
import { readdirSync } from "fs";
import { join } from "path";

let rootPlugin = join("src", "plugins");
const foldersPlugin = readdirSync(rootPlugin, { withFileTypes: true }).filter(v => v.isDirectory());

export default class Message{
	constructor(UPDATE, Conn){
		this.UPDATE = UPDATE;
		this.conn = Conn;
		this.Mek = new Mek(Conn, UPDATE);
	}
	async received() {
		if (this.Mek?.fromMe) return
		console.log(this.Mek);
		foldersPlugin.map(async ({ name }) => {
			let files = readdirSync(join(rootPlugin, name));
			for await (let file of files) {
				try {
					if (!this.Mek.isDev && this.conn.developer) {
						if (this.Mek.command) this.conn.Func.sendteks(this.Mek.chat, this.conn.Logger.MODE_MAIN, this.Mek);
						continue;
					}
					let imporr
					if (this.conn.developer) imporr = await import("../" + join("plugins", name, file) + "?version=" + Date.now())
					else if (!this.conn.developer) imporr = await import("../" + join("plugins", name, file))
					if (!imporr.default) continue;
					console.log(imporr);
					let plugin = new imporr.default(this.conn, this.Mek);
					if (plugin.top && typeof plugin.top === "function") plugin.top()
					if (plugin.mid && typeof plugin.mid === "function") {
						if (!plugin.command) continue;
						if (plugin.command.includes(this.Mek?.command)) plugin.mid()
					}
				} catch(e) {
					this.conn.Func.sendteks(this.conn.config.developer[0] + "@s.whatsapp.net", 
					`*Error File : ${file}*\n` +
					`*Oleh: @${this.Mek?.sender.split("@")[0]}*\n\n` +
					`\`\`\`${format(e)}\`\`\``,
					 { mentions: [this.Mek?.sender] }) 
				}
			}
		});
	}
}
