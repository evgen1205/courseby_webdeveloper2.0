describe("init", function() {
        it("hides the word to guess", function() {
            init("hangman").should.equal("_ _ _ _ _ _ _ ");
        });
});

describe("checkLetter", function() {
        it("checks whether the word contains the letter", function() {
            checkLetter("e", "hangman").should.equal(false);
        });
});

describe("checkLetter", function() {
    it("checks whether the word contains the letter", function() {
        checkLetter("n", "hangman").should.equal(true);
    });
});

describe("hang", function() {
        it("announces the game over", function() {
            loss("word").should.equal("Fail!");
        });
});

