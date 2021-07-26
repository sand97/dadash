const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const helper = require('../core/helper')
const camelcase = require('camelcase')
const uc = require('ucfirst')

module.exports = (params) => {
    helper.checkReduxFolderStructure();

    let types_content = ""
    let reducers_content = ""
    let type_content = ""
    let actions_content = ""
    let action_content = ""
    let reducer_content = ""
    let action_type_interface = ""
    console.log('create_reducer_event', params);
    console.log('__dirname', __dirname);
    console.log('cwd', process.cwd());
    const types_path = path.join(process.cwd(), 'src', 'store', 'types.ts');
    const reducers_path = path.join(process.cwd(), 'src', 'store', 'reducer.ts');
    const actions_path = path.join(process.cwd(), 'src', 'store', 'actions.ts');

    try {
        types_content = fs.readFileSync(path.join(types_path)).toString('utf-8');
        reducers_content = fs.readFileSync(path.join(reducers_path)).toString('utf-8');
        actions_content = fs.readFileSync(path.join(actions_path)).toString('utf-8');
        type_content = fs.readFileSync(path.join(__dirname, '..', 'templates', 'redux', 'type.tmp')).toString('utf-8');
        action_content = fs.readFileSync(path.join(__dirname, '..', 'templates', 'redux', 'action.tmp')).toString('utf-8');
        reducer_content = fs.readFileSync(path.join(__dirname, '..', 'templates', 'redux', 'reducer.tmp')).toString('utf-8');
    } catch (e) {
        console.log(chalk.red(`Unable to read file some file(s) template. Detail:\n${e}`))
        process.exit(1);
    }

    const new_type_path = path.join(process.cwd(), 'src', 'store', 'types', `${uc(camelcase(`${params.name}_Type`))}.ts`);
    const new_action_path = path.join(process.cwd(), 'src', 'store', 'actions', `${uc(camelcase(`${params.name}_Action`))}.ts`);
    const new_reducer_path = path.join(process.cwd(), 'src', 'store', 'reducers', `${uc(camelcase(`${params.name}_Reducer`))}.ts`);

    try {
        for (let p of [new_type_path, new_action_path, new_reducer_path]) {
            if (fs.existsSync(p)) {
                console.log(chalk.red(`Some files already exist:\n${p.toString()}`));
                process.exit();
            }
        }
    } catch (e) {
        console.log(chalk.red(`Unable to read some(s) file(s). Detail:\n${e}`));
        process.exit();
    }

    const state = uc(camelcase(`${params.name}_State`));
    const type = uc(camelcase(`${params.name}_Type`));
    const action = uc(camelcase(`${params.name}_Action`));
    const reducer = uc(camelcase(`${params.name}_Reducer`));
    type_content = type_content.replace('cli_state_type', state)
    types_content = types_content.replace('//cli_export_type_section', `//cli_export_type_section\nexport * from './types/${type}';`)
    types_content = types_content.replace('//cli_application_state_section', `//cli_application_state_section\n\t${params.name.toLowerCase()} : ${state},`)
    types_content = types_content.replace('//cli_import_section', `//cli_import_section\nimport {${state}} from 'store/types';`)
    reducers_content = reducers_content.replace('//cli_import_section', `//cli_import_section\nimport ${reducer} from './reducers/${reducer}';`)
    reducers_content = reducers_content.replace('//cli_reducer_section', `//cli_reducer_section\n\t${params.name.toLowerCase()} : ${reducer}`)
    reducer_content = reducer_content.replace(/cli_state_type/g, state)
    actions_content = actions_content.replace('//cli_export_section', `export * from 'store/actions/${action}';`)
    // console.log('type file content\n', type_content);

    try {
        fs.writeFileSync(new_type_path, type_content);
        fs.writeFileSync(new_reducer_path, reducer_content);
        fs.writeFileSync(new_action_path, action_content);
        fs.writeFileSync(types_path, types_content);
        fs.writeFileSync(reducers_path, reducers_content);
        //file written successfully
    } catch (err) {
        console.error(err);
        process.exit();
    }

    console.log(`${chalk.blue('Reducer has bean created successfully')}`);
}

