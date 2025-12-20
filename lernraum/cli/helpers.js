import { isCancel, outro } from "@clack/prompts";
import { styleText } from "util";

/**
 * Used with `select` function of -clack/prompts, when user doesn't choose a
 * selection item and cancels, then the command line interface will exit.
 * @param {unknown} val 
 * @returns {void | unknown} if user cancels process will exit, return type is
 * void, if user chooses an item, return the item.
 */
export function exitIfCancel(val) {
  if (isCancel(val)) {
    outro(styleText("red", "Exiting"));
    process.exit(0);
  } else {
    return val;
  }
}