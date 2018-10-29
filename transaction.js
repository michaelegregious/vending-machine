'use strict';
const fs = require('fs');
const output = require('./user-output');

class Transaction {
  constructor() {
    this.totalInserted = 0;
  }

  userInput(input) {
    switch (input) {
      case 'Nickel':
        this.totalInserted += 5;
        addToCoinBank('Nickel');
        output.coinInserted(this.totalInserted);
        break;
      case 'Dime':
        this.totalInserted += 10;
        addToCoinBank('Dime');
        output.coinInserted(this.totalInserted);
        break;
      case 'Quarter':
        this.totalInserted += 25;
        addToCoinBank('Quarter');
        output.coinInserted(this.totalInserted);
        break;
      case 'Cola':
        return this.purchaseItem('Cola', 100);
        break;
      case 'Chips':
        return this.purchaseItem('Chips', 50);
        break;
      case 'Candy':
        return this.purchaseItem('Candy', 65);
        break;
      default:
        output.invalidInput();
        break;
    }
  }

  purchaseItem(item, price) {
    if (this.totalInserted == price) {
      this.totalInserted = 0;
      output.dispenseItem(item);
    } else if (this.totalInserted > price) {
      let change = makeChange(this.totalInserted - price);
      returnCoins(change);
      output.dispenseItem(item);
      this.totalInserted = 0;
    } else {
      output.stillOwed(price, this.totalInserted);
    }
  }
}

// Returns array of denominations, i.e. [25, 25, 10, 5]
const makeChange = difference => {
  return _makeChangeHelper(difference, [25, 10, 5]);
};

const _makeChangeHelper = (amount, denoms) => {
  if (amount <= 0) {
    return [];
  } else if (amount >= denoms[0]) {
    let remainder = amount - denoms[0];
    return [denoms[0], ..._makeChangeHelper(remainder, denoms)];
  } else {
    return _makeChangeHelper(amount, denoms.slice(1));
  }
};

// Takes array of coins [25, 25, 10, 5], dispenses each coin
const returnCoins = coins => {
  coins.forEach(coin => {
    if (coin == 25) {
      dispenseFromCoinBank('Quarter');
      output.returnCoin('Quarter');
    }
    if (coin == 10) {
      dispenseFromCoinBank('Dime');
      output.returnCoin('Dime');
    }
    if (coin == 5) {
      dispenseFromCoinBank('Nickel');
      output.returnCoin('Nickel');
    }
  });
};

const addToCoinBank = coin => {
  const data = fs.readFileSync('coin-bank.json');
  let coinBank = JSON.parse(data);
  checkCoinBank(coin, coinBank);
  coinBank[coin]++;
  coinBank = JSON.stringify(coinBank, null, 2);
  fs.writeFileSync('coin-bank.json', coinBank, err => {
    if (err) throw err;
  });
};

const dispenseFromCoinBank = coin => {
  const data = fs.readFileSync('coin-bank.json');
  let coinBank = JSON.parse(data);
  checkCoinBank(coin, coinBank);
  coinBank[coin]--;
  coinBank = JSON.stringify(coinBank, null, 2);
  fs.writeFileSync('coin-bank.json', coinBank, err => {
    if (err) throw err;
  });
};

const checkCoinBank = (coin, coinBank) => {
  if (coinBank[coin] <= 0) throw `Coin bank is out of ${coin}s!`;
};

const test = argument => {
  return argument;
};

module.exports = { Transaction, test };
