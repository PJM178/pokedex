export const getPokemonList = async (gen) => {
  const data = await fetch(
    `https://pokeapi.co/api/v2/generation/${gen}`
  ).then((res) => res.json());

  const pokemons = [];
  data.pokemon_species.forEach(pokemon => pokemons.push({ name: pokemon.name, index: pokemon.url.split('/')[6], url: pokemon.url }))
  console.log(pokemons);
  return {version: data.version_groups[0].name, pokemons: pokemons.sort((a, b) => a.index - b.index)};
};

export const getPokemonDescription = async (index, version) => {
  try {
    const pokemon = await (fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${index}`
    ).then(res => res.json()));
  
    const pokemonEn = pokemon.flavor_text_entries.find(pokemon => pokemon.language.name === 'en' && pokemon.version.name === version);
  
    return pokemonEn.flavor_text.replace(/[\n\f]/g, " ");
  } catch(e) {
    const pokemonEn = [];
    console.log('Error happened', e)
    return pokemonEn;
  }
};

export const getPokemonImage = (index) => {
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`;

  return image;
};

export const getPokemonTypes = async (pokemon) => {
  try {
    const pokemonInfo = await (fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    )).then(res => res.json());

    const types = [];
    pokemonInfo.types.forEach(type => types.push(type.type.name));
  
    return types;
  } catch (e) {
    const types = [];
    console.log('Error happened', e);
    return types;
  }
};

export const getMoveInfo = async (move) => {
  const moveInfo = await fetch(
    `https://pokeapi.co/api/v2/move/${move}`
  ).then(res => res.json());

  return moveInfo;
};

export const getPokemonMoves = async (pokemon, version) => {
  try {
    const moves = await (fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    )).then(res => res.json());
  
    const filteredMoves = moves.moves.filter(move => move.version_group_details.find(move => move.move_learn_method.name === 'level-up' && move.version_group.name === version));
  
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
  } catch (e) {
    const moveList = [];
    console.log('Error happened', e);
    return moveList;
  }
};

export const getPokemonStats = async (pokemon) => {
  try {
    const pokemonInfo = await (fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    )).then(res => res.json());
  
    const baseStats = [];
  
    pokemonInfo.stats.forEach(stat => baseStats.push({ name: stat.stat.name, baseStat: stat.base_stat }));
    baseStats.push({ name: 'total', baseStat: baseStats.reduce((a, b) => a + b.baseStat, 0)});
  
    return baseStats;
  } catch (e) {
    console.log('Error happened', e)
    const baseStats = [];
    return baseStats;
  }
};