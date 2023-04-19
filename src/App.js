import { useEffect, useState } from "react";

import { getPokemonDescription, getPokemonList, getPokemonImage, getPokemonTypes } from "./api/utils";
import Select from "./components/Select";
import MoveList from "./components/MoveList";
import StatList from "./components/StatList";
import GenList from "./components/GenList";
import GenButtons from "./components/GenButtons";
import { typeColors }  from "./components/MoveList";
import { genList } from "./components/GenList";

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
  const [coverOpening, setCoverOpening] = useState(true);

  useEffect(() => {
    const getPokemons = async () => {
      if (!pokemonList || !version) {
        const pokemons = await getPokemonList(Number(selectedGen.number));
        setPokemonList(pokemons.pokemons);
        setVersion(pokemons.version);
        setCurrentPokemonIndex(0);
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
    setPokemonTypes(null);
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
    setPokemonTypes(null);
    setPokemonFlavorText(null);
    setPokemonImage(null);
    setCurrentPokemonIndex(e);
  };

  if (pokemonList) {
    return (
      <div className="background">
        <div className="pokedex-container">
          <div className="pokedex-body-container">
            <img className="pokedex-body" alt='' src='/assets/pokedex/pokedex-body.svg' />
          </div>
          <div className="pokedex-cover-container">
            <div onClick={() => setCoverOpening(!coverOpening)} className="pokedex-cover" style={{ transform: coverOpening ? 'rotateY(180deg) translate(12%,0)' : 'rotateY(0deg) translate(0,0)'}}>
              <div className="pokedex-cover-inner-container">
                {/* <img className="pokedex-cover-inner" alt="" src='/assets/pokedex/pokedex-cover-inner.svg' /> */}
                <svg xmlns="http://www.w3.org/2000/svg" className="pokedex-cover-inner" viewBox="0 0 300 400">
                  <g id="pokedex-cover-inner-body">
                    <path d="M0,80 L100,80 M100,80 S125 80 150,60 M150,60 S175 40 200,40 L265,40 L265,100 L0,100 L0,80 L100,80 Z" stroke="none" fill="rgba(220,10,45,255)" />
                    <rect y="100" width="265" height="300" ry="10" style={{ fill: 'rgba(220,10,45,255)', strokeWidth: '1', stroke: 'rgb(0,0,0)' }} />
                    <rect y="80" width="265" height="100" style={{ fill: 'rgba(220,10,45,255)' }} />
                    <rect y="300" x="215" width="50" height="100" style={{ fill: 'rgba(220,10,45,255)'}} />
                    <line x1="265" y1="40" x2="265" y2="180" stroke="black" fill="none" strokeWidth="1" />
                    <line x1="265" y1="200" x2="265" y2="400" stroke="black" fill="none" strokeWidth="1" />
                    <line x1="265" y1="400" x2="200" y2="400" stroke="black" fill="none" strokeWidth="1" />
                    <line x1="0" y1="80" x2="0" y2="393" stroke="black" fill="none" strokeWidth="2" />
                    <line x1="7" y1="400" x2="265" y2="400" stroke="black" fill="none" strokeWidth="2" />
                    <path d="M0,80 L100,80 M100,80 S125 80 150,60 M150,60 S175 40 200,40 M200,40 L265,40 M265,40 L265,100" stroke="black" fill="none" strokeWidth="1" />
                  </g>
                  <g id="pokedex-cover-inner-frame">
                    <path d="M10,85 L100,85 M100,85 S125 85 150,65 M150,65 S175 45 200,45 M200,45 L255,45" stroke="black" fill="none" strokeWidth="1" />
                    <path d="M10,85 S5 85 5,90 L5,390 M5,390 S5 395 10,395 L255,395 M255,395 S260 395 260,390 L260,50 M260,50 S260 45 255,45" stroke="black" fill="none" strokeWidth="1" />
                  </g>
                  <g id="pokedex-cover-inner-panel" onClick={() => console.log('test')}>
                    <rect width="220" height="70" y="110" x="22.5" ry="3" fill="rgba(36,36,36,255)" stroke="black" stroke-width="1" />
                  </g>
                  <g id="pokedex-cover-inner-flat-button">
                    <rect width="34" height="4" y="277.5" x="22.5" ry="3" fill="rgba(36,36,36,255)" stroke="black" stroke-width="1" />
                    <rect width="34" height="4" y="277.5" x="60" ry="3" fill="rgba(36,36,36,255)" stroke="black" stroke-width="1" />
                  </g>
                  <g id="pokedex-cover-inner-white-button">
                    <rect width="44" height="35" y="290" x="199" ry="2" fill="rgba(222,222,222,255)" stroke="black" strokeWidth="1" />
                    <rect width="44" height="35" y="290" x="155" ry="2" fill="rgba(222,222,222,255)" stroke="black" strokeWidth="1" />
                  </g>
                  <g id="pokedex-cover-inner-bottom-button">
                    <rect width="90" height="35" y="344" x="22.5" ry="3" fill="rgba(0,46,43,255)" stroke="black" stroke-width="1" />
                    <rect width="90" height="35" y="344" x="152.5" ry="3" fill="rgba(0,46,43,255)" stroke="black" stroke-width="1" />
                  </g>
                  <g id="pokedex-cover-inner-light">
                    <circle cx="35" cy="320" r="12" fill="rgba(200,179,23,255)" stroke="black" stroke-width="1.5" />
                  </g>
                </svg>
                <div className="pokedex-cover-inner-button-container">
                  {genList.map((gen, i) => (
                    <GenButtons key={i} gen={gen} />
                  ))}
                </div>
              </div>
              <div className="pokedex-cover-outer-container">
                <img className="pokedex-cover-outer" alt="" src='/assets/pokedex/pokedex-cover-outer.svg' /> 
              </div>
            </div>
          </div>
        </div>
        {/* <img style={{ filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))' }} alt="none" src='/assets/pokedex/circle.svg' /> */}
        {/* <GenList setSelectedGen={setSelectedGen} setVersion={setVersion} />
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
        </div> */}
      </div>
    );
  }
}

export default App;
