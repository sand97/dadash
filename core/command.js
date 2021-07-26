const yargs = require("yargs");
const chalk = require("chalk");

module.exports = yargs
    .usage("Usage: hello <command> [OPTIONS]")
    .command("make", "Create a new resource like actions, services and other", (yargs, help) => {
        return yargs
            .command('reducer', `Create reducer in ${chalk.blue('reducer')} folder`, {
                name: {
                    alias: "n",
                    describe: `Eg. ${chalk.blue('-n Chat')} to create ${chalk.blue("ChatReducer.tsx")} file`,
                    type: "string",
                    demandOption: true
                },
                action: {
                    alias: "a",
                    describe: `Eg. ${chalk.blue('-a AddMessage')} to create ${chalk.blue("AddMessageAction")}`,
                    type: "string"
                },
            })
            .command('action', `Create action in ${chalk.blue('reducer')}`, {
                name: {
                    alias: "n",
                    describe: `Eg. ${chalk.blue('-a AddMessage')} to create ${chalk.blue("AddMessageAction")}`,
                    type: "string",
                    demandOption: true
                },
                reducer: {
                    alias: "r",
                    describe: `Eg. ${chalk.blue('-r Message')} to add in ${chalk.blue("MessageReducer")}`,
                    type: "string",
                    demandOption: true
                },
            })
    })
    .command("update", "Update a resource like actions, services and other")
    .argv;

