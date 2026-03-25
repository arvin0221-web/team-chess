// 主程式

var currentTurn = "white";



function startGame(){

createInitialBoard();

renderBoard(boardState);

}



function restartGame(){

createInitialBoard();

renderBoard(boardState);

if(currentRoomId){

sendBoardUpdate(boardState , "white");

}

}



document.getElementById("restartGameBtn").onclick = restartGame;



window.onload = function(){

startGame();

};
