import { useState } from "react";

import FlavorTextScroll from "./FlavorTextScroll";
import FlavorPanelContainer from "./FlavorPanelContainer";
import MoveList from "./MoveList";
import StatList from "./StatList";

const InnerCoverPanel = ({ type, pokemonFlavorText, pokemonList, version, currentPokemonIndex }) => {
  const [pokemonFlavor, setPokemonFlavor] = useState(null);
  const [pokemonMoves, setPokemonMoves] = useState(null);
  const [pokemonStats, setPokemonStats] = useState(null);
  const [pokemonFlavorContainer, setPokemonFlavorContainer] = useState(null);
  const [stopScrolling, setStopScrolling] = useState(false)

  switch (type) {
    case 'flavor':
      return (
        <FlavorPanelContainer ref={setPokemonFlavorContainer} setStopScrolling={setStopScrolling} >
          <div ref={setPokemonFlavor} className="pokemon-flavor">{pokemonFlavorText}</div>
          {pokemonFlavorText && <FlavorTextScroll stopScrolling={stopScrolling} pokemonFlavorContainer={pokemonFlavorContainer} pokemonFlavor={pokemonFlavor} type={type} />}
        </FlavorPanelContainer>
      );
    case 'moves':
      return (
        <FlavorPanelContainer ref={setPokemonFlavorContainer} setStopScrolling={setStopScrolling} >
          <MoveList ref={setPokemonMoves} pokemonName={pokemonList[currentPokemonIndex].name} version={version} />
          {pokemonMoves && <FlavorTextScroll stopScrolling={stopScrolling} pokemonFlavorContainer={pokemonFlavorContainer} pokemonFlavor={pokemonMoves} type={type} />}
        </FlavorPanelContainer>
      );
    case 'stats':
      return (
        <FlavorPanelContainer ref={setPokemonFlavorContainer} setStopScrolling={setStopScrolling} >
          <StatList ref={setPokemonStats} pokemonName={pokemonList[currentPokemonIndex].name} />  
          {pokemonStats && <FlavorTextScroll stopScrolling={stopScrolling} pokemonFlavorContainer={pokemonFlavorContainer} pokemonFlavor={pokemonStats} type={type} />}
        </FlavorPanelContainer>
      );
    default:
      return (
        null
      );
  }
};

export default InnerCoverPanel;