var assert = require('assert');

var Scanner = require(__dirname + '/scanner');

describe('checkValidity', function() {
  it("validates the checksum of a valid account number", function() {
    var input = [3, 4, 5, 8, 8, 2, 8, 6, 5];

    assert(Scanner.isValid(input) === true);
  });

  it("validates the checksum of another valid account number", function() {
    var input = [2, 4, 5, 8, 8, 2, 8, 6, 3];

    assert(Scanner.isValid(input) === true);
  });

  it("validates the checksum of an invalid account number", function() {
    var input = [3, 4, 5, 8, 8, 2, 8, 6, 4];

    assert(Scanner.isValid(input) === false);
  });
});
