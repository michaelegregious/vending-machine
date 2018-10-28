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

xdescribe('Transaction Class', function() {
  describe('dispenseCoin', function() {
    it('should return correct coin values when called', function() {
      const result = fake('Quarter');
      console.log('I am here', result);
    });
  });
});
