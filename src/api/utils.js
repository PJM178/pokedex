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
};

export const getMoveInfo = async (move) => {
  const moveInfo = await fetch(
    `https://pokeapi.co/api/v2/move/${move}`
  ).then(res => res.json());

  return moveInfo;
}

export const getPokemonMoves = async (pokemon) => {
  const moves = await (fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  )).then(res => res.json());

  const filteredMoves = moves.moves.filter(move => move.version_group_details.find(move => move.move_learn_method.name === 'level-up' && move.version_group.name === 'red-blue'));

  const moveList = [];
  // filteredMoves.forEach(element => {
  //   const object = { name: element.move.name, level: element.version_group_details[0].level_learned_at };
  //   moveList.push(object);
  // });

  for await (const element of filteredMoves) {
    const moveInfo = await getMoveInfo(element.move.name);
    const object = { name: element.move.name, level: element.version_group_details[0].level_learned_at, info: moveInfo };
    moveList.push(object);
  }

  return moveList.sort((a, b) => a.level - b.level);
}

