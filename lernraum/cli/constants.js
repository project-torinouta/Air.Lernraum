import { readFileSync } from "fs";
import path from "path";

export const CONTENT_FOLDER  = "content";
export const PROFILE_FILE = ".profile.json";
export const DEPLOY_PROJECT_TARGET = path.join("quartz", "content");
export const cwd = process.cwd();
/** @type {{ version: string }} */
export const { version } = JSON.parse(readFileSync("./package.json").toString());