'use strict';
const ora = require('ora');
const chalk = require('chalk');

const output = {
  coinInserted(totalInserted) {
    const spinner = ora('    KA-CHUNK').start();
    const output = `Amount Inserted: $${(totalInserted / 100).toFixed(2)}`;
    setTimeout(() => {
      spinner.text = `    ${output}`;
      spinner.color = 'green';
      spinner.succeed();
      process.stdout.write('Please Insert Coins > ');
    }, 500);
  },
  returnCoin(coin) {
    process.stdout.write(`    Clink! `);
    process.stdout.write(chalk.green(coin));
    process.stdout.write(` returned\n`);
  },
  dispenseItem(item) {
    process.stdout.write(`    Here's your `);
    process.stdout.write(chalk.red(`${item}`));
    process.stdout.write(`!\n    THANK YOU`);
    process.stdout.write('\nPlease Insert Coins > ');
  },
  stillOwed(price, totalInserted) {
    let owed = price - totalInserted;
    process.stdout.write(`    Please insert $${(owed / 100).toFixed(2)}`);
    process.stdout.write('\nPlease Insert Coins > ');
  },
  invalidInput() {
    process.stdout.write(chalk.cyan(`    Invalid Input! \n`));
    process.stdout.write(`    Please insert Nickel, Dime or Quarter!`);
    process.stdout.write('\nPlease Insert Coins > ');
  }
};

module.exports = output;
