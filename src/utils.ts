import { resolve } from "url";
import { SELF_SERVER_URL } from "./constants";

export const resolveSelfUrl = (path: string) => resolve(SELF_SERVER_URL, path);