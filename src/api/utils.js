export const getPokemonList = async () => {
  const data = await fetch(
    'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150'
  ).then((res) => res.json());

  return data.results;
};

export const getPokemonDescription = async (index) => {
  const pokemon = await (fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${index}`
  ).then(res => res.json()));

  const pokemonEn = pokemon.flavor_text_entries.find(pokemon => pokemon.language.name === 'en' && pokemon.version.name === 'red');

  return pokemonEn.flavor_text.replace(/[\n\f]/g, " ");
};

export const getPokemonImage = (index) => {
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`;

  return image;
}