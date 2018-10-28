'use strict';
const fs = require('fs');
const chalk = require('chalk');
const Output = require('./user-output');
const output = new Output();

class Transaction {
  constructor() {
    this.totalInserted = 0;
  }

  userInput(input) {
    switch (input) {
      case 'Nickel': {
        this.totalInserted += 5;
        addToCoinBank('Nickel');
        userOutput('Nickel');
        break;
      }
      case 'Dime': {
        this.totalInserted += 10;
        addToCoinBank('Dime');
        userOutput('Dime');
        break;
      }
      case 'Quarter':
        this.totalInserted += 25;
        addToCoinBank('Quarter');
        userOutput('Quarter');
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
        return `Invalid Input! \n    Please insert Nickel, Dime or Quarter!`;
        break;
    }
  }

  purchaseItem(item, price) {
    if (this.totalInserted == price) {
      this.totalInserted = 0;
      return `Here's your ${item}!\n    THANK YOU`;
    } else if (this.totalInserted > price) {
      let change = makeChange(this.totalInserted - price);
      returnCoins(change);
      this.totalInserted = 0;
      return `Here's your ${item}!\n    THANK YOU`;
    } else {
      let stillOwed = price - this.totalInserted;
      return `Please insert $${(stillOwed / 100).toFixed(2)}`;
    }
  }
}

// Returns array of denominations, i.e. [25, 25, 10, 5]
const makeChange = difference => {
  return _makeChangeHelper(difference, [25, 10, 5]);
};

const _makeChangeHelper = (amount, coins) => {
  if (amount <= 0) {
    return [];
  } else if (amount >= coins[0]) {
    let remainder = amount - coins[0];
    return [coins[0], ..._makeChangeHelper(remainder, coins)];
  } else {
    return _makeChangeHelper(amount, coins.slice(1));
  }
};

// Takes array of coins [25, 25, 10, 5], dispenses each coin
const returnCoins = coins => {
  coins.forEach(coin => {
    if (coin == 25) {
      dispenseFromCoinBank('Quarter');
      outPutCoin('Quarter');
    }
    if (coin == 10) {
      dispenseFromCoinBank('Dime');
      outPutCoin('Dime');
    }
    if (coin == 5) {
      dispenseFromCoinBank('Nickel');
      outPutCoin('Nickel');
    }
  });
};

const addToCoinBank = coin => {
  const data = fs.readFileSync('coin-bank.json');
  const coinBank = JSON.parse(data);
  checkCoinBank(coin, coinBank);
  coinBank[coin]++;
  coinBank = JSON.stringify(coinBank, null, 2);
  fs.writeFileSync('coin-bank.json', coinBank, err => {
    if (err) throw err;
  });
};

const dispenseFromCoinBank = coin => {
  const data = fs.readFileSync('coin-bank.json');
  const coinBank = JSON.parse(data);
  checkCoinBank(coin, coinBank);
  coinBank[coin]--;
  coinBank = JSON.stringify(coinBank, null, 2);
  fs.writeFileSync('coin-bank.json', coinBank, err => {
    if (err) throw err;
  });
};

const checkCoinBank = (coin, coinBank) => {
  if (coinBank[coin] > 0) {
    coinBank[coin]--;
  } else {
    throw `Coin bank is out of ${coin}s!`;
  }
  return;
};

const test = argument => {
  return argument;
};

module.exports = { Transaction, test };
