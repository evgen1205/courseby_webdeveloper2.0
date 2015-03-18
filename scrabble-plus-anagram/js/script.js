var total = 0;
function scrabble(word){
	word = word.toUpperCase();
	var scores = { 'A' : 1, 'B' : 3, 'C' : 3, 'D' : 2, 'E' : 1, 'F' : 4, 'G' : 2, 'H' : 4, 'I' : 1, 'J' : 8, 'K' : 5, 'L' : 1, 'M' : 3, 'N' : 1, 'O' : 1, 'P' : 3, 'Q' : 10, 'R' : 1, 'S' : 1, 'T' : 1, 'U' : 1, 'V' : 4, 'W' : 4, 'X' : 8, 'Y' : 4, 'Z' : 10 };
	var sum = 0;
	for (var i = 0; i < word.length; ++i) {
		sum += scores[word.charAt(i)] || 0;
	}
	return sum;
}

function anagramma(word){
	var wordArray = word.split("");
    var reverseArray = wordArray.reverse();
    return reverseArray.join("");
}

$(document).ready(function() {
    $("form#enter").submit(function(event){
        var word = $("#inp").val();
        $("#score").html(" "+scrabble(word));
        total += scrabble(word);
        $("#total").html(total);
        alert(anagramma(word)+" "+":-P");
        event.preventDefault();
    });
});

