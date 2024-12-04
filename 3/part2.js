const fs = require('fs');

const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

// Read input.txt file
const input = fs.readFileSync('./input.txt', 'utf8');

// Split input by don't()
const result = input.split('don\'t()')
  // Split input by do() and drop the first element (except for the beginning)
  .map((str, index) => str.split('do()').slice(index === 0 ? 0 : 1))
  // Filter out empty strings
  .filter(str => str.length > 0)
  // Sum up all the values
  .reduce((acc, cur) => {
    acc += cur.reduce((acc, cur) => {
      acc += evaluate(cur);
      return acc;
    }, 0);
    return acc;
  }, 0);

console.log(result);

function evaluate(str) {
  let sum = 0;
  let m;

  while ((m = regex.exec(str)) !== null) {
    sum += parseInt(m[1]) * parseInt(m[2]);
  }

  return sum;
}
