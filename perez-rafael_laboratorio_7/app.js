const axios = require("axios");

const main = async() => {
    const { data } = await axios("https://pokeapi.co/api/v2/pokemon/ditto");
    console.log(data);
};

main();