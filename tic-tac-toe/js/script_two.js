var Space = {
    occupied: false,
    markedBy:"",
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
            this.freeSpaces.push(this["Space"+i])}
        return this.freeSpaces.length;
    },
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

    $(".tiles").click(function(){
        var n = $(this).attr('id');
        if (GameBoard[n].occupied == true){
          alert("The space is marked already!");
        } else {
            GameBoard[n].markBy(currentPlayer);
            GameBoard[n].occupied = true;
            var x = GameBoard.freeSpaces.indexOf(GameBoard[n]);
            GameBoard.freeSpaces.splice(x, 1);
            GameBoard.updateCombs();
            $(this).html(currentPlayer.symbol);
            if (currentPlayer == Player2) $(this).css('color', 'red');
            GameBoard.result(currentPlayer);
            if (win == true) {
                alert (currentPlayer.symbol +" wins!");
                newGame()
            } else if (GameBoard.freeSpaces.length == 0) {
                alert("No winner this time");
                newGame()
            } else {
                turns($(this));}}
    });
});
