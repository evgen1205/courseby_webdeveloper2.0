describe('toWords', function() {
    it("turns numbers into words", function() {
        toWords("999999").should.equal("nine hundred ninety nine thousand nine hundred ninety nine ");
    });

    it("returns 'Not a number' if nothing was entered", function() {
        toWords("").should.equal("Not a number");
    });

    it("returns 'too long' if the number is over 999 999 999 999", function() {
        toWords("10000000000000").should.equal("too long!");
    });
});

describe('inWord', function() {
    it("turns three-digit (or less) numbers into words", function() {
        inWord("78").should.equal("seventy eight");
    });

});
