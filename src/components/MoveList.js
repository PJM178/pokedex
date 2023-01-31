import { useEffect, useState } from "react";

import { getPokemonMoves } from "../api/utils";

const MoveList = ({ pokemonName }) => {
  const [pokemonMoves, setPokemonMoves] = useState(null);
  const [sort, setSort] = useState(null);

  useEffect(() => {
    const getMoves = async () => {
      const moves = await getPokemonMoves(pokemonName);
      setPokemonMoves(moves);
    }
    getMoves()
  }, [pokemonName])

  if (sort !== null) {
    pokemonMoves.sort((a, b) => {
      if (sort) {
        return b.level - a.level;
      } else {
        return a.level - b.level;
      }
    });
  }

  console.log('not in function' ,pokemonMoves);
  if (pokemonMoves) {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th className="table-level-sort" onClick={() => setSort(!sort ? true : false)}>{!sort ? <>Level&#x25b4;</> : <>Level&#x25be;</>}</th>
          </tr>
        </thead>
        <tbody>
          {pokemonMoves.map(move => (
            <tr key={move.name}>
              <td>{move.name.replace('-', ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</td>
              <td>{move.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
};

export default MoveList;