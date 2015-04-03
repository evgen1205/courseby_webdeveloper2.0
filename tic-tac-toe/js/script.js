var Space = {
    number: 0,
    markedBy:"_",
    markBy: function(Player){
        this.markedBy = Player.symbol;
        return this.markedBy}
};
var Player = {
    symbol: "",
    initialize: function(symbol){
        this.symbol = symbol;
    }
};
var Board = {
    freeSpaces: [],
    winCombs: [],
    initialize: function () {
        for (var i = 0; i<9; i++){
            this["Space"+i] = Object.create(Space);
            this["Space"+i].number = i;
            this.freeSpaces.push(this["Space"+i])}
        return this.freeSpaces.length;},
    updateCombs: function (){
        this.winCombs = [
            [this.Space0, this.Space4, this.Space8],
            [this.Space2, this.Space4, this.Space6],
            [this.Space3, this.Space4, this.Space5],
            [this.Space1, this.Space4, this.Space7],
            [this.Space0, this.Space1, this.Space2],
            [this.Space6, this.Space7, this.Space8],
            [this.Space0, this.Space3, this.Space6],
            [this.Space2, this.Space5, this.Space8]]
    },
    result: function(currentPlayer){
		for (var i=0; i<this.winCombs.length; i++){
			if (this.winCombs[i][0].markedBy == currentPlayer.symbol &&
                this.winCombs[i][1].markedBy == currentPlayer.symbol &&
                this.winCombs[i][2].markedBy == currentPlayer.symbol) {
				win = true;
				return currentPlayer;
			} else {win = false}
		}
    }
};
var win = false;

$(document).ready(function() {
    var Player1 = Object.create(Player);
    Player1.initialize("X");
    var Player2 = Object.create(Player);
    Player2.initialize("O");
    var currentPlayer = Player1;
    var GameBoard = Object.create(Board);
    GameBoard.initialize();
    var found; // for computerMove

    $(".tiles").click(function(){
        makeMove($(this));
        computerMove();
    });

    function turns(){
        if (currentPlayer == Player1){
            currentPlayer = Player2;
            $("#turn").html("Player2 (0)").css('color', 'red');
        } else {
            currentPlayer = Player1;
            $("#turn").html("Player1 (X)").css('color', 'inherit');}
        return currentPlayer
    }

    function newGame(){
        if (confirm("Start a new game?")) {
            window.location.reload()}
    }

    function makeMove(div){
        var n = div.attr("id");
        if (GameBoard[n].markedBy != "_"){
            alert("The space is marked already!");
        } else {
            GameBoard[n].markBy(currentPlayer);
            var x = GameBoard.freeSpaces.indexOf(GameBoard[n]);
            GameBoard.freeSpaces.splice(x, 1);
            GameBoard.updateCombs();
            div.html(currentPlayer.symbol);
            if (currentPlayer == Player2) div.css('color', 'red');
            GameBoard.result(currentPlayer);
            if (win == true) {
                alert (currentPlayer.symbol +" wins!");
                newGame()
            } else if (GameBoard.freeSpaces.length == 0) {
                alert("No winner this time");
                newGame()
            } else {
                turns();}
        }
    }

    function computerMove(){
        var temp = chooseSpace().toString();
        makeMove($("#Space"+temp));
    }

    function chooseSpace(){ //
        found = false;
            if (GameBoard.Space4.markedBy == "_") {
                found = true;
                return GameBoard.Space4.number
            }  else if (GameBoard.Space0.markedBy == "_") {
                return GameBoard.Space0.number
            } else {
                for (var i = 0; i <GameBoard.winCombs.length; i++){
                    var comb = GameBoard.winCombs[i];
                    if (comb[0].markedBy == "O" && comb[1].markedBy == "_" && comb[2].markedBy == "O") {
                        found = true;
                        return comb[1].number;
                    } else if (comb[0].markedBy == "_" && comb[1].markedBy == "O" && comb[2].markedBy == "O") {
                        found = true;
                        return comb[0].number;
                    } else if (comb[0].markedBy == "O" && comb[1].markedBy == "O" && comb[2].markedBy == "_") {
                        found = true;
                        return comb[2].number;
                    } else if (comb[0].markedBy == "O" && comb[1].markedBy == "_" && comb[2].markedBy == "O") {
                        found = true;
                        return comb[1].number;
                    }
                }
                if (found == false){
                    for (i = 0; i <GameBoard.winCombs.length; i++){
                        comb = GameBoard.winCombs[i];
                        if (comb[0].markedBy == "X" && comb[1].markedBy == "_" && comb[2].markedBy == "X") {
                            found = true;
                            return comb[1].number;
                        } else if (comb[0].markedBy == "_" && comb[1].markedBy == "X" && comb[2].markedBy == "X") {
                            found = true;
                            return comb[0].number;
                        } else if (comb[0].markedBy == "X" && comb[1].markedBy == "X" && comb[2].markedBy == "_") {
                            found = true;
                            return comb[2].number;
                        } else if (comb[0].markedBy == "X" && comb[1].markedBy == "_" && comb[2].markedBy == "X") {
                            found = true;
                            return comb[1].number;}
                    }
                    if(found == false){
                        var n = Math.round(Math.random() *GameBoard.freeSpaces.length);
                        return GameBoard.freeSpaces[n].number; }
                }
            }
    }
});
