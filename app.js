const { Transaction } = require('./transaction');
const menu = require('./menu');

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
    transaction.userInput(cmd);
  });
};
