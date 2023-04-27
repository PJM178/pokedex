import { useState } from "react";

const GenButtons = ({ setSelectedGen, setVersion, selectedGen, genList }) => {
  const [activeGen, setActiveGen] = useState(1);

  const handleSelectGen = (gen) => {
    setActiveGen(gen.number);
    setVersion(null);
    setSelectedGen(gen);
  }

  return (
    <div className="pokedex-cover-inner-button-container">
      {genList.map(gen => (
        <div key={gen.number} className={activeGen === gen.number ? "pokedex-cover-inner-button-active" : "pokedex-cover-inner-button"} onClick={() => handleSelectGen(gen)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="pokedex-cover-inner" viewBox="0 0 44 35">
            <rect width="44" height="35" y="0" x="0" ry="2" fill="rgba(41,170,253,255)" stroke="black" strokeWidth="1" />
            <text fontSize="24" y="55%" x="50%" fill={gen.color} stroke="black" strokeWidth="1" dominantBaseline="middle" textAnchor="middle">{gen.symbol}</text>
          </svg>
        </div>))
      }
    </div>
  );
};

export default GenButtons;