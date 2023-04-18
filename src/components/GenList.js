import { useState } from "react";

export const genList = [
  {symbol: 'I', number: 1, color: '#ACD36C'},
  {symbol: 'II', number: 2, color: '#DCD677'},
  {symbol: 'III', number: 3, color: '#9CD7C8'},
  {symbol: 'VI', number: 4, color: '#B7A3C3'},
  {symbol: 'V', number: 5, color: '#9FCADF'},
  {symbol: 'VI', number: 6, color: '#DD608C'},
  {symbol: 'VII', number: 7, color: '#E89483'},
  {symbol: 'VIII', number: 8, color: '#C97DC0'},
  {symbol: 'IX', number: 9, color: '#E39091'},
  {symbol: '', number: '', color: ''},
]

const GenList = ({ setSelectedGen, setVersion }) => {
  const [currentGen, setCurrentGen] = useState(1);

  const handleClick = async (gen) => {
    setCurrentGen(gen.number)
    await setVersion(null)
    await setSelectedGen(gen)
  };
  
  return (
    <div style={{ width: '100%' }}>
      <div className="gen-container">{genList.map(gen => (
        <div onClick={() => handleClick(gen)} className={currentGen === gen.number ? "gen-item-active" : "gen-item"} style={{ backgroundColor: gen.color }} key={gen.number}>{gen.symbol}</div>
      ))}
      </div>
    </div>
  );
};

export default GenList;