const { exec } = require('child_process');
const process = require('process');

const arguments = process.argv;

if (arguments[2]) {
  process.chdir(arguments[2]);
  exec(`node ${arguments[3] ? 'part2' : 'part1'}.js`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
} else {
  console.error('Please provide a day number');
}