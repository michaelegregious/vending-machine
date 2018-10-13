'use strict';
const fs = require('fs');

const coinInserted = coin => {
  let rawdata = fs.readFileSync('coin-bank.json');
  let coinBank = JSON.parse(rawdata);
  coinBank[coin]++;
  coinBank = JSON.stringify(coinBank, null, 2);
  fs.writeFileSync('coin-bank.json', coinBank, err => {
    if (err) throw err;
    console.log('Coin Received!');
  });
};

module.exports = class Transaction {
  constructor() {
    this.totalInserted = 0;
  }

  userInput(input) {
    switch (input) {
      case 'Nickel':
        this.totalInserted += 0.05;
        coinInserted('nickels');
        return `Amount Inserted: $${this.totalInserted.toFixed(2)}`;
        break;
      case 'Dime':
        this.totalInserted += 0.1;
        coinInserted('dimes');
        return `Amount Inserted: $${this.totalInserted.toFixed(2)}`;
        break;
      case 'Quarter':
        this.totalInserted += 0.25;
        coinInserted('quarters');
        return `Amount Inserted: $${this.totalInserted.toFixed(2)}`;
        break;
      case 'Cola':
        if (this.totalInserted >= 1.0) {
        }

      default:
        console.error(`Invalid Input! "${coin}" was returned from coin return. \n
        Please insert "Nickel", "Dime" or "Quarter"!`);
        break;
    }
  }
};

// {
//   "nickels": 40,
//   "dimes": 50,
//   "quarters": 40
// }
