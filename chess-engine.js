// 棋規引擎

function movePiece(x1 , y1 , x2 , y2){

var piece = boardState[y1][x1];
var target = boardState[y2][x2];

// ❌ 禁止吃自己
if(target != ""){

if(playerColor == "white" && target === target.toUpperCase()){
return;
}

if(playerColor == "black" && target === target.toLowerCase()){
return;
}

}

if(piece == ""){

return;

}

if(!isPlayersPiece(piece)){

return;

}

if(playerColor == "white"){

if(!isValidWhiteMove(piece , x1 , y1 , x2 , y2)){

return;

}

}

if(playerColor == "black"){

// 黑棋作弊

// 可以直接飛到任意格

}

boardState[y2][x2] = piece;

boardState[y1][x1] = "";

switchTurn();

renderBoard(boardState);

sendBoardUpdate(boardState , currentTurn);

}



function isPlayersPiece(piece){

if(playerColor == "white"){

return piece === piece.toUpperCase();

}

if(playerColor == "black"){

return piece === piece.toLowerCase();

}

return false;

}



function switchTurn(){

if(currentTurn == "white"){

currentTurn = "black";

}else{

currentTurn = "white";

}

}



function isValidWhiteMove(piece , x1 , y1 , x2 , y2){

piece = piece.toUpperCase();

var dx = Math.abs(x2 - x1);
var dy = Math.abs(y2 - y1);

if(piece == "P"){

if(x1 == x2 && y2 == y1 - 1){

return true;

}

}

if(piece == "R"){

if(x1 == x2 || y1 == y2){

return true;

}

}

if(piece == "B"){

if(dx == dy){

return true;

}

}

if(piece == "Q"){

if(dx == dy || x1 == x2 || y1 == y2){

return true;

}

}

if(piece == "N"){

if(dx == 1 && dy == 2){

return true;

}

if(dx == 2 && dy == 1){

return true;

}

}

if(piece == "K"){

if(dx <= 1 && dy <= 1){

return true;

}

}

return false;

}
