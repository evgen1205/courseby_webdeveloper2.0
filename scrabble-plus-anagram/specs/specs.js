describe('scrabble', function() {
    it("gives every letter in the word a score and sums the scores", function() {
        scrabble("frequency").should.equal(26);
    });

    it("gives every letter in the word a score and sums the scores", function() {
        scrabble("controversy").should.equal(19);
    });

    it("returns '0' if no word was entered", function() {
        scrabble("").should.equal(0);
    });
});

describe('anagramma', function() {
    it("returns the input word written vice versa", function() {
        anagramma("word").should.equal("drow");
    });
});
