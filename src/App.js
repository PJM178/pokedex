import { useEffect, useState } from "react";

import { getPokemonDescription, getPokemonList } from "./api/utils";
import Select from "./components/Select";

const App = () => {
  const [pokemonList, setPokemonList] = useState(null);
  const [pokemonFlavorText, setPokemonFlavorText] = useState(null);
  const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);
 
  useEffect(() => {
    const getPokemons = async () => {
      if (!pokemonList) {
        const pokemons = await getPokemonList();
        setPokemonList(pokemons);
      }
      const flavorText = await getPokemonDescription(currentPokemonIndex + 1);
      setPokemonFlavorText(flavorText);
    };
    getPokemons();
  }, [currentPokemonIndex, pokemonList]);

  const handlePrevious = () => {
    setCurrentPokemonIndex(currentPokemonIndex - 1);
  };

  const handleNext = () => {
    setCurrentPokemonIndex(currentPokemonIndex + 1);
  };

  const handleSelect = (e) => {
    setCurrentPokemonIndex(e);
  };

  if (pokemonList) {
    return (
      <div className="background">
        <Select value={pokemonList[currentPokemonIndex].name} onChange={(e) => handleSelect(e.target.options.selectedIndex)}>
          {pokemonList.map(pokemon => (
            <option key={pokemon.url} value={pokemon.name}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</option>
          ))}
        </Select>
        <div className="card">
          <div className="pokemon-image-background"></div>
          <img
            className="pokemon-image"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentPokemonIndex + 1}.png`} 
            alt={pokemonList[currentPokemonIndex].name.charAt(0).toUpperCase() + pokemonList[currentPokemonIndex].name.slice(1)}>
          </img>
          <div className="pokemon-name">{pokemonList[currentPokemonIndex].name.charAt(0).toUpperCase() + pokemonList[currentPokemonIndex].name.slice(1)}</div>
          <div className="pokemon-description">{pokemonFlavorText}</div>
        </div>
        <div className="button-container-main">
          <div className="button-container-previous">
            <button id="button" disabled={currentPokemonIndex === 0 ? true : false} onClick={() => handlePrevious()}>Previous</button>
          </div>
          <div className="button-container-next">
            <button id="button" disabled={currentPokemonIndex === pokemonList.length - 1 ? true : false} onClick={() => handleNext()}>Next</button></div>
          </div>
      </div>
    );
  }
}

export default App;
