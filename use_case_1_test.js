var assert = require('assert');

var fs = require('fs');
var Scanner = require(__dirname + '/use_case_1');
var constants = require('./constants');


describe('readNextChar', function() {
  it("reads the next character group in a string and returns the remainder",
      function() {
        var str = [" _  _  _  _  _  _  _  _  _ ",
                   "| || || || || || || || || |",
                   "|_||_||_||_||_||_||_||_||_|"];

        var expectedNextStr = [" _  _  _  _  _  _  _  _ ",
                               "| || || || || || || || |",
                               "|_||_||_||_||_||_||_||_|"];

        assert(Scanner.readNextChar(str)[0] === constants.ZERO_STRING);
        assert.deepEqual(Scanner.readNextChar(str)[1], expectedNextStr);
  });
});

describe('parser', function() {
  it("passes the first example", function() {
    var str = [" _  _  _  _  _  _  _  _  _ ",
               "| || || || || || || || || |",
               "|_||_||_||_||_||_||_||_||_|"];

    assert.deepEqual(Scanner.parser(str), [0,0,0,0,0,0,0,0,0]);
  });

  it("parses digits 1-9", function() {
    var str = ["    _  _     _  _  _  _  _ ",
               "  | _| _||_||_ |_   ||_||_|",
               "  ||_  _|  | _||_|  ||_| _|"];

    assert.deepEqual(Scanner.parser(str), [1,2,3,4,5,6,7,8,9]);
  });
});
