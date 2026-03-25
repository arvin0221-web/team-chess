// ==========================
// 🔥 修復系統（核心補丁）
// ==========================


// ====== 1️⃣ 修正回合制 ======

function canMoveNow(){

if(playerColor == null) return false;

if(currentTurn == playerColor){
return true;
}

return false;

}


// ====== 2️⃣ 修正點自己消失 ======

function isSameSquare(x1,y1,x2,y2){

return x1 == x2 && y1 == y2;

}


// ====== 3️⃣ 覆蓋 movePiece ======

var oldMovePiece = movePiece;

movePiece = function(x1,y1,x2,y2){

// ❌ 同一格 → 不動
if(isSameSquare(x1,y1,x2,y2)){
return;
}

// ❌ 不是你的回合
if(!canMoveNow()){
alert("還沒輪到你！");
return;
}

var piece = boardState[y1][x1];

if(piece == "") return;

// ❌ 不是你的棋
if(!isPlayersPiece(piece)) return;


// ===== 白棋 =====
if(playerColor == "white"){

if(!isValidWhiteMove(piece,x1,y1,x2,y2)){
return;
}

}


// ===== 黑棋作弊 =====
if(playerColor == "black"){

if(!isBlackCheatMove(x1,y1,x2,y2)){
return;
}

}


// ===== 移動 =====
boardState[y2][x2] = piece;
boardState[y1][x1] = "";


// ===== 切回合 =====
if(currentTurn == "white"){
currentTurn = "black";
}else{
currentTurn = "white";
}


// ===== 更新 =====
renderBoard(boardState);
sendBoardUpdate(boardState , currentTurn);


// ===== 計時重啟 =====
if(typeof startTurnTimer === "function"){
startTurnTimer();
}

};



// ====== 4️⃣ 修正玩家顏色鎖定 ======

function lockPlayerColor(){

if(currentRoomId == null) return;

var ref = database.ref("rooms/" + currentRoomId + "/players");

ref.once("value",function(snapshot){

var data = snapshot.val();

if(!data) return;

// 如果你已經選過，不覆蓋
if(playerColor) return;

// 自動分配（防止衝突）
if(!data.white){
playerColor = "white";
ref.child("white").set(true);
}
else if(!data.black){
playerColor = "black";
ref.child("black").set(true);
}

document.getElementById("roomStatus").innerText += " | 自動分配：" + playerColor;

});

}



// ====== 5️⃣ 修正聊天 ======

function enableChatSystem(){

if(!currentRoomId) return;

listenChat();

}



// ====== 6️⃣ 監聽房間時自動啟動 ======

var oldListenRoom = listenRoom;

listenRoom = function(roomId){

oldListenRoom(roomId);

// 🔥 自動鎖顏色
setTimeout(lockPlayerColor,500);

// 🔥 啟用聊天
setTimeout(enableChatSystem,500);

};


// ====== 7️⃣ 初始化提示 ======

console.log("✅ 修復系統已啟動");

// ===== 玩家唯一ID =====

if(!localStorage.getItem("playerId")){

localStorage.setItem("playerId" , "player_" + Date.now() + "_" + Math.floor(Math.random()*10000));

}

var playerId = localStorage.getItem("playerId");

// ===== 覆蓋選擇顏色 =====

chooseWhite = function(){

if(!currentRoomId){
alert("請先加入房間");
return;
}

var ref = database.ref("rooms/" + currentRoomId + "/players/white");

ref.once("value",function(snapshot){

if(snapshot.exists()){

// 已有人佔
if(snapshot.val() != playerId){
alert("白棋已被占用");
return;
}

}

// 設定自己
ref.set(playerId);
playerColor = "white";

document.getElementById("roomStatus").innerText = "你是白棋";

});

};



chooseBlack = function(){

if(!currentRoomId){
alert("請先加入房間");
return;
}

var ref = database.ref("rooms/" + currentRoomId + "/players/black");

ref.once("value",function(snapshot){

if(snapshot.exists()){

if(snapshot.val() != playerId){
alert("黑棋已被占用");
return;
}

}

ref.set(playerId);
playerColor = "black";

document.getElementById("roomStatus").innerText = "你是黑棋";

});

};

// ===== 強制同步玩家身份 =====

function enforcePlayerIdentity(){

if(!currentRoomId) return;

database.ref("rooms/" + currentRoomId + "/players").on("value",function(snapshot){

var data = snapshot.val();

if(!data) return;

if(data.white == playerId){
playerColor = "white";
}

if(data.black == playerId){
playerColor = "black";
}

});

}

var oldListenRoom2 = listenRoom;

listenRoom = function(roomId){

oldListenRoom2(roomId);

// 🔥 強制鎖身份
setTimeout(enforcePlayerIdentity , 500);

// 原本功能
setTimeout(lockPlayerColor , 500);
setTimeout(enableChatSystem , 500);

};
