/**
 * @typedef {object} InitializeArgvInterface
 * @property {string} [username]
 */

export const InitializeArgv = {
  username: {
    string: true,
    alias: ["u"],
    describe: "username appeared in directory and branch",
  }
};