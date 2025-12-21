import { intro, outro, text } from "@clack/prompts";
import { styleText } from "util";
import { CONTENT_FOLDER, PROFILE_FILE, cwd, version } from "./constants.js";
import { exitIfCancel, getWeek } from "./helpers.js";
import { execSync } from "child_process";
import path from "path";
import fs from "fs";

/**
 * Handles command `npx lernraum init`
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
    username = username
      .replaceAll(" ", "-")
      .toLowerCase()
      .trim();
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

  const profile = { username: username };
  const profilePath = path.join(cwd, PROFILE_FILE);
  await fs.promises.writeFile(profilePath, JSON.stringify(profile));
}

/**
 * Handles command `npx lernraum new`
 * @param {import("./args.js").NewReportArgvInterface} argv
 */
export async function handleNewReport(argv) {
  console.log();
  intro(styleText(["bgGreen", "black"], ` Lernraum v${version} `));
  const profilePath = path.join(cwd, PROFILE_FILE);
  /** @type {{ username: string } | undefined} */
  let profile = undefined;

  // When there is no file `.profile.json`, exit
  if (fs.existsSync(profilePath)) {
    profile = JSON.parse(fs.readFileSync(profilePath).toString());
  } else {
    outro(
      styleText(
        "red", 
        `You should run \`${styleText(
          "yellow", 
          "npx lernraum init"
        )}\` before \`${styleText(
          "yellow", 
          "npx lernraum new"
        )}\``
      )
    );
    process.exit(1);
  }
  let currentYear = argv.year;
  if (!currentYear) {
    currentYear = new Date().getFullYear();
  }
  let currentWeek = argv.week;
  if (!currentWeek) {
    currentWeek = getWeek();
  }

  const username = profile.username;
  const markdown = `${currentYear}-week-${currentWeek}.md`;
  const userContentPath = path.join(cwd, CONTENT_FOLDER, username);
  const markdownPath = path.join(userContentPath, markdown);
  if (!fs.existsSync(userContentPath) || !fs.lstatSync(userContentPath).isDirectory()) {
    outro(
      styleText(
        "red", 
        `You should run \`${styleText(
          "yellow", 
          "npx lernraum init"
        )}\` before \`${styleText(
          "yellow", 
          "npx lernraum new"
        )}\``
      )
    );
    process.exit(1);
  }

  if (!fs.existsSync(markdownPath)) {
    await fs.promises.writeFile(
      markdownPath
      `---
title: ${currentYear} Week ${currentWeek} Report
author: ${username}
date: ${currentYear}-${new Date().getMonth() + 1}-${new Date().getDate()}
---
`
    );
  } else {
    outro(
      styleText(
        "red",
        `You have created a weekly report this week, please edit the existing report.`
      )
    );
    process.exit(1);
  }

  outro(`You have successfully created a new weekly report at ${path.join(userContentPath, markdown)}, now you can
  • Edit weekly report freely, notice not to break the yaml header ~
  • Scan your brain to memory what have you done this week ~ Have a nice day !`);
}