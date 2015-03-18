//optional: make the player mark cells, start/pause
var dimension = 20;
var chanceOfLiveCell = 0.6;
var table;
var cells;

function initializeGame(){
    var trHtml = [];
    for (var y = 0; y<dimension; y++){
        trHtml.push("<tr>");
        for (var x = 0; x<dimension; x++){
            trHtml.push("<td>&nbsp;</td>");
        }
        trHtml.push("</tr>");
    }
    trHtml = trHtml.join("");
    table.append($(trHtml));
}
function placeRandomCells(){
    for (var y = 0; y<dimension; y++){
        for (var x = 0; x<dimension; x++){
            var cell = getCell(x, y);
            if(Math.random()>chanceOfLiveCell) {
                cell.addClass("alive");
            } else{cell.removeClass("alive");}
        }
    }
}
function playGame(){
    prepareNextGeneration();
    renderNextGeneration();
    setTimeout("playGame()", 400)
}
function prepareNextGeneration(){
    for (var y = 0; y<dimension; y++){
        for (var x = 0; x<dimension; x++){
            var cell = getCell(x, y);
            var neighbors = getLiveNeighborCount(x, y);
            cell.attr("living", "false"); //the attribute rather extensive, but allows avoiding troubles with classes in process
            if (isCellAlive(x, y)) {
                if (neighbors === 2 || neighbors === 3) cell.attr("living", "true");
            } else if (neighbors === 3) {
                cell.attr("living", "true");}
        }
    }
}
function renderNextGeneration(){
    cells.each(function(){
        var cell = $(this);
        cell.removeClass("alive");
        if (cell.attr("living") === "true") cell.addClass("alive");
    });
}
function getLiveNeighborCount(x, y){
    var count = 0;
    if (isCellAlive(x-1, y-1)) count++;
    if (isCellAlive(x, y-1)) count++;
    if (isCellAlive(x+1, y-1)) count++;
    if (isCellAlive(x-1, y)) count++;
    if (isCellAlive(x+1, y)) count++;
    if (isCellAlive(x-1, y+1)) count++;
    if (isCellAlive(x, y+1)) count++;
    if (isCellAlive(x+1, y+1)) count++;
    return count;
}
function isCellAlive(x, y){
    return getCell(x, y).attr("class") === "alive";
}
function getCell(x, y){
    if (x >= dimension) {x = 0}
    if (y >= dimension) {y = 0}
    if (x < 0) {x = dimension -1}
    if (y < 0) {y = dimension -1}//these lines cycle the field
    return $(cells[y * dimension + x]);
}

$(document).ready(function () {
    table = $("#main");
    initializeGame();
    cells = table.find("td");
    placeRandomCells();
    playGame();
});