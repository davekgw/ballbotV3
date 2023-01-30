import { EventEmitter } from "events";

export const Metadata = new Map();

EventEmitter.prototype.setMaxListeners(0);