import { env } from "process";
import { resolve } from "url";

export const NAME = "OPDS2 authentification test server";

export const SELF_SERVER_URL = env.SERVER_URL || "http://localhost:4000/";

export const STATIC_SERVER_URL = env.STATIC_URL || "http://localhost:8080/";

const _STREAMER_SERVER_URL = env.STREAMER_URL || "http://localhost:3000/";
export const STREAMER_SERVER_URL = resolve(_STREAMER_SERVER_URL, "/url"); 