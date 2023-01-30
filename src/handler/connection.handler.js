import { Fake } from "../helper/fake.helper.js";
import { Boom } from "@hapi/boom";

export class Connection {
	constructor(UPDATE, MakeWASocket) {
		this.error = UPDATE.lastDisconnect?.error;
		this.connection = UPDATE.connection;
		this.loggedOut = MakeWASocket.DisconnectReason?.loggedOut;
		this.statusCode = new Boom(this.error).output?.statusCode;
	}
	status ({ Func, Logger, config}, Start) {
		if (this.connection == "close"){
			if (this.statusCode === this.loggedOut)
			new Start().bot(), console.log(Logger.RESTART_KONEKSI);
			else new Start().bot();
		} else if (this.connection == "connecting")
			console.log(Logger.AWAIT_KONEKSI);
		else if (this.connection == "open")
			console.warn(Logger.TERKONEK),
			Func.sendteks(config.developer + "@s.whatsapp.net", Logger.TERKONEK, new Fake().fakeStatus("Notification..."));
	}
}
