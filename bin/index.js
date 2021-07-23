#!/usr/bin/env node
const yargs = require("yargs");
const chalk = require("chalk");
const boxen = require("boxen");
//
// const greeting = chalk.white.bold("Hello!");
//
// const boxenOptions = {
//     padding: 1,
//     margin: 1,
//     borderStyle: "round",
//     borderColor: "green",
//     backgroundColor: "#555555"
// };
// const msgBox = boxen( greeting, boxenOptions );
//
// console.log(msgBox);


const options = yargs
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
    })
    .command("update", "Update a resource like actions, services and other")
    .argv;

console.log(options);