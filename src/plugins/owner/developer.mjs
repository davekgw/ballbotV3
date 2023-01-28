class Main {
	constructor(Conn, Mek) {
		this.command = ["maintenance", "mt"]
		this.category = "owner"
		this.mainten = "false"
		this.mid = async () => {
			let {Func, Logger, config} = Conn;
			if (!Mek.isDev) return Func.sendteks(Mek.chat, Logger.JUST_DEV, Mek);
			if (Mek.args[0] == "aktif") {
				if (Conn.developer) return Func.sendteks(Mek.chat, Logger.SUDAH_AKTIF_MAIN, Mek)
				Conn.developer = true
				Func.sendteks(Mek.chat, `Sukses Menghidupkan nya`, Mek)
			} else if (Mek.args[0] == "mati") {
				if (!Conn.developer) return Func.sendteks(Mek.chat, Logger.SUDAH_MATI_MAIN, Mek)
				Conn.developer = false
				Func.sendteks(Mek.chat, `Sukses mematikan nya`, Mek)
			} else {
				let teks = !Conn.developer ? `Apakah kamu yakin ingin Menghidupkan mode Maintenance Bot?\nMode ini dapat meningkatkan Ram dan Cache seiring perubahan File Plugins dan Ketika File tersebut di import`
										: `Mode Maintenance sekarang aktif, apakah kamu ingin Mematikan nya?\nKonfirmasi button dibawah`
				let but = !Conn.developer ? [["Aktifkan Mode", `.${Mek.command} yes`]]
										: [["Konfirmasi", `.${Mek.command} yes`]]
				Func.sendbutton(Mek.chat, teks, config.botName, but, m) 
			}
		}
	}
}

export default Main;
