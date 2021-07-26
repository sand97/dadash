const fs = require('fs');
const chalk = require('chalk');
const path = require('path');


exports.checkReduxFolderStructure = () => {
    try {
        fs.readdirSync(path.join(process.cwd(), 'src', 'store', 'actions'));
        fs.readdirSync(path.join(process.cwd(), 'src', 'store', 'effect'));
        fs.readdirSync(path.join(process.cwd(), 'src', 'store', 'reducers'));
        fs.readdirSync(path.join(process.cwd(), 'src', 'store', 'actions'));
    } catch (e) {
        console.log(chalk.red(`Certains dossier son manquant dans votre architecture redux. Detail:\n${e}`));
        process.exit(1);
        return false
    }
    return true
}

exports.checkActionFileExist = () => {

}


exports.checkReducerFileExist = () => {

}

exports.checkTypeFileExist = () => {

}

