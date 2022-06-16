require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios").default;

const { PORT = 3000 } = process.env;

const CACHE = {};
const ERROR = {};
const SEGUNDOS = 1 * 60;

app.use(cors());

app.get("/cache", function(req, res) {
    res.json({ data: CACHE });
});

app.post("/pokemon/:name", async function(req, res) {
    const { name } = req.params;

    if (CACHE[name] && (JSON.parse(CACHE[name]).date + (SEGUNDOS * 1000)) >= Date.now()) {
        return res.json({ name, data: JSON.parse(CACHE[name]), isCached: true });
    }
    if (ERROR[name]) {
        return res.json({ name, data: JSON.parse(ERROR[name]), isCached: true });
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

        pokemon['date'] = Date.now();
        pokemon['date_string'] = (new Date()).toLocaleString("es-ES");
        pokemon['evolution_chain_data'] = evolutionChain_data;
        pokemon['encounters_data'] = encounters_data;

        responseData = pokemon;

        CACHE[name] = JSON.stringify(pokemon);
    } catch {
        responseData = 'error';
        ERROR[name] = JSON.stringify({ name, error: "Invalid pokemon." });
    }
    res.json({ name, data: responseData, isCached: false });
});

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}...`);
});