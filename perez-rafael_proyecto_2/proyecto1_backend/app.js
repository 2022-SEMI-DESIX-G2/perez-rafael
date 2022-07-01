require("dotenv").config();
const { dbConnection } = require('./db/config');
const Pokemon = require("./models/pokemon");


const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios").default;

const { PORT = 3000 } = process.env;

const CACHE = {};
const ERROR = {};
const SEGUNDOS = 10 * 1000;

app.use(cors());

app.get("/cache", function(req, res) {
    res.json({ data: CACHE });
});

app.post("/pokemon/:name", async function(req, res) {
    const { name } = req.params;
    const now = new Date();
    const pokemonFind = await Pokemon.findOne({ name })
        //console.log((now - pokemonFind.date))
    if (pokemonFind) {
        if ((now - pokemonFind.date >= SEGUNDOS)) {
            console.log("entre aqui")
            await Pokemon.findOneAndDelete({ name });
        } else {
            return res.json({ data: pokemonFind, isCached: true });
        }
    }
    if (ERROR[name]) {
        return res.json({ data: JSON.parse(ERROR[name]), isCached: true });
    }


    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const species_url = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
    const encounters_url = `https://pokeapi.co/api/v2/pokemon/${name}/encounters`;

    let responseData;

    try {

        const { data: pokemon } = await axios.get(url);

        const { data: species_data } = await axios.get(species_url)

        const { data: evolutionChain_data } = await axios.get(species_data.evolution_chain.url)

        const { data: encounters_data } = await axios.get(encounters_url);

        pokemon['date'] = new Date();
        pokemon['date_string'] = (new Date()).toLocaleString("es-ES");
        pokemon['evolution_chain_data'] = evolutionChain_data;
        pokemon['encounters_data'] = encounters_data;


        const pokemondb = new Pokemon(pokemon);

        await pokemondb.save();

        res.status(201).json({ data: pokemondb, isCached: false });
    } catch {
        responseData = 'error';
        ERROR[name] = JSON.stringify({ name, error: "Invalid pokemon." });
    }
});

(() => {
    dbConnection().then(() => {
        //Creación del servidor
        app.listen(PORT, () => {
            console.log(`Running on port ${PORT}...`);
        })
    }).catch(err => console.log(err))
})();