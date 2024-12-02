const fs = require('fs');

// Read input.txt file
const input = fs.readFileSync('./input.txt', 'utf8');

// Extract list1 and list2 from input
const { list1, list2 } = input.split('\n')
  .reduce((acc, line) => {
      const [num1, num2] = line.split('   ').map(Number);
      acc.list1.push(num1);
      acc.list2.push(num2);
      return acc;
    },
    { list1: [], list2: [] }
  );

// Sort lists
const list1Sorted = list1.sort((a, b) => a - b);
const list2Sorted = list2.sort((a, b) => a - b);

// Calculate distances with reducer
const distances = list1Sorted.reduce((acc, num1, i) => {
  const num2 = list2Sorted[i];
  acc += Math.abs(num1 - num2);
  return acc;
}, 0);

// Print result
console.log(distances);
