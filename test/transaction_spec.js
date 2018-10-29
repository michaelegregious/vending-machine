'use strict';
const chai = require('chai');
const { Transaction, test } = require('../transaction');
const Output = require('../user-output');

chai.should();

describe('Test function', function() {
  it('should trivially return the argument it is passed.', function() {
    const expected = 'Argument';
    const result = test('Argument');
    result.should.equal('Argument');
  });
});

const captureStream = stream => {
  var oldWrite = stream.write;
  var buff = '';
  stream.write = function(chunk, encoding, callback) {
    buff += chunk.toString(); // chunk is a String or Buffer
    oldWrite.apply(stream, arguments);
  };
  return {
    unhook: function() {
      stream.write = oldWrite;
    },
    captured: function() {
      return buf;
    }
  };
};

describe('The Transaction Class tracks customer input', function() {
  describe('totalInserted', function() {
    let transaction;

    beforeEach(() => {
      transaction = new Transaction();
    });

    it('should start at zero', function() {
      transaction.totalInserted.should.equal(0);
    });

    it('can be updated by inserting coins', function() {
      transaction.userInput('Dime');
      transaction.totalInserted.should.equal(10);
    });
  });
  describe('purchaseItem', function() {
    let transaction;

    beforeEach(() => {
      transaction = new Transaction();
    });
    it('takes an item and a price and returns an outcome', function() {});
  });
});
