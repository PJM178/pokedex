import { useEffect, useState, forwardRef } from "react";
import { getPokemonStats } from "../api/utils";

const statColors = {
  hp: '#FF0000',
  attack: '#F08030',
  defense: '#F8D030',
  'Sp. Atk': '#6890F0',
  'Sp. Def': '#78C850',
  speed: '#F85888',
};

const styleSheetBefore = (name) => {
  const style = {
    width: 0,
    backgroundColor: statColors[Object.keys(statColors).find(color => color === name)],
  };

  return style;
};

const styleSheetAfter = (name, width) => {
  const style = {
    width: `calc(100% * ${width}/255)`,
    backgroundColor: statColors[Object.keys(statColors).find(color => color === name)],
    transition: 'width 1s',
    maxWidth: '100%'
  };

  return style;
};

const StatBar = (props) => {
  const [value, setValue] = useState(false)
  const styleBefore = styleSheetBefore(props.name)
  const styleAfter = styleSheetAfter(props.name, props.width)

  useEffect(() => {
    setTimeout(() => {
      setValue(true)
    }, 10)
  }, [])

  return (
    <div style={ !value ? styleBefore : styleAfter }>&nbsp;</div>
  );
};

const StatList = forwardRef(({ pokemonName }, ref) => {
  const [pokemonStats, setPokemonStats] = useState(null);

  useEffect(() => {
    setPokemonStats(null);
    const getStats = async () => {
      const stats = await getPokemonStats(pokemonName);
      stats[3].name = 'Sp. Atk'
      stats[4].name = 'Sp. Def'
      setPokemonStats(stats);
    }
    getStats();
  }, [pokemonName])

  if (pokemonStats) {
    return (
      <div ref={ref} className="pokemon-stats-container">
        <table>
          <tbody>
            {pokemonStats.map(stat => (
              <tr key={stat.name}>
                <td style={{ textAlign: 'left', width: '1%', whiteSpace: 'nowrap' }}>{stat.name.replace('-', ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}:</td>
                <td style={{ textAlign: 'left', width: '15%' }}><div style={{ width: 'fit-content' }}>{stat.baseStat}</div></td>
                <td><div style={{ backgroundColor: statColors[Object.keys(statColors).find(color => color === stat.name)] + '50'}}><StatBar name={stat.name} width={stat.baseStat} /></div></td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    );
  }
});

export default StatList;