// User Story 1
//
// You work for a bank, which has recently purchased an ingenious machine to
// assist in reading letters and faxes sent in by branch offices. The machine
// scans the paper documents, and produces a file with a number of entries
// which each look like this:
//
//     _  _     _  _  _  _  _
//   | _| _||_||_ |_   ||_||_|
//   ||_  _|  | _||_|  ||_| _| 
//                            
// Each entry is 4 lines long, and each line has 27 characters. The first 3
// lines of each entry contain an account number written using pipes and
// underscores, and the fourth line is blank. Each account number should have 9
// digits, all of which should be in the range 0-9. A normal file contains
// around 500 entries.
//
// Your first task is to write a program that can take this file and parse it
// into actual account numbers.

var assert = require('assert');


var readNextChar = function(input){
  var character = input.map( function(row) {
    return row.slice(0,3);
  });

  character = character.join('');
  var truncatedInput = input.map( function(row) {
    return row.slice(3, row.length);
  });

  return [character, truncatedInput];
};

// const: ES2015 feature, incompatible with IE 8-10
const ZERO_STRING =  " _ | ||_|";
const ONE_STRING =   "     |  |";
const TWO_STRING =   " _  _||_ ";
const THREE_STRING = " _  _| _|";
const FOUR_STRING =  "   |_|  |";
const FIVE_STRING =  " _ |_  _|";
const SIX_STRING =   " _ |_ |_|";
const SEVEN_STRING = " _   |  |";
const EIGHT_STRING = " _ |_||_|";
const NINE_STRING =  " _ |_| _|";

var parseChar = function(charGroup) {
  switch(charGroup) {
  case ZERO_STRING:
    return 0;
  case ONE_STRING:
    return 1;
  case TWO_STRING:
    return 2;
  case THREE_STRING:
    return 3;
  case FOUR_STRING:
    return 4;
  case FIVE_STRING:
    return 5;
  case SIX_STRING:
    return 6;
  case SEVEN_STRING:
    return 7;
  case EIGHT_STRING:
    return 8;
  case NINE_STRING:
    return 9;
  };
};

var parser = function(input){
  var res, nextChar, remainingInput, parsedChar;

  res = readNextChar(input);
  nextChar = res[0];
  remainingInput = res[1];

  parsed = parseChar(nextChar);

  if(remainingInput[0].length > 0) {
    return [parsed].concat(parser(remainingInput));
  } else {
    return [parsed]
  };
};

describe('readNextChar', function() {
  it("reads the next character group in a string and returns the remainder",
      function() {
        var str = [" _  _  _  _  _  _  _  _  _ ",
                   "| || || || || || || || || |",
                   "|_||_||_||_||_||_||_||_||_|"];

        var expectedNextStr = [" _  _  _  _  _  _  _  _ ",
                               "| || || || || || || || |",
                               "|_||_||_||_||_||_||_||_|"];

        assert(readNextChar(str)[0] === ZERO_STRING);
        assert.deepEqual(readNextChar(str)[1], expectedNextStr);
  });
});

describe('parser', function() {
  it("passes the first example", function() {
    var str = [" _  _  _  _  _  _  _  _  _ ",
               "| || || || || || || || || |",
               "|_||_||_||_||_||_||_||_||_|"];

    assert.deepEqual(parser(str), [0,0,0,0,0,0,0,0,0]);
  });

  it("parses digits 1-9", function() {
    var str = ["    _  _     _  _  _  _  _ ",
               "  | _| _||_||_ |_   ||_||_|",
               "  ||_  _|  | _||_|  ||_| _|"];

    assert.deepEqual(parser(str), [1,2,3,4,5,6,7,8,9]);
  });
});
