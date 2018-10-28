'use strict';
const ora = require('ora');

class Output {
  coinInserted(coin, totalInserted) {
    process.stdout.write(
      `Amount Inserted: $${(totalInserted / 100).toFixed(2)}`
    );
  }

  returnCoin(coin) {
    process.stdout.write(`    Clink! `);
    process.stdout.write(chalk.green(coin));
    process.stdout.write(` returned\n`);
  }

  dispenseItem(item) {
    process.stdout.write(`Here's your ${item}!\n    THANK YOU`);
  }

  stillOwed(price) {
    let still;
    return `Please insert $${(stillOwed / 100).toFixed(2)}`;
  }
}

module.exports = Output;
