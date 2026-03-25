// 回合計時

var turnTimer = 60;

var timerInterval = null;



function startTurnTimer(){

clearInterval(timerInterval);

turnTimer = 60;

timerInterval = setInterval(function(){

turnTimer--;

if(turnTimer <= 0){

switchTurn();

sendBoardUpdate(boardState , currentTurn);

}

updateTimerDisplay();

},1000);

}



function updateTimerDisplay(){

var turnDisplay = document.getElementById("turnDisplay");

turnDisplay.innerText = turnDisplay.innerText + " | 剩餘時間: " + turnTimer;

}
