const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');

const wordSearch = input.split('\n').map((row) => row.split(''));
const width = wordSearch[0].length;
const height = wordSearch.length;

let sum = 0;

for (let i = 1; i < width - 1; i++) {
  for (let j = 1; j < height - 1; j++) {
    if (wordSearch[j][i] === 'A') {
      if (
        (wordSearch[j - 1][i - 1] === 'M' && wordSearch[j + 1][i + 1] === 'S' ||
          wordSearch[j - 1][i - 1] === 'S' && wordSearch[j + 1][i + 1] === 'M') &&
        (wordSearch[j - 1][i + 1] === 'M' && wordSearch[j + 1][i - 1] === 'S' ||
          wordSearch[j - 1][i + 1] === 'S' && wordSearch[j + 1][i - 1] === 'M')
      ) {
        sum++;
      }
    }
  }
}

console.log(sum);