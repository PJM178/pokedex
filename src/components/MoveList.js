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

  if (pokemonMoves) {
    return (
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Level</th>
          </tr>
          {pokemonMoves.map(move => (
            <tr key={move.move.name}>
              <td>{move.move.name.replace('-', ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</td>
              <td>{move.version_group_details[0].level_learned_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
};

export default MoveList;