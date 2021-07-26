const create_action = require('../handlers/create_action');
const create_reducer = require('../handlers/create_reducer');
const action_scheme = require('../validators/action');


module.exports = [
    {
        url: "/make/action",
        handler: create_action,
        scheme: action_scheme.create_action_schema
    },
    {
        url: "/make/reducer",
        handler: create_reducer,
        scheme: action_scheme.create_reducer_scheme
    },
];