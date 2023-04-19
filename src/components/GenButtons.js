const GenButtons = ({ gen }) => {
  return (
    <div className="pokedex-cover-inner-button" onClick={() => console.log(gen.symbol)}>
      <svg xmlns="http://www.w3.org/2000/svg" className="pokedex-cover-inner" viewBox="0 0 44 35">
        <rect width="44" height="35" y="0" x="0" ry="2" fill="rgba(41,170,253,255)" stroke="black" strokeWidth="1" />
        <text fontSize="24" y="50%" x="50%" fill={gen.color} stroke="black"  dominant-baseline="middle" text-anchor="middle">{gen.symbol}</text>
      </svg>
    </div>
  );
};

export default GenButtons;