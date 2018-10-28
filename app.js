const Transaction = require('./transaction');
const menu = require('./menu');
const ora = require('ora');

module.exports = () => {
  const transaction = new Transaction();

  //Clear screen
  process.stdout.write('\x1B[2J\x1B[0f');

  //Display menu
  menu();

  process.stdout.write('\nPlease Insert Coins > ');

  //Event listener for user input
  process.stdin.on('data', data => {
    const cmd = data.toString().trim();
    let result = transaction.userInput(cmd);
    const spinner = ora('    KA-CHUNK').start();

    setTimeout(() => {
      spinner.text = `    ${result}`;
      spinner.color = 'green';
      spinner.succeed();
      process.stdout.write('Please Insert Coins > ');
    }, 500);
  });
};
