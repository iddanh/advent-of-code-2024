const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');

const wordSearch = input.split('\n').map((row) => row.split(''));
const width = wordSearch[0].length;
const height = wordSearch.length;

const directions = [
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
  { x: -1, y: 1 },
  { x: -1, y: 0 },
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },
];

function searchWord(x, y, word, direction) {
  if (word.length === 0) {
    return true;
  }
  if (x < 0 || y < 0 || x >= width || y >= height) {
    return false;
  }
  if (wordSearch[y][x] !== word[0]) {
    return false;
  }
  return searchWord(x + direction.x, y + direction.y, word.substring(1), direction);
}

let sum = 0;

for (let x = 0; x <= width; x++) {
  for (let y = 0; y <= height; y++) {
    for (let direction of directions) {
      if (searchWord(x, y, 'XMAS', direction)) {
        sum++;
      }
    }
  }
}

console.log(sum);