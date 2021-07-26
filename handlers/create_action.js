const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const helper = require('../core/helper')
const camelcase = require('camelcase')
const uc = require('ucfirst')


module.exports = (params) => {
    console.log('create_action_event', params);
    console.log('__dirname', __dirname);
    helper.checkReduxFolderStructure();

    let action_type = "";
    let action_function = "";
    let use_case = "";

    try {
        action_type = fs.readFileSync(path.join(__dirname, '..', 'templates', 'redux', 'action_type.tmp')).toString('utf-8');
        action_function = fs.readFileSync(path.join(__dirname, '..', 'templates', 'redux', 'action_func.tmp')).toString('utf-8');
        use_case = fs.readFileSync(path.join(__dirname, '..', 'templates', 'redux', 'use_case.tmp')).toString('utf-8');
    } catch (e) {
        console.log(chalk.red(`Unable to read file some file(s) template. Detail:\n${e}`))
        process.exit(1);
    }

    const type_path = path.join(process.cwd(), 'src', 'store', 'types', `${uc(camelcase(`${params.reducer}_Type`))}.ts`);
    const action_path = path.join(process.cwd(), 'src', 'store', 'actions', `${uc(camelcase(`${params.reducer}_Action`))}.ts`);
    const reducer_path = path.join(process.cwd(), 'src', 'store', 'reducers', `${uc(camelcase(`${params.reducer}_Reducer`))}.ts`);
    const types_path = path.join(process.cwd(), 'src', 'store', 'types.ts');
    const actions_path = path.join(process.cwd(), 'src', 'store', 'actions.ts');

    try {
        for (let p of [type_path, action_path, reducer_path]) {
            if (!fs.existsSync(p)) {
                console.log(chalk.red(`Some files don't exist:\n${p.toString()}`));
                process.exit();
            }
        }
    } catch (e) {
        console.log(chalk.red(`Unable to read some(s) file(s). Detail:\n${e}`));
        process.exit();
    }

    let type_content = "", reducer_content = "", action_content = "", types_content = "", actions_content = "";

    try {
        types_content = fs.readFileSync(path.join(types_path)).toString('utf-8');
        type_content = fs.readFileSync(path.join(type_path)).toString('utf-8');
        reducer_content = fs.readFileSync(path.join(reducer_path)).toString('utf-8');
        action_content = fs.readFileSync(path.join(action_path)).toString('utf-8');
        actions_content = fs.readFileSync(path.join(actions_path)).toString('utf-8');
    } catch (e) {
        console.log(chalk.red(`Unable to read file some file(s) template. Detail:\n${e}`))
        process.exit(1);
    }


    const title = params.name.toUpperCase();
    const func = camelcase(`${params.name}_Action`);
    const type = uc(camelcase(`${params.name}_Action`));
    const data = uc(camelcase(`${params.name}_ActionParams`));



    action_type = action_type.replace('cli_action_interface', type)
    action_type = action_type.replace('cli_action_title', title)
    action_type = action_type.replace('cli_action_params', data)

    type_content = type_content.replace('//cli_export_interface_section', `//cli_export_interface_section\nexport interface ${data} {}`)
    type_content = type_content.replace('//cli_export_interface_section', `//cli_export_interface_section\n${action_type}`)
    type_content = type_content.replace('//cli_export_interface_section', `//cli_export_interface_section\nexport const ${title} = '${title}';\n`)



    action_function = action_function.replace('cli_action_func', func)
    action_function = action_function.replace('cli_action_params', data)
    action_function = action_function.replace('cli_action_interface', type)
    action_function = action_function.replace('cli_action_title', title)

    action_content = action_content.replace('//cli_import_section', `//cli_import_section\nimport {${type}, ${title}, ${data}} from 'store/types'`)
    action_content = action_content.replace('//cli_action_section', `//cli_action_section\n${action_function}`)


    reducer_content = reducer_content.replace('//cli_import_section', `//cli_import_section\nimport {${title}} from 'store/types'`)


    use_case = use_case.replace('cli_use_action_name', title)

    reducer_content = reducer_content.replace('//cli_use_cases_section', `//cli_use_cases_section\n${use_case}`)


    const actionType = uc(camelcase(`${params.name}_Type`));
    types_content = types_content.replace('//cli_import_section', `//cli_import_section\nimport {${type}} from 'store/types';`)
    types_content = types_content.replace('//cli_application_action_section', `| ${type}\n\t//cli_application_action_section`)

    try {
        fs.writeFileSync(type_path, type_content);
        fs.writeFileSync(reducer_path, reducer_content);
        fs.writeFileSync(action_path, action_content);
        fs.writeFileSync(types_path, types_content);
        //file written successfully
    } catch (err) {
        console.error(err);
        process.exit();
    }

    console.log(`${chalk.blue('Action has bean created successfully')}`);

}