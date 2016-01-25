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

var constants = require('./constants');
const fs = require('fs');

var Scanner = {
  readNextChar : function(input){
    var character = input.map( function(row) {
      return row.slice(0,3);
    });

    character = character.join('');
    var truncatedInput = input.map( function(row) {
      return row.slice(3, row.length);
    });

    return [character, truncatedInput];
  },

  parseChar : function(charGroup) {
    switch(charGroup) {
    case constants.ZERO_STRING:
      return 0;
    case constants.ONE_STRING:
      return 1;
    case constants.TWO_STRING:
      return 2;
    case constants.THREE_STRING:
      return 3;
    case constants.FOUR_STRING:
      return 4;
    case constants.FIVE_STRING:
      return 5;
    case constants.SIX_STRING:
      return 6;
    case constants.SEVEN_STRING:
      return 7;
    case constants.EIGHT_STRING:
      return 8;
    case constants.NINE_STRING:
      return 9;
    };
  },

  parser : function(input){
    var res, nextChar, remainingInput, parsedChar;

    res = this.readNextChar(input);
    nextChar = res[0];
    remainingInput = res[1];

    parsed = this.parseChar(nextChar);

    if(remainingInput[0].length > 0) {
      return [parsed].concat(this.parser(remainingInput));
    } else {
      return [parsed]
    };
  },

  parseFile: function(filename){
    var lineCounter = 0,
        currentStream = [],
        results = [],
        input = fs.readFileSync(filename, 'utf8');

    input = input.split("\n")

    input.forEach(function(line) {
      lineCounter++;
      if (lineCounter % 4 === 0) {
        results.push(Scanner.parser(currentStream));
        currentStream = [];
      }
      else {
        currentStream.push(line);
      }
    });
    return results;
  },

  isValid: function(accountNumber) {
    var checksum = accountNumber.reduceRight(function(accum, elm, index) {
      return accum += elm * (9-index)
    });

    return checksum % 11 === 0;
  }
};

module.exports = Scanner
