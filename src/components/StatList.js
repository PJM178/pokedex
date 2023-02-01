import { useEffect, useState } from "react";
import { getPokemonStats } from "../api/utils";

const statColors = {
  hp: '#FF0000',
  attack: '#F08030',
  defense: '#F8D030',
  'special-attack': '#6890F0',
  'special-defense': '#78C850',
  speed: '#F85888',
};

const StatList = ({ pokemonName }) => {
  const [pokemonStats, setPokemonStats] = useState(null);

  useEffect(() => {
    setPokemonStats(null);
    const getStats = async () => {
      const stats = await getPokemonStats(pokemonName);
      setPokemonStats(stats);
    }
    getStats();
  }, [pokemonName])

  if (!pokemonStats) {
    return (
      <>
      <table>
         <thead>
           <tr>
             <th>Stat</th>
           </tr>
         </thead>
       </table>
       <div className="loader" style={{ marginTop: '1rem' }}></div>
     </>
    );
  }

  if (pokemonStats) {
    return (
      <table>
        <thead>
          <tr>
            <th colSpan={3} style={{ textAlign: 'center', width: 'auto' }}>Stat</th>
          </tr>
        </thead>
        <tbody>
          {pokemonStats.map(stat => (
            <tr key={stat.name}>
              <td style={{ textAlign: 'left', width: '1%', whiteSpace: 'nowrap' }}>{stat.name.replace('-', ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}:</td>
              <td style={{ textAlign: 'left', width: '1%' }}>{stat.baseStat}</td>
              <td><div style={{ backgroundColor: statColors[Object.keys(statColors).find(color => color === stat.name)] + '50'}}><div style={{ backgroundColor: statColors[Object.keys(statColors).find(color => color === stat.name)], width: `calc(100% * ${stat.baseStat}/255)` }}>&nbsp;</div></div></td>
            </tr>
          ))}
          
        </tbody>
      </table>
    );
  }
};

export default StatList;