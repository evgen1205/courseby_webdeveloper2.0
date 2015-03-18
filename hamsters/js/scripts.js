jQuery(document).ready(function (){
	$('#homa_0').click(function(){chekHoma(0);});
	$('#homa_1').click(function(){chekHoma(1);});
	$('#homa_2').click(function(){chekHoma(2);});
	$('#homa_3').click(function(){chekHoma(3);});
	$('#homa_4').click(function(){chekHoma(4);});
	$('#homa_5').click(function(){chekHoma(5);});
	$('#homa_6').click(function(){chekHoma(6);});
	$('#homa_7').click(function(){chekHoma(7);});
	$('#homa_8').click(function(){chekHoma(8);});
	$("#scoreID").html(" "+score);
	$('#start-stop').click(function(){main();});
	$('#score-reset').click(function(){scoreDriver(2);});
});

var startgame=0;
var score=0;
var timerID;
var poleHoma = ["#homa_0", "#homa_1", "#homa_2", "#homa_3", "#homa_4", "#homa_5", "#homa_6", "#homa_7", "#homa_8"];

function scoreDriver(x){
	if (x==1) {score = score+10;}
	else if (x==0) {score = score-50;}
	else if (x==2) {score = 0;}
	$("#scoreID").html(" "+score);}

function randomHoma() {return Math.round(Math.random() * 8);}

var currentHoma = randomHoma();

function hideCurrentHoma(){
	$(poleHoma[currentHoma]).css({ "background-color": "#75d147"});
	$(poleHoma[currentHoma]+" img").hide();}

function showNewHoma(){
	$(poleHoma[currentHoma]).css({ "background-color": "#003300"});
	$(poleHoma[currentHoma]+" img").show();}

function setNewHoma(){currentHoma = randomHoma();}

function chekHoma(homa) {
	if (startgame==1){
		timerDriver(0);
		if (homa == currentHoma){scoreDriver(1);}
		else {scoreDriver(0);}
		updateHoma();
		timerDriver();}
	else if (startgame==0){alert("Игра ещё не начата ;)");}
	else if (startgame==2){alert("Нажмите на Старт для продолжения игры!");}}

function updateHoma(){
	hideCurrentHoma();
	setNewHoma();
	showNewHoma();}

function timerDriver(i){
	if (i==0) {clearInterval(timerID)}
	else timerID=setInterval(updateHoma, 1000);}

function main(){
	if (startgame==0){
		startgame=1;
		showNewHoma();
		timerDriver();}
	else if(startgame==1){
		startgame=2;
		timerDriver(0);
		hideCurrentHoma();}
	else if (startgame==2){
		startgame=1;
		updateHoma();
		timerDriver();}}
