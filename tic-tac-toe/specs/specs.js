describe("Player", function() {
    describe("initialize", function() {
        it("is initialized with a symbol", function() {
            var testPlayer = Object.create(Player);
            testPlayer.initialize("X");
            testPlayer.symbol.should.equal("X");
        });
    });
});

describe("Space", function() {
    describe("markBy", function() {
        it("lets a player mark the space", function() {
            var testPlayer = Object.create(Player);
            testPlayer.initialize("X");
            var testSpace = Object.create(Space);
            testSpace.markBy(testPlayer);
            testSpace.markedBy.should.equal(testPlayer.symbol);
        });
    });
});

describe("Board", function() {
    it("creates 9 spaces when it is initialized", function(){
        var testBoard = Object.create(Board);
        testBoard.initialize().should.equal(9);
    });

    it("checks the spaces and returns the winner", function(){
        var testBoard = Object.create(Board);
        testBoard.initialize();
        var testPlayer = Object.create(Player);
        testPlayer.initialize("X");
        testBoard.Space0.markedBy = testPlayer.symbol;
        testBoard.Space1.markedBy = testPlayer.symbol;
        testBoard.Space2.markedBy = testPlayer.symbol;
        testBoard.updateCombs();
        testBoard.result(testPlayer).should.equal(testPlayer);
    });
});

describe("");