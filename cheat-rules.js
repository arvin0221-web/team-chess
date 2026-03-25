// 黑棋作弊規則

function isBlackCheatMove(x1 , y1 , x2 , y2){

// 黑棋可以飛到任意格
// 但不能飛到自己棋子上

var target = boardState[y2][x2];

if(target != ""){

if(target === target.toLowerCase()){

return false;

}

}

return true;

}
