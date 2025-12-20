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

/**
 * @typedef {object} NewReportArgvInterface
 * @property {number} [year]
 * @property {number} [week]
 */

export const NewReportArgv = {
  year: {
    number: true,
    alias: ["y"],
    describe: "year of created time of new weekly report",
  },
  week: {
    number: true,
    alias: ["w"],
    describe: "week of created time of new weekly report",
  }
};