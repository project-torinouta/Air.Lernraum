import { readFileSync } from "fs";

export const CONTENT_FOLDER  = "content";
export const PROFILE_FILE = ".profile.json";
export const cwd = process.cwd();
/** @type {{ version: string }} */
export const { version } = JSON.parse(readFileSync("./package.json").toString());