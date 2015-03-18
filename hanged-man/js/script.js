var abc = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var wordStore = ["mysterious","whiskey","boolean","stylesheet","peekaboo","mathematics","galaxy","neighbour","background","bookworm","statement","hangman","knowledge","hypertext","transparent","alphabet","validate","opacity","language"];
var hangman = ["|","(x x)","~","|","-----------","|","|","/\\","/    \\"]; //раскидать переменные по функциям?
var mistakes = 0;
var placeholders;
var rightGuesses = 0;
var n = Math.round(Math.random() *wordStore.length);
var correct = true;

function init(wordToGuess){
	placeholders = ""; //without this Mocha inserts double number in Chrome, wtf??
	for (var a=0; a<wordToGuess.length; a++){
	placeholders = placeholders +"_ "}
    $("#forword").html(placeholders);
    return placeholders;
}
function loss(wordToGuess){
    placeholders = placeholders.split(" ");
    for (var b=0; b<wordToGuess.length; b++){
        if(placeholders[b] == "_"){
            placeholders[b] = "<span class='missing'>" +wordToGuess.charAt(b)+"</span>";
        }
    }
    placeholders = placeholders.join(" ");
    $("#forword").html(placeholders);
    return "Fail!";
}
function hang(m, wordToGuess){
    $("#man").append("<p>"+ hangman[m] +"</p>");
    if(m == 8 ){
        alert(loss(wordToGuess));
        newGame()
    }
}
function checkLetter(letter, wordToGuess){
    for(var c=0; c<wordToGuess.length; c++)
        if (wordToGuess.charAt(c) == letter) {
            placeholders = placeholders.split(" ");
            placeholders[c] = letter;
            placeholders = placeholders.join(" ");
            $("#forword").html(placeholders);
            rightGuesses++;
            correct = true}
    if (wordToGuess.indexOf(letter) == -1){
        mistakes++;
        hang(mistakes, wordToGuess);
        correct = false}
    return correct;
}
function newGame(){
    if (confirm("Start a new game?")) {
        window.location.reload()}
}

$(document).ready(function () {
    var wordToGuess = wordStore[n];
    for(var i=0; i<abc.length; i++){
        $("#letters").append("<div class='abcs'>"+ abc[i] +"</div>")
    }
    init(wordToGuess);

    $(".abcs").click(function(){
        var letter = $(this).html().toLowerCase();
        checkLetter(letter, wordToGuess);
        $(this).html("&nbsp;");

        if (rightGuesses == wordToGuess.length) {
            alert("Epic Win!");
            newGame();
        }
    });
    $("form#new").submit(function(event){
        event.preventDefault();
        newGame();
    });
});