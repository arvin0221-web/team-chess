// 棋盤渲染模組

var boardContainer = document.getElementById("board");

var boardState = [];

var selectedSquare = null;

var boardSize = 8;



function createInitialBoard(){

boardState = [

["r","n","b","q","k","b","n","r"],
["p","p","p","p","p","p","p","p"],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["P","P","P","P","P","P","P","P"],
["R","N","B","Q","K","B","N","R"]

];

}



function renderBoard(boardData){

if(boardData != null){

boardState = boardData;

}

boardContainer.innerHTML = "";

for(var y = 0 ; y < boardSize ; y++){

for(var x = 0 ; x < boardSize ; x++){

var square = document.createElement("div");

var isWhiteSquare = (x + y) % 2 == 0;

square.classList.add("square");

if(isWhiteSquare){

square.classList.add("white");

}else{

square.classList.add("black");

}

square.dataset.x = x;
square.dataset.y = y;

var piece = boardState[y][x];

if(piece != ""){

square.innerText = getPieceSymbol(piece);

}

square.onclick = onSquareClick;

boardContainer.appendChild(square);

}

}

}



function getPieceSymbol(piece){

var symbols = {

"p":"♟",
"r":"♜",
"n":"♞",
"b":"♝",
"q":"♛",
"k":"♚",

"P":"♙",
"R":"♖",
"N":"♘",
"B":"♗",
"Q":"♕",
"K":"♔"

};

return symbols[piece];

}
