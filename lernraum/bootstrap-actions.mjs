#!/usr/bin/env -S node --no-deprecation
import fs from "fs";
import path from "path";
import { CONTENT_FOLDER, DEPLOY_PROJECT_TARGET, cwd } from "./cli/constants.js";

function main() {
  const targetPath = path.join(cwd, DEPLOY_PROJECT_TARGET);
  const contentPath = path.join(cwd, CONTENT_FOLDER);
  const subs = fs.readdirSync(contentPath);
  /** @type {string[]} */
  const folders = [];

  fs.cpSync(
    path.join(cwd, "README.md"),
    path.join(targetPath, "index.md")
  );

  for (const sub of subs) {
    const fp = path.join(contentPath, sub);
    if (fs.statSync(fp).isDirectory()) folders.push(fp);
    // Variable `folders` contains the full path of each users' directory
  }

  /** @type {string[]} */
  const reports = [];
  for (const folder of folders) {
    const subs = fs.readdirSync(folder);
    for (const sub of subs) {
      if (!reports.includes(sub)) {
        reports.push(sub);
      }
    }
  }
  // Variable `reports` contains the name of every weekly report

  for (const report of reports) {
    let mergedContent = "";
    for (const folder of folders) {
      const reportFullPath = path.join(folder, report);
      if (fs.existsSync(reportFullPath)) {
        const content = fs.readFileSync(reportFullPath).toString();
        mergedContent += 
          `# ${folder.slice(folder.lastIndexOf("/") + 1)}'s report\n\n` +
          content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, "").trim() +
          "\n\n";
        // Remove yaml header
      } else {
        mergedContent +=
          `# ${folder.slice(folder.lastIndexOf("/") + 1)}'s report\n\n` +
          "*No Content Provided*\n\n";
      }
    }
    const currentYear = /^(\d+)-week-(\d+)\.md$/.exec(report)[1];
    const currentWeek = /^(\d+)-week-(\d+)\.md$/.exec(report)[2];
    mergedContent = `---
title: Week report ${currentWeek} of ${currentYear}
---
` + mergedContent;
    fs.writeFileSync(path.join(targetPath, report), mergedContent);
  }
}

main();