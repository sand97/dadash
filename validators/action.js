
exports.create_action_schema = {
    name: {
        presence: {message: "Veuillez saisir le nom de l'action"},
        type: "string",
    },
    reducer: {
        presence: {message: "Veuillez saisir le nom d'un reducer existant"},
        type: "string",
    },
}

exports.create_reducer_scheme = {
    name: {
        presence: {message: "Veuillez saisir le nom du reducer"},
        type: "string",
    }
}