import { intro, text } from "@clack/prompts";
import { styleText } from "util";
import { CONTENT_FOLDER, cwd, version } from "./constants.js";
import { exitIfCancel } from "./helpers.js";
import { execSync } from "child_process";
import path from "path";
import fs from "fs";

/**
 * @param {import("./args.js").InitializeArgvInterface} argv
 */
export async function handleInitialize(argv) {
  console.log();
  intro(styleText(["bgGreen", "black"], ` Lernraum v${version} `));
  let username = argv.username;
  if (!username) {
    username = exitIfCancel(
      await text({
        message: "Enter your name (spaces will replaced by dash `-` and whole name is lowercased).",
        placeholder: `e.g ${styleText("yellow", "alice")}`,
        validate(fp) {
          if (fp === "") {
            return "Username cannot be empty."
          }
        },
      }),
    );
  }
  execSync(`git checkout ${username} || git checkout -b ${username}`, {
    stdio: "ignore"
  });

  // Remove gitkeep and make a new username directory
  const gitkeepPath = path.join(cwd, CONTENT_FOLDER, ".gitkeep");
  if (fs.existsSync(gitkeepPath)) {
    await fs.promises.rm(gitkeepPath);
  }
  const usernamePath = path.join(cwd, CONTENT_FOLDER, username);
  await fs.promises.mkdir(usernamePath);
}