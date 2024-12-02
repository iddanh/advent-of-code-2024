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

// Bucket second list
const bucket = list2.reduce((acc, num) => {
  if (!acc[num]) {
    acc[num] = 0;
  }
  acc[num]++;
  return acc;
}, {});

const similarity = list1.reduce((acc, num) => {
  acc += num * (bucket[num] || 0);

  return acc;
}, 0);


// Print result
console.log(similarity);
