const genList = [
  {symbol: 'I', number: 1},
  {symbol: 'II', number: 2},
  {symbol: 'III', number: 3},
  {symbol: 'VI', number: 4},
  {symbol: 'V', number: 5},
  {symbol: 'VI', number: 6},
  {symbol: 'VII', number: 7},
  {symbol: 'VIII', number: 8},
  {symbol: 'IX', number: 9}
]

const GenList = () => {
  return (
    <ul>{genList.map(gen => (
      <li key={gen.number}>{gen.symbol}</li>
    ))}
    </ul>
  )
};

export default GenList;