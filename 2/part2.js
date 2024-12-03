const fs = require('fs');

// Read input.txt file
const input = fs.readFileSync('./input.txt', 'utf8');

const safeReports = input.split('\n')
  .map((report) => {
    const safe = isSafeReport(report);
    if (!safe) {
      return checkReportWithoutFirstLevel(report);
    }
    return safe;
  })
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
 * @param {string} report
 * @param {boolean} disableDampener
 * @returns {boolean}
 */
function isSafeReport(report, disableDampener = false) {
  const levels = report.split(' ').map(Number);

  let prev = levels[0];
  let isAsc = null;
  let problemDampened = disableDampener;

  for (let index = 0; index < levels.length; index++) {
    const cur = levels[index];
    // Skip first level
    if (index === 0) {
      continue;
    }
    // Check if levels are out of range
    if (Math.abs(cur - prev) === 0 || Math.abs(cur - prev) > 3) {
      if (problemDampened) {
        return false;
      }
      problemDampened = true;
      continue;
    }
    // Init direction
    if (isAsc === null) {
      isAsc = cur > prev;
    }
    // Check if direction is consistent
    if (isAsc && cur < prev) {
      if (problemDampened) {
        return false;
      }
      problemDampened = true;
      continue;
    }
    if (!isAsc && cur > prev) {
      if (problemDampened) {
        return false;
      }
      problemDampened = true;
      continue;
    }
    prev = cur;
  }

  return true;
}

function checkReportWithoutFirstLevel(report) {
  const levels = report.split(' ');
  const levelsWithoutFirst = levels.slice(1);
  return isSafeReport(levelsWithoutFirst.join(' '), true);
}