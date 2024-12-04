const fs = require('fs');

// Read input.txt file
const input = fs.readFileSync('./input.txt', 'utf8');

const safeReports = input.split('\n')
  // Read levels
  .map((report) => report.split(' ').map(Number))
  // Generate all possible reports minus one level
  .map(levels => {
    const splitReports = levels.reduce((acc, _, index) => {
      acc.push(splice(levels, index));
      return acc;
    }, []);
    splitReports.push(levels);
    return splitReports;
  })
  // Check if any of the reports are safe
  .filter((splitReports) => splitReports.some(levels => isSafeReport(levels)))
  .length

console.log(safeReports);

/**
 * Check if a report is safe (with optional dampener)
 * @param {number[]} levels
 * @returns {boolean}
 */
function isSafeReport(levels) {
  let prev = levels[0];
  let isAsc = null;

  for (let index = 1; index < levels.length; index++) {
    const cur = levels[index];

    // Init direction
    if (isAsc === null) {
      isAsc = cur > prev;
    }

    if (
      // Check if levels are out of range
      Math.abs(cur - prev) === 0 || Math.abs(cur - prev) > 3 ||
      // Check if direction is consistent
      isAsc && cur < prev || !isAsc && cur > prev
    ) {
      return false;
    }
    prev = cur;
  }

  return true;
}

/**
 * Splice array and return
 * @param array
 * @param index
 * @returns {*}
 */
function splice(array, index) {
  return array.filter((_, i) => i !== index);
}