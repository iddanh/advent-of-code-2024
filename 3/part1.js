const fs = require('fs');

const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

// Read input.txt file
const input = fs.readFileSync('./input.txt', 'utf8');

let sum = 0;
let m;

while ((m = regex.exec(input)) !== null) {
  sum += parseInt(m[1]) * parseInt(m[2]);
}

console.log(sum)