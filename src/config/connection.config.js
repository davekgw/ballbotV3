import Pino from "pino";
import Start from "../index.js";

/**
 * Using config connection see in docs @adiwajsing/baileys 
 * Using level silent from pino query string 
 * by Bolaxd github 
 * you cannot edit this [ warning!!! ]
*/
export const LOG = Pino({ level: "silent" })
export default class ConnectionConfig {
	constructor() {
		this.logger = LOG
		this.markOnlineOnConnect = new Start().config.isOnline
		this.printQRInTerminal = true
		this.generateHighQualityLinkPreview = true 
		this.qrTimeout = new Start().config.longQR
		this.browser = ["bolaxd", "safari", "1.0.0"]
		this.patchMessageBeforeSending = (message) => { // Supaya list message dan button template work
			const requiresPatch = !!(message.buttonsMessage || message.templateMessage || message.listMessage);
			if (requiresPatch) message = { viewOnceMessage: { message: { messageContextInfo: { deviceListMetadataVersion: 2, deviceListMetadata: {} }, ...message } } };
			return message;
		}
	}
}
