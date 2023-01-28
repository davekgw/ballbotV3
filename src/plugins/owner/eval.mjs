import got from "got";
import cheerio from "cheerio";
import { format, inspect } from "util";

class Main {
	constructor({Func, Logger, config}, Mek) {
		this.command = ["eval", "ev"]
		this.category = "owner"
		this.mainten = "false"
		this.mid = async () => {
			if (!Mek.isDev) return Func.sendteks(Mek.chat, Logger.JUST_DEV, Mek);
			try {
				let evaling = await eval(!Mek.query ? Innalillahi_wainna_lillahi_rojiun:Mek.query)
				Func.sendteks(Mek.chat, typeof evaling != 'string' ? inspect(evaling) : format(evaling), Mek)
			} catch(e) {
				Func.sendteks(Mek.chat, await format(e) + '\n\n*Anda Sepertinya Harus banyak belajar bangg*\n*Jangan Asal tempel code*', Mek)
			}
		}
	}
}

export default Main;
