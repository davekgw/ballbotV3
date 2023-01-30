import { readFileSync, accessSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import Start from "../index.js";

const dirr = join(dirname(fileURLToPath(import.meta.url)), "file");
const file = {
	user: join(dirr, "user." + (new Start().config).dbName),
	grup: join(dirr, "grup." + (new Start().config).dbName),
	bot: join(dirr, "bot." + (new Start().config).dbName),
}
try { 
	accessSync(file.user); /* check is file */ }
catch (e) { 
	writeFileSync(file.user, JSON.stringify({}, null, 2)); /* Write Default */ }
try { 
	accessSync(file.grup); /* check is file */ }
catch (e) { 
	writeFileSync(file.grup, JSON.stringify({}, null, 2)); /* Write Default */ }
try { 
	accessSync(file.bot); /* check is file */ }
catch (e) { 
	writeFileSync(file.bot, JSON.stringify({}, null, 2)); /* Write Default */ }

export let db = {
	user: JSON.parse(readFileSync(file.user)),
	grup: JSON.parse(readFileSync(file.grup)),
	bot: JSON.parse(readFileSync(file.bot)),
};

setInterval(async() => {
	writeFileSync(file.user, JSON.stringify(db.user, null, 2)); /* Write from read file db user */ 
	writeFileSync(file.grup, JSON.stringify(db.grup, null, 2)); /* Write from read file db grup */ 
	writeFileSync(file.bot, JSON.stringify(db.bot, null, 2)); /* Write from read file db bot */ 
}, 990);