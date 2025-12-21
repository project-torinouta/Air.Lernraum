#!/usr/bin/env -S node --no-deprecation
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { version } from "./cli/constants.js";
import { InitializeArgv, NewReportArgv, PushArgv } from "./cli/args.js";
import { handleInitialize, handleNewReport } from "./cli/handlers.js";

yargs(hideBin(process.argv))
  .scriptName("lernraum")
  .version(version)
  .command("init", "Initialize Lernraum", InitializeArgv, async (argv) => {
    await handleInitialize(argv);
  })
  .command("new", "Create a new weekly report", NewReportArgv, async (argv) => {
    await handleNewReport(argv);
  })
  .command("push", "Push your weekly report to the repo", PushArgv, async (argv) => {

  })
  .showHelpOnFail(false)
  .help()
  .strict()
  .demandCommand().argv;