var before20 = {
    0:"",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen"
};
var dec = {
    00:"",
    20: "twenty",
    30: "thirty",
    40: "forty",
    50: "fifty",
    60: "sixty",
    70: "seventy",
    80: "eighty",
    90: "ninety"
};
var rank={
    0:"",
    1:" thousand",
    2:" million",
    3:" billion",
    4:" trillion"};

function inWord(num){
    num = num.toString();
    var str = "";
    var x = num.length;
        if (x==1) num = "0"+num;
    num = num.split("");
    num = num.reverse();
        if (num[1] == "1"){var key1 = parseInt("1"+num[0]); str=str+before20[key1];
        } else {
    key1 = parseInt(num[0]);
    str+=before20[key1];
    var key2 = parseInt(num[1]+"0");
    str= str+" "+dec[key2];}
        if (x == 3){var key3 = parseInt(num[2]);
        str= str+" hundred "+before20[key3];}
    str=str.split(" ").reverse().join(" ");
    return str;
}
function toWords(number) {
    var totalstr = "";
    var numstr = number.toString();
    if (number != parseInt(numstr)) return 'Not a number';
    if (numstr.length > 13) return 'too long!';
    var k = parseInt(numstr.length / 3);
    var rest = number;
    for (var i = 0; i <= k; i++) {
        var temporary = (parseInt(rest / (Math.pow(10, 3 * (k - i)))));
        if (temporary>0) totalstr += inWord(temporary) + rank[k - i] + " ";
        rest = rest % Math.pow(10, 3 * (k - i));
    }
    return totalstr;
}
$(document).ready(function() {
    $("form#enter").submit(function(event){
        alert(toWords($("#inp").val()));
        event.preventDefault();
    });
});
