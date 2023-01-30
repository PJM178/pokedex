import { useEffect, useState } from "react";

import { getPokemonMoves } from "../api/utils";

const MoveList = ({ pokemonName }) => {
  const [pokemonMoves, setPokemonMoves] = useState(null);

  useEffect(() => {
    const getMoves = async () => {
      const moves = await getPokemonMoves(pokemonName);
      setPokemonMoves(moves);
    }
    getMoves()
  }, [pokemonName])

  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Level</th>
      </tr>
      {pokemonMoves.map(move => (
        <tr>
          <td key={move.move.name}>{move.move.name}</td>
          <td key={move.move.name}>{move.version_group_details[0].level_learned_at}</td>
        </tr>
      ))}
    </table>
  )
};

export default MoveList;