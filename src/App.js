import { useEffect, useState, useRef } from "react";

import { getPokemonDescription, getPokemonList, getPokemonImage, getPokemonTypes } from "./api/utils";
import Select from "./components/Select";
import MoveList from "./components/MoveList";
import StatList from "./components/StatList";
import GenList from "./components/GenList";
import InnerCoverPanel from "./components/InnerCoverPanel";
import GenButtons from "./components/GenButtons";
// import FlavorTextScroll from "./components/FlavorTextScroll";
import { typeColors }  from "./components/MoveList";
import { genList } from "./components/GenList";

const App = () => {
  const pokemonNameContainer = useRef(null);
  const pokemonName = useRef(null);
  // const pokemonMoves = useRef(null);
  const [pokemonList, setPokemonList] = useState(null);
  const [pokemonFlavorText, setPokemonFlavorText] = useState(null);
  const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);
  const [pokemonTypes, setPokemonTypes] = useState(null);
  const [pokemonImage, setPokemonImage] = useState(null);
  const [selectedGen, setSelectedGen] = useState({symbol: 'I', number: 1, color: '#ACD36C'});
  const [version, setVersion] = useState(null);
  // const [showMoves, setShowMoves] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [coverOpening, setCoverOpening] = useState(true);
  const timer = useRef();
  const [openSelectMenu, setOpenSelectMenu] = useState(false);
  const [colorTest, setColorTest] = useState([]);
  const [panelType, setPanelType] = useState('flavor');
  const panelTypes = ['flavor', 'moves', 'stats']

  const handlePrevious = () => {
    setOpenSelectMenu(false);
    setPanelType('flavor')
    if (currentPokemonIndex !== 0) {
      setPokemonTypes(null);
      setPokemonFlavorText(null);
      setPokemonImage(null);
      setCurrentPokemonIndex(currentPokemonIndex - 1);
    } else {
      setPokemonTypes(null);
      setPokemonFlavorText(null);
      setPokemonImage(null);
      setCurrentPokemonIndex(pokemonList.length - 1);
    }
  };

  const handleNext = () => {
    setOpenSelectMenu(false);
    setPanelType('flavor')
    if (currentPokemonIndex !== pokemonList.length - 1) {
      setPokemonTypes(null)
      setPokemonFlavorText(null);
      setPokemonImage(null);
      setCurrentPokemonIndex(currentPokemonIndex + 1);
    } else {
      setPokemonTypes(null)
      setPokemonFlavorText(null);
      setPokemonImage(null);
      setCurrentPokemonIndex(0);
    }
  };

  const handleSelect = (e) => {
    setOpenSelectMenu(false);
    const image = getPokemonImage(pokemonList[currentPokemonIndex].index);
    setPokemonImage(image);
    if (currentPokemonIndex !== e) {
      setPanelType('flavor')
      setPokemonTypes(null);
      setPokemonFlavorText(null);
      setPokemonImage(null);
      setCurrentPokemonIndex(e);
    }
  };

  const handleSelectMenu = () => {
    setOpenSelectMenu(true); 
    setPokemonImage(null);
    timer.current = setTimeout(() => {
      scrollToActive();
    }, 1);
    return () => clearTimeout(timer.current);
  };

  // For pressing dpad up button to scroll the pokemon list 
  // const handleMenuDpadUp = () => {
  //   scrollToActive()
  //   if (currentPokemonIndex !== 0) {
  //     setCurrentPokemonIndex(currentPokemonIndex - 1);
  //   } else {
  //     setCurrentPokemonIndex(pokemonList.length - 1);
  //   }
  // };

  const handlePanelType = (direction) => {
    let currentIndex = panelTypes.indexOf(panelType);
    if (direction === 'forwards') {
      const nextIndex = ++currentIndex % panelTypes.length;
      setPanelType(panelTypes[nextIndex]);
    }
    if (direction === 'backwards') {
      if (currentIndex > 0) {
        const nextIndex = --currentIndex;
        setPanelType(panelTypes[nextIndex]);
      } else {
        const nextIndex = panelTypes.length - 1;
        setPanelType(panelTypes[nextIndex]);
      }
    } 
  };

  const scrollToActive = () => {
    const activeChoice = document.querySelector('.pokemon-image-select-active-choice')
    activeChoice && activeChoice.scrollIntoView({ behavior: 'auto', block: 'center' })
  };

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
    // scale the pokemon name to fit the bottom screen - using React useRefs instead of querySelector
    if (pokemonName.current) {
      pokemonName.current.style.fontSize = "100%";
      if (pokemonName.current.clientWidth > pokemonNameContainer.current.clientWidth) {
        pokemonName.current.style.fontSize = pokemonNameContainer.current.clientWidth/pokemonName.current.clientWidth*100 + "%";
      } else if (pokemonName.current.clientHeight > pokemonNameContainer.current.clientHeight) {
        pokemonName.current.style.fontSize = pokemonNameContainer.current.clientHeight/pokemonName.current.clientHeight*100 + "%"
      } else {
        pokemonName.current.style.fontSize = "100%";
      }
    }
  }, [currentPokemonIndex, pokemonList, selectedGen, version]);

  useEffect(() => {
    setColorTest([]);
    if (pokemonTypes) {
      pokemonTypes.map((type, i) => (
        setColorTest(colorTest => [...colorTest, typeColors[Object.keys(typeColors).find(types => types === type)]])
      ))
    }
  }, [pokemonTypes])

  if (pokemonList) {
    return (
      <div className="background">
        <div className="pokedex-container" style={{ transform: coverOpening ? 'translate(-170px, 0)' : 'translate(0,0)'}}>
          <div className="pokedex-body-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400">
              <g id="pokedex-body-main">
                <rect width='300' height='400' ry="10" style={{ fill: 'rgba(220,10,45,255)', strokeWidth: '2', stroke: 'rgb(0,0,0)' }} />
                <circle cx="40" cy="40" r="33" stroke="black" strokeWidth="1" fill="rgba(221,213,220,255)" />
                <circle cx="40" cy="40" r="30" stroke="black" strokeWidth="1" fill="blue" />
                <circle cx="30" cy="30" r="10" fill="white" fillOpacity="0.9" />
                <circle cx="23" cy="45" r="5" fill="white" fillOpacity="0.9" />
                <circle cx="90" cy="15" r="8" stroke="black" strokeWidth="1.5" fill="red" />
                <circle cx="115" cy="15" r="8" stroke="black" strokeWidth="1.5" fill="orange" />
                <circle cx="140" cy="15" r="8" stroke="black" strokeWidth="1.5" fill="green" />
                <path d="M0,80 L100,80 M100,80 S125 80 150,60 M150,60 S175 40 200,40 M200,40 L300,40" stroke="black" fill="none" strokeWidth="1" />
              </g>
              <g id="pokedex-body-inner-frame">
                <path d="M10,85 L100,85 M100,85 S125 85 150,65 M150,65 S175 45 200,45 M200,45 L255,45" stroke="black" fill="none" strokeWidth="1" />
                <path d="M10,85 S5 85 5,90 L5,390 M5,390 S5 395 10,395 L255,395 M255,395 S260 395 260,390 L260,50 M260,50 S260 45 255,45" stroke="black" fill="none" strokeWidth="1" />
              </g>
              <g id="pokedex-body-hinge">
                <line x1="265" y1="40" x2="265" y2="400" stroke="black" strokeWidth="1" />
                <line x1="265" y1="80" x2="300" y2="80" stroke="black" strokeWidth="1" />
                <line x1="265" y1="77" x2="300" y2="77" stroke="black" strokeWidth="1" />
                <line x1="265" y1="360" x2="300" y2="360" stroke="black" strokeWidth="1" />
                <line x1="265" y1="363" x2="300" y2="363" stroke="black" strokeWidth="1" />
              </g>
              <g id="pokedex-body-inner-container" transform="translate(0,10)">
                <g id="pokedex-body-inner-panel" transform="translate(-7.5,0)">
                  <rect width="200" height="100" y="200" x="30" ry="30" fill="rgba(222,222,222,255)" stroke="black" strokeWidth="1" />
                  <rect width="220" height="150" y="90" x="30" ry="3" fill="rgba(222,222,222,255)" stroke="black" strokeWidth="1" />
                  <rect width="220" height="150" y="95" x="30" ry="3" fill="rgba(222,222,222,255)" />
                  <rect width="190" height="150" y="150" x="60" ry="3" fill="rgba(222,222,222,255)" stroke="black" strokeWidth="1" />
                  <rect width="190" height="150" y="150" x="55" ry="3" fill="rgba(222,222,222,255)" />
                  <rect width="200" height="50" y="110" x="50" fill="rgba(222,222,222,255)" />
                  <rect width="170" height="140" y="115" x="55" ry="3" fill="rgba(229,246,255,255)" stroke="black" strokeWidth="1" />
                  <line x1="30" y1="95" x2="30" y2="270" stroke="black" fill="none" strokeWidth="1" />
                  <line x1="250" y1="95" x2="250" y2="270" stroke="black" fill="none" strokeWidth="1" />
                  <line x1="245" y1="300" x2="55" y2="300" stroke="black" fill="none" strokeWidth="1" />
                  <circle cx="65" cy="277.5" r="8" stroke="black" strokeWidth="1.5" fill="red" />
                  <circle cx="125" cy="102.5" r="3" stroke="black" strokeWidth="1.5" fill="red" />
                  <circle cx="155" cy="102.5" r="3" stroke="black" strokeWidth="1.5" fill="red" />
                  <rect width="30" height="2" y="265" x="195" ry="1" />
                  <rect width="30" height="2" y="273.33" x="195" ry="1" />
                  <rect width="30" height="2" y="281.66" x="195" ry="1" />
                  <rect width="30" height="2" y="290" x="195" ry="1" />
                </g>
                <g id="pokedex-body-dpad" transform="translate(-7.5,-5)">
                  <rect id="pokedex-body-dpad-up" onClick={() => handleSelectMenu()} width="20" height="20" y="317.5" x="200" ry="2" fill="rgba(2,49,41,255)" stroke="black" strokeWidth="1" />
                  <rect id="pokedex-body-dpad-down" onClick={() => handleSelectMenu()} width="20" height="20" y="357.5" x="200" ry="2" fill="rgba(2,49,41,255)" stroke="black" strokeWidth="1" />
                  <rect id="pokedex-body-dpad-left" onClick={() => handlePrevious()} width="20" height="20" y="337.5" x="180" ry="2" fill="rgba(2,49,41,255)" stroke="black" strokeWidth="1" />
                  <rect id="pokedex-body-dpad-right" onClick={() => handleNext()} width="20" height="20" y="337.5" x="220" ry="2" fill="rgba(2,49,41,255)" stroke="black" strokeWidth="1" />
                  <rect width="20" height="22" y="336.5" x="200" ry="2" fill="rgba(2,49,41,255)" />
                  <rect width="22" height="20" y="336.5" x="199" ry="2" fill="rgba(2,49,41,255)" />
                  <circle cx="210" cy="347.5" r="3" fill="rgba(2,49,41,255)" stroke="black" />
                  <line x1="200" y1="320" x2="200" y2="337.5" stroke="black" fill="none" strokeWidth="1" />
                  <line x1="220" y1="320" x2="220" y2="337.5" stroke="black" fill="none" strokeWidth="1" />
                  <line x1="200" y1="357.5" x2="200" y2="367.5" stroke="black" fill="none" strokeWidth="1" />
                  <line x1="220" y1="357.5" x2="220" y2="367.5" stroke="black" fill="none" strokeWidth="1" />
                </g>
                <g id="pokedex-body-bottom-screen">
                  <rect width="85" height="40" y="327.5" x="55" ry="2" fill="rgba(81,173,96,255)" stroke="black" strokeWidth="1" />
                </g>
                <g id="pokedex-body-bottom-buttons">
                  <rect width="34" height="4" y="312.5" x="55" ry="3" fill="rgba(230,12,54,255)" stroke="black" strokeWidth="1" />
                  <rect width="34" height="4" y="312.5" x="105" ry="3" fill="rgba(9,98,139,255)" stroke="black" strokeWidth="1" />
                </g>
                <g id="pokedex-body-bottom-circle">
                  <circle cx="30" cy="327.5" r="14" fill="rgba(2,49,41,255)" stroke="black" strokeWidth="1" />
                </g>
              </g>
            </svg>
            <div className="pokemon-image-background">
              {pokemonImage ? null : !openSelectMenu && <div className="loader"></div>}
              {pokemonImage
                ? <img
                    className="pokemon-image"
                    // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentPokemonIndex + 1}.png`}
                    src={pokemonImage} 
                    alt="">
                  </img>
                : openSelectMenu && <ul className="pokemon-image-select-ul">
                    {pokemonList.map((pokemon, i) => 
                      <li key={pokemon.url} className={currentPokemonIndex === i ? "pokemon-image-select-active-choice" : "pokemon-image-select-li"} onClick={() => handleSelect(i)}>
                        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                      </li>  
                    )}
                  </ul>
              } 
            </div>
            <div className="pokemon-name-container" ref={pokemonNameContainer}><div className="pokemon-name" ref={pokemonName}>{pokemonList[currentPokemonIndex].name.charAt(0).toUpperCase() + pokemonList[currentPokemonIndex].name.slice(1)}</div></div>
          </div>
          <div className="pokedex-cover-container" onClick={() => setCoverOpening(coverOpening)} style={{ transform: coverOpening ? 'rotateY(180deg) translate(12%,0)' : 'rotateY(0deg) translate(0,0)'}}>
            <div className="pokedex-cover">
              <div className="pokedex-cover-inner-container">
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
                    <rect width="220" height="70" y="110" x="22.5" ry="3" fill="rgba(229,246,255,255)" stroke="black" strokeWidth="1" />
                  </g>
                  <g id="pokedex-cover-inner-flat-button">
                    <rect width="34" height="4" y="277.5" x="22.5" ry="3" fill="rgba(36,36,36,255)" stroke="black" strokeWidth="1" />
                    <rect width="34" height="4" y="277.5" x="60" ry="3" fill="rgba(36,36,36,255)" stroke="black" strokeWidth="1" />
                  </g>
                  <g id="pokedex-cover-inner-white-button" style={{ filter: "drop-shadow( 0px 1px 1px rgba(0, 0, 0, 0.8))" }}>
                    <rect id="pokedex-white-button-left" onClick={() => handlePanelType('backwards')} width="44" height="35" y="290" x="199" ry="2" fill="rgba(222,222,222,255)" stroke="black" strokeWidth="1" />
                    <rect id="pokedex-white-button-right" onClick={() => handlePanelType('forwards')} width="44" height="35" y="290" x="155" ry="2" fill="rgba(222,222,222,255)" stroke="black" strokeWidth="1" />
                  </g>
                  <g id="pokedex-cover-inner-bottom-screens">
                    <rect width="100" height="35" y="344" x="22.5" ry="3" fill={colorTest[1] !== undefined ? colorTest[1] : "rgba(0,46,43,255)"} stroke="black" strokeWidth="1" />
                    <rect width="100" height="35" y="344" x="142.5" ry="3" fill={colorTest[0] !== undefined ? colorTest[0] : "rgba(0,46,43,255)"} stroke="black" strokeWidth="1" />
                  </g>
                  <g id="pokedex-cover-inner-light">
                    <circle cx="35" cy="320" r="12" fill="rgba(200,179,23,255)" stroke="black" strokeWidth="1.5" />
                  </g>
                </svg>
                <div className="pokedex-cover-inner-button-container">
                  {genList.map((gen, i) => (
                    <GenButtons key={i} gen={gen} />
                  ))}
                </div>
                {pokemonTypes 
                  ? pokemonTypes.map((type, i) => {
                      return <div key={type} className={`pokemon-type-${i}`}>{type.charAt(0).toUpperCase() + type.slice(1)}</div>
                    })
                  : null
                }
                {/* {pokemonFlavor &&
                  <div ref={pokemonFlavorContainer} className="pokemon-flavor-container">
                    <div ref={pokemonFlavor} className="pokemon-flavor">{pokemonFlavorText}</div>
                    {pokemonFlavor.current && <FlavorTextScroll pokemonFlavorContainer={pokemonFlavorContainer} pokemonFlavor={pokemonFlavor} />}
                    <MoveList ref={pokemonMoves} pokemonName={pokemonList[currentPokemonIndex].name} version={version} />
                    {pokemonMoves.current && <FlavorTextScroll pokemonFlavorContainer={pokemonFlavorContainer} pokemonFlavor={pokemonMoves} />}
                  </div>
                } */}
                <InnerCoverPanel
                  type={panelType} 
                  pokemonFlavorText={pokemonFlavorText} 
                  pokemonList={pokemonList}
                  version={version}
                  currentPokemonIndex={currentPokemonIndex}
                />
              </div>
              <div className="pokedex-cover-outer-container">
                <img className="pokedex-cover-outer" alt="" src='/assets/pokedex/pokedex-cover-outer.svg' /> 
              </div>
            </div>
          </div>
        </div>
        {/* Old pokedex code - maybe delete or leave here for prosperity
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
        </div> */}
      </div>
    );
  }
}

export default App;
