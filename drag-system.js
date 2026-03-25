// 拖曳系統

function onSquareClick(){

var x = parseInt(this.dataset.x);
var y = parseInt(this.dataset.y);

if(selectedSquare == null){

selectedSquare = {

x:x,
y:y

};

highlightSquare(x,y);

return;

}

movePiece(selectedSquare.x , selectedSquare.y , x , y);

selectedSquare = null;

clearHighlights();

}



function highlightSquare(x,y){

var squares = document.querySelectorAll(".square");

squares.forEach(function(s){

var sx = parseInt(s.dataset.x);
var sy = parseInt(s.dataset.y);

if(sx == x && sy == y){

s.classList.add("highlight");

}

});

}



function clearHighlights(){

var squares = document.querySelectorAll(".square");

squares.forEach(function(s){

s.classList.remove("highlight");

});

}
