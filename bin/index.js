#!/usr/bin/env node
const Router = require('routes');
const router = Router();
const validate = require('validate.js')

const yargs = require("yargs");
const chalk = require("chalk");
const boxen = require("boxen");
const routes = require('../core/routes')

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


const options = require('../core/command')
const link = `/${options._.join('/')}`;
const matchRoute = (scheme, handler) => {
    const {_, $0, ...args} = options;
    const errors = validate(args, scheme);
    if (errors) {
        let error = "";
        Object.keys(errors).forEach(key => {
            error += `--${key} : ${errors[key].join(', ')}`
        })
        console.log(chalk.red(error));
    }else{
        handler(args);
    }
}

routes.map(r => {
    router.addRoute(r.url, () => matchRoute(r.scheme, r.handler));
});

const match = router.match(link);
if (!match)
    console.error(chalk.red('No command found'));
else
    match.fn();

