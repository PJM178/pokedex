import { useEffect, useState } from "react";

import { getPokemonMoves } from "../api/utils";

const typeColors = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};

const MoveList = ({ pokemonName }) => {
  const [pokemonMoves, setPokemonMoves] = useState(null);
  const [sort, setSort] = useState(null);

  useEffect(() => {
    setPokemonMoves(null)
    const getMoves = async () => {
      const moves = await getPokemonMoves(pokemonName);
      setPokemonMoves(moves);
    }
    getMoves()
  }, [pokemonName])

  if (sort !== null && pokemonMoves) {
    pokemonMoves.sort((a, b) => {
      if (sort) {
        return b.level - a.level;
      } else {
        return a.level - b.level;
      }
    });
  }
  
  if (!pokemonMoves) {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th className="table-level-sort" onClick={() => setSort(!sort ? true : false)}>{!sort ? <>Level&#x25b4;</> : <>Level&#x25be;</>}</th>
            </tr>
          </thead>
        </table>
        <div className="loader" style={{ marginTop: '1rem' }}></div>
      </>
    );
  }

  if (pokemonMoves) {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th><div className="table-div-level" onClick={() => setSort(!sort ? true : false)}>{!sort ? <>Level&#x25b4;</> : <>Level&#x25be;</>}</div></th>
          </tr>
        </thead>
        <tbody>
          {pokemonMoves.map(move => (
            <tr key={move.name}>
              <td>{move.name.replace('-', ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</td>
              <td><div className="table-div" style={{ backgroundColor: typeColors[Object.keys(typeColors).find(type => type === move.info.type.name)] }}>{move.info.type.name.charAt(0).toUpperCase() + move.info.type.name.slice(1)}</div></td>
              <td>{move.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
};

export default MoveList;