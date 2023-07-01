/**
Write a function that takes two numbers and returns
the sum of those numbers
*/
function add(x, y) {
  const add = x + y;
  return add;
}

console.log("add", add(2, 3)); // Expects 5

/**
Write a function that takes any number of arguments
of type number and returns the sum of all the arguments
*/
function sum(...args) {
  let sum = 0;
  for (let i = 0; i < args.length; i++) {
    sum = args[i] + sum;
  }
  // using reducer
  const initialValue = 0;
  const sumWithInitialValue = args.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );
  return {sum, sumWithInitialValue};
}

console.log("sum", sum(2, 3, 4, 5)); // Expects 14

/**
Write a function that takes two strings, A and B,
and returns whether B is in A in a case-insensitive way
*/
function stringIncludes(A, B) {
  const stringComparison = String(A).toLowerCase().includes(String(B).toLowerCase());
  return stringComparison;
}

console.log(
  "stringIncludes",
  stringIncludes("I drove to New York in a van with my friend", "new")
); // Expects true

/**
Write a function that takes an array of objects, and returns an array
of the objects' "name" property, only if that property exists
*/
function getNames(names) {
  const nameArray = [];
  names.forEach(name => Object.keys(name).includes('name') ? nameArray.push(name) : null);
  return nameArray;
}

console.log(
  "getNames",
  getNames([
    { a: 1 },
    { name: "Jane" },
    {},
    { name: "Mark" },
    { name: "Sophia" },
    { b: 2 }
  ])
); // Expects ['Jane', 'Mark', 'Sophia']

/**
Write a function that takes an array of numbers and returns the
index of the largest number
*/
function getLargestNumberIndex(args) {
  // console.log(args, ...args)
  // console.log(args.indexOf(Math.max(...args)))
  // console.log(Math.max(...args))
  // console.log(args.map(number => number === Math.max(...args)))
  return args.indexOf(Math.max(...args));
}

console.log("getLargestNumberIndex", getLargestNumberIndex([7, 1, 4, 12, 9])); // Expects 3

/**
Write a function that returns a promise that resolves
after n number of milliseconds
*/
async function delay(n) {
  return new Promise(res => setTimeout(res, n));
}

(async () => {
  console.time("Testing delay");
  await delay(1000);
  console.timeEnd("Testing delay");
})();

// Ternary test

const valueTrue = false;

const someString = "kalle" + (valueTrue ? "_true" : "_false");

console.log(someString);