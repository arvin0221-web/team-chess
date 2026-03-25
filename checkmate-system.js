// 將軍系統

function findKing(color){

for(var y = 0 ; y < 8 ; y++){

for(var x = 0 ; x < 8 ; x++){

var piece = boardState[y][x];

if(color == "white" && piece == "K"){

return {x:x,y:y};

}

if(color == "black" && piece == "k"){

return {x:x,y:y};

}

}

}

return null;

}



function isKingInCheck(color){

var king = findKing(color);

if(king == null){

return false;

}

for(var y = 0 ; y < 8 ; y++){

for(var x = 0 ; x < 8 ; x++){

var piece = boardState[y][x];

if(piece == "") continue;

if(color == "white" && piece === piece.toLowerCase()){

if(canPieceAttack(x,y,king.x,king.y)){

return true;

}

}

if(color == "black" && piece === piece.toUpperCase()){

if(canPieceAttack(x,y,king.x,king.y)){

return true;

}

}

}

}

return false;

}



function canPieceAttack(x1,y1,x2,y2){

var piece = boardState[y1][x1];

var dx = Math.abs(x2-x1);
var dy = Math.abs(y2-y1);

piece = piece.toUpperCase();

if(piece=="R"){

if(x1==x2 || y1==y2) return true;

}

if(piece=="B"){

if(dx==dy) return true;

}

if(piece=="Q"){

if(dx==dy || x1==x2 || y1==y2) return true;

}

if(piece=="N"){

if(dx==1 && dy==2) return true;
if(dx==2 && dy==1) return true;

}

if(piece=="K"){

if(dx<=1 && dy<=1) return true;

}

return false;

}
