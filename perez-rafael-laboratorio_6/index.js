((Utils) => {
    const App = {
        htmlElements: {
            pokemonFinderForm: document.querySelector("#pokemon-finder-form"),
            pokemonFinderSearchType: document.querySelector(
                "#pokemon-finder-search-type"
            ),
            pokemonFinderInput: document.querySelector("#pokemon-finder-query"),
            pokemonFinderOutput: document.querySelector("#pokemon-finder-response"),
            resetForm: document.querySelector("#resetForm"),
        },
        init: () => {
            App.htmlElements.pokemonFinderForm.addEventListener(
                "submit",
                App.handlers.pokemonFinderFormOnSubmit
            );

            App.htmlElements.pokemonFinderForm.addEventListener(
                "reset",
                App.handlers.resetForm
            );
        },
        handlers: {
            pokemonFinderFormOnSubmit: async(e) => {
                e.preventDefault();

                const query = App.htmlElements.pokemonFinderInput.value;
                const searchType = App.htmlElements.pokemonFinderSearchType.value;
                console.log({ searchType });
                try {
                    const response = await Utils.getPokemon({
                        query,
                        searchType,
                    });

                    const renderedTemplate = App.templates.render({
                        searchType,
                        response
                    });
                    App.htmlElements.pokemonFinderOutput.innerHTML = renderedTemplate;
                    App.htmlElements.resetForm.innerHTML = App.templates.resetForm();

                } catch (error) {
                    App.htmlElements.pokemonFinderOutput.innerHTML = `<h1 class="error"><span class="far fa-triangle-exclamation"></span> ${error}</h1>`;
                }
            },
            resetForm: () => {
                App.htmlElements.resetForm.innerHTML = '';
                App.htmlElements.pokemonFinderOutput.innerHTML = '';
            }
        },
        templates: {
            resetForm: () => {
                return `<button type="reset">Limpiar</button>`;
            },
            render: ({ searchType, response }) => {
                const renderMap = {
                    ability: App.templates.abilityCard,
                    pokemon: App.templates.pokemonCard,
                };
                return renderMap[searchType] ?
                    renderMap[searchType](response) :
                    App.templates.errorCard();
            },
            errorCard: () => `<h1>There was an error</h1>`,
            pokemonCard: ({ id, name, weight, height, sprites, abilities, species }) => {

                evolutionChain = 'Vacio';

                Utils.getData(species.url).then(function(speciesResponse) {

                    console.log(speciesResponse);

                    Utils.getData(speciesResponse.evolution_chain.url).then(function(evolutionResponse) {
                        console.log(evolutionResponse);
                    });
                }).catch(function(error) {
                    console.log(error);
                });

                console.log(evolutionChain);

                const evolutionChainList = abilities.map(
                    ({ ability, is_hidden }) =>
                    `<li>${ability.name}${
                            is_hidden ? ' <i class="fa-solid fa-baby"></i>' : ''
                        }</li>`
                );

                const abilitiesList = abilities.map(
                    ({ ability, is_hidden }) =>
                    `<li>${ability.name}${
                            is_hidden ? ' <i class="far fa-eye-slash"></i>' : ''
                        }</li>`
                );

                return `<div class="carta">
                <h1>${name} (${id})</h1>
                <div class="info">
                <div class="columna">
                <h3>Sprites</h3>
                <p><img src="${sprites.front_default}" class="sprite"/><img src="${sprites.back_default}" class="sprite"/></p>      
             </div>
                <div class="columna">
                <h3>Weight / Height</h3>
                <p>${weight} / ${height}</p>
</div>
                </div>
                
                <div class="info">
                <div class="columna">
                <h3>Evolution</h3>
                <ul class="listado">${evolutionChainList.join("")}</ul>
                
                </div>
                <div class="columna">
                <h3>Abilities</h3>
                <ul class="listado">${abilitiesList.join("")}</ul>
</div>
                </div>
                </div>`;
            },
            abilityCard: ({ id, name, pokemon }) => {
                const pokemonList = pokemon.map(
                    ({ pokemon, is_hidden }) =>
                    `<li>${pokemon.name}${
                            is_hidden ? ' <i class="far fa-eye-slash"></i>' : ''
                        }</li>`
                );
                return `<div class="carta">
                        <h1>${name}</h1>
                        <h3>Who can learn it?</h3>
                        <ul class="listado">${pokemonList.join("")}</ul>
                        </div>`;
            },
        },
    };
    App.init();
})(document.Utils);