import got from "got"

export class Api {
	static async getBuffer(url) {
		return await got(url).buffer()
	}
	static async getStream (url) {
		let data
		try {
			let stream = await got.stream(url, { allowGetBody: true })
			stream.on("data", f => data += f)
			stream.end()
		} catch (e) {
			console.log(e);
		}
		return data
	}
}
