// 網路同步模組

var currentBoardData = null;

var turnDisplay = document.getElementById("turnDisplay");



// 監聽房間
function listenRoom(roomId){

database.ref("rooms/" + roomId).on("value", function(snapshot){

var data = snapshot.val();

if(data == null){

return;

}

currentBoardData = data.board;

updateTurnDisplay(data.turn);

if(data.board != null){

updateBoardFromNetwork(data.board);

}

});

}



// 更新回合顯示
function updateTurnDisplay(turn){

if(turn == "white"){

turnDisplay.innerText = "現在回合：白棋";

}

if(turn == "black"){

turnDisplay.innerText = "現在回合：黑棋";

}

}



// 更新棋盤
function updateBoardFromNetwork(boardData){

if(typeof renderBoard === "function"){

renderBoard(boardData);

}

}



// 傳送棋盤更新
function sendBoardUpdate(boardData , nextTurn){

if(currentRoomId == null){

return;

}

database.ref("rooms/" + currentRoomId).update({

board: boardData,

turn: nextTurn

});

}



// 傳送聊天
function sendChatMessage(message){

var chatId = "msg_" + Date.now();

database.ref("rooms/" + currentRoomId + "/chat/" + chatId).set({

text: message,

time: Date.now(),

player: playerColor

});

}



// 監聽聊天
function listenChat(){

database.ref("rooms/" + currentRoomId + "/chat").on("child_added", function(snapshot){

var msg = snapshot.val();

addChatMessage(msg.player , msg.text);

});

}
