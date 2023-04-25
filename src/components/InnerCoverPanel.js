import { useState } from "react";

import FlavorTextScroll from "./FlavorTextScroll";
import MoveList from "./MoveList";

const InnerCoverPanel = ({ type, pokemonFlavorText, pokemonList, version, currentPokemonIndex }) => {
  const [pokemonFlavor, setPokemonFlavor] = useState(null);
  const [pokemonMoves, setPokemonMoves] = useState(null);
  const [pokemonFlavorContainer, setPokemonFlavorContainer] = useState(null);

  switch (type) {
    case 'flavor':
      return (
        <div ref={setPokemonFlavorContainer} className="pokemon-flavor-container">
          <div ref={setPokemonFlavor} className="pokemon-flavor">{pokemonFlavorText}</div>
          {pokemonFlavorText && <FlavorTextScroll pokemonFlavorContainer={pokemonFlavorContainer} pokemonFlavor={pokemonFlavor} type={type} />}
        </div>
      );
    case 'moves':
      return (
        <div ref={setPokemonFlavorContainer} className="pokemon-flavor-container">
          <MoveList ref={setPokemonMoves} pokemonName={pokemonList[currentPokemonIndex].name} version={version} />
          {pokemonMoves && <FlavorTextScroll pokemonFlavorContainer={pokemonFlavorContainer} pokemonFlavor={pokemonMoves} type={type} />}
        </div>
      );
    case 'stats':
      return (
        <div>stats</div>
      );
    default:
      return (
        <div>null</div>
      );
  }
};

export default InnerCoverPanel;