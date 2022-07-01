const { Schema, model } = require('mongoose');

const PokemonSchema = Schema({
    name: {
        type: String
    },
    abilities: {
        type: Array
    },
    id: {
        type: Number
    },
    sprites: {
        type: Object
    },
    evolution_chain_data: {
        type: Object
    },
    encounters_data: {
        type: Array
    },
    height: {
        type: Number
    },
    weight: {
        type: Number
    },
    date: {
        type: Date
    },
    date_string: {
        type: String
    },
});


module.exports = model('Pokemon', PokemonSchema);