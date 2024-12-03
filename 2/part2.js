const fs = require('fs');

// Read input.txt file
const input = fs.readFileSync('./input.txt', 'utf8');

const safeReports = input.split('\n')
  .map((report) => report.split(' ').map(Number))
  .map((report) => isSafeReport(report))
  // Count safe reports
  .reduce((acc, cur) => {
    if (cur) {
      acc++;
    }
    return acc
  }, 0);

console.log(safeReports);

/**
 * Check if a report is safe (with optional dampener)
 * @param {number[]} levels
 * @param {boolean} disableDampener
 * @returns {boolean}
 */
function isSafeReport(levels, disableDampener = false) {
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
      if (disableDampener) {
        return false;
      }
      return isSafeReport(splice(levels, index), true) ||
        isSafeReport(splice(levels, index - 1), true);
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