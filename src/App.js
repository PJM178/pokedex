import { useEffect, useState } from "react";

import { getPokemonDescription, getPokemonList, getPokemonImage, getPokemonTypes } from "./api/utils";
import Select from "./components/Select";
import MoveList from "./components/MoveList";
import StatList from "./components/StatList";
import GenList from "./components/GenList";
import { typeColors }  from "./components/MoveList";

const App = () => {
  const [pokemonList, setPokemonList] = useState(null);
  const [pokemonFlavorText, setPokemonFlavorText] = useState(null);
  const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);
  const [pokemonTypes, setPokemonTypes] = useState(null);
  const [pokemonImage, setPokemonImage] = useState(null);
  const [selectedGen, setSelectedGen] = useState({symbol: 'I', number: 1, color: '#ACD36C'});
  const [version, setVersion] = useState(null);
  const [showMoves, setShowMoves] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [coverOpening, setCoverOpening] = useState(false);

  useEffect(() => {
    const getPokemons = async () => {
      if (!pokemonList || !version) {
        const pokemons = await getPokemonList(Number(selectedGen.number));
        setPokemonList(pokemons.pokemons);
        setVersion(pokemons.version);
        setCurrentPokemonIndex(0)
      } else {
        const flavorText = await getPokemonDescription(pokemonList[currentPokemonIndex].index, version.split('-')[0]);
        setPokemonFlavorText(flavorText);
        const types = await getPokemonTypes(pokemonList[currentPokemonIndex].name)
        setPokemonTypes(types);
        const image = getPokemonImage(pokemonList[currentPokemonIndex].index);
        setPokemonImage(image);
      }
    };
    getPokemons();
  }, [currentPokemonIndex, pokemonList, selectedGen, version]);

  const handlePrevious = () => {
    setPokemonTypes(null)
    setPokemonFlavorText(null);
    setPokemonImage(null);
    setCurrentPokemonIndex(currentPokemonIndex - 1);
  };

  const handleNext = () => {
    setPokemonTypes(null)
    setPokemonFlavorText(null);
    setPokemonImage(null);
    setCurrentPokemonIndex(currentPokemonIndex + 1);
  };

  const handleSelect = (e) => {
    setPokemonTypes(null)
    setPokemonFlavorText(null);
    setPokemonImage(null);
    setCurrentPokemonIndex(e);
  };

  if (pokemonList) {
    return (
      <div className="background">
        <div onClick={() => setCoverOpening(!coverOpening)} className="pokedex-container">
          <img alt="none" style={{ transform: coverOpening ? 'rotateY(180deg)' : 'rotateY(0deg)'}} src='/assets/pokedex/pokedex-cover.svg' id="pokedex-cover" /> 
        </div>
        <img style={{ position: 'absolute', width: '300px', filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))' }} alt='circle' src='/assets/pokedex/pokedex-body.svg' />
        {/* <img style={{ filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))' }} alt="none" src='/assets/pokedex/circle.svg' /> */}
        <GenList setSelectedGen={setSelectedGen} setVersion={setVersion} />
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
          {pokemonTypes ? <div className="pokemon-types">{pokemonTypes.map(type => <div key={type} className="pokemon-type" style={{ backgroundColor: typeColors[Object.keys(typeColors).find(types => types === type)] }}>{type.charAt(0).toUpperCase() + type.slice(1)}</div>)}</div> : <div className="pokemon-types"><div className="pokemon-type">&nbsp;</div></div>}
          {pokemonFlavorText ?  <div className="pokemon-description">{pokemonFlavorText}</div> : <div className="desc-placeholder"><div className="loader"></div></div>}
          <div className="show-moves" onClick={() => setShowMoves(showMoves ? false : true)}>
            {showMoves 
              ? <><div style={{ marginLeft: '5px' }}>Show moves</div><div style={{ marginRight: '5px' }}>∧</div></>  
              : <><div style={{ marginLeft: '5px' }}>Show moves</div><div style={{ marginRight: '5px' }}>∨</div></> 
            }
          </div>
          {showMoves ? <MoveList pokemonName={pokemonList[currentPokemonIndex].name} version={version} /> : null}
          <div className="show-moves" onClick={() => setShowStats(showStats ? false : true)}>
            {showStats 
              ? <><div style={{ marginLeft: '5px' }}>Show stats</div><div style={{ marginRight: '5px' }}>∧</div></>  
              : <><div style={{ marginLeft: '5px' }}>Show stats</div><div style={{ marginRight: '5px' }}>∨</div></> 
            }
          </div>
          {showStats ? <StatList pokemonName={pokemonList[currentPokemonIndex].name} /> : null}  
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
