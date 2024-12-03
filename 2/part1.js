const fs = require('fs');

// Read input.txt file
const input = fs.readFileSync('./input.txt', 'utf8');

const safeReports = input.split('\n')
  .map(isSafeReport)
  // Count safe reports
  .reduce((acc, cur) => {
    if (cur) {
      acc++;
    }
    return acc
  }, 0);

console.log(safeReports);

/**
 * Check if a report is safe
 * @param {string} report
 * @returns {boolean}
 */
function isSafeReport(report) {
  const levels = report.split(' ').map(Number);

  let prev = levels[0];
  let dir = null;

  for (let index = 0; index < levels.length; index++) {
    const cur = levels[index];
    // Skip first level
    if (index === 0) {
      continue;
    }
    // Init direction
    if (dir === null) {
      dir = cur < prev ? 'desc' : 'asc';
    }
    // Check if levels are out of range
    if (Math.abs(cur - prev) === 0 || Math.abs(cur - prev) > 3) {
      return false;
    }
    // Check if direction is consistent
    if (dir === 'asc' && cur < prev) {
     return false;
    }
    if (dir === 'desc' && cur > prev) {
      return false;
    }
    prev = cur;
  }

  return true;
}