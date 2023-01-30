import { useEffect, useState } from "react";

import { getPokemonDescription, getPokemonList, getPokemonImage } from "./api/utils";
import Select from "./components/Select";
import MoveList from "./components/MoveList";

const App = () => {
  const [pokemonList, setPokemonList] = useState(null);
  const [pokemonFlavorText, setPokemonFlavorText] = useState(null);
  const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);
  const [pokemonImage, setPokemonImage] = useState(null);
  const [showMoves, setShowMoves] = useState(false);
 
  useEffect(() => {
    const getPokemons = async () => {
      if (!pokemonList) {
        const pokemons = await getPokemonList();
        setPokemonList(pokemons);
      }
      const flavorText = await getPokemonDescription(currentPokemonIndex + 1);
      setPokemonFlavorText(flavorText);
      const image = getPokemonImage(currentPokemonIndex);
      setPokemonImage(image);
    };
    getPokemons();
  }, [currentPokemonIndex, pokemonList]);

  const handlePrevious = () => {
    setPokemonImage(null);
    setCurrentPokemonIndex(currentPokemonIndex - 1);
  };

  const handleNext = () => {
    setPokemonFlavorText(null);
    setPokemonImage(null);
    setCurrentPokemonIndex(currentPokemonIndex + 1);
  };

  const handleSelect = (e) => {
    setPokemonImage(null);
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
          <div className="pokemon-image-background">
            {pokemonImage ? null : <div className="loader"></div>} 
          </div>
          {pokemonImage 
            ? <img
                className="pokemon-image"
                // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentPokemonIndex + 1}.png`}
                src={pokemonImage} 
                alt="">
              </img>
            : <div style={{ width: '200px', height: '200px' }}></div>
          } 
          <div className="pokemon-name">{pokemonList[currentPokemonIndex].name.charAt(0).toUpperCase() + pokemonList[currentPokemonIndex].name.slice(1)}</div>
          {pokemonFlavorText ?  <div className="pokemon-description">{pokemonFlavorText}</div> : <div className="desc-placeholder"><div className="loader"></div></div>}
          <div className="show-moves" onClick={() => setShowMoves(showMoves ? false : true)}>
            {showMoves 
              ? <><div style={{ marginLeft: '5px' }}>Show moves</div><div style={{ marginRight: '5px' }}>∨</div></>  
              : <><div style={{ marginLeft: '5px' }}>Show moves</div><div style={{ marginRight: '5px' }}>∧</div></> 
            }
          </div>
          {showMoves ? <MoveList pokemonName={pokemonList[currentPokemonIndex].name} /> : null}
        </div>
        <div className="button-container-main">
            <div className="button-container-previous">
              <button id="button" disabled={currentPokemonIndex === 0 ? true : false} onClick={() => handlePrevious()}>Previous</button>
            </div>
            <div className="button-container-next">
              <button id="button" disabled={currentPokemonIndex === pokemonList.length - 1 ? true : false} onClick={() => handleNext()}>Next</button>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
