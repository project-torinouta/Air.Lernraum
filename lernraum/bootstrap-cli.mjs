#!/usr/bin/env -S node --no-deprecation
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { version } from "./cli/constants.js";
import { InitializeArgv } from "./cli/args.js";
import { handleInitialize } from "./cli/handlers.js";

yargs(hideBin(process.argv))
  .scriptName("lernraum")
  .version(version)
  .command("init", "Initialize Lernraum", InitializeArgv, async (argv) => {
    await handleInitialize(argv);
  })
  .showHelpOnFail(false)
  .help()
  .strict()
  .demandCommand().argv;