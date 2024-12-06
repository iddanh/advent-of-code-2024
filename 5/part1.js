const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');

const [part1, part2] = input.split('\n\n');

const rulesMap = part1.split('\n').reduce((acc, line) => {
  const [before, after] = line.split('|');

  if (!acc[before]) {
    acc[before] = [];
  }
  acc[before].push(after);
  return acc;
}, {});

const updates = part2.split('\n');

let sum = 0;

for (let update of updates) {
  if (checkUpdate(update)) {
    sum += getMiddlePageNumber(update);
  }
}

console.log(sum);

function checkUpdate(update) {
  const visitedMap = {};

  for (let page of update.split(',')) {
    const rules = rulesMap[page];

    if (rules) {
      for (let rule of rules) {
        if (visitedMap[rule]) {
          return false;
        }
      }
    }

    visitedMap[page] = true;
  }

  return true;
}

function getMiddlePageNumber(update) {
  const pages = update.split(',').map(Number);
  return pages[Math.floor(pages.length / 2)];
}