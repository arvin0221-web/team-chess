// 房間系統模組

var currentRoomId = null;
var playerColor = null;

var roomStatusText = document.getElementById("roomStatus");

var createRoomButton = document.getElementById("createRoomBtn");
var joinRoomButton = document.getElementById("joinRoomBtn");

var chooseWhiteButton = document.getElementById("chooseWhiteBtn");
var chooseBlackButton = document.getElementById("chooseBlackBtn");

var roomInput = document.getElementById("roomInput");



// 生成房間ID
function generateRoomId(){

var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

var result = "";

for(var i = 0 ; i < 6 ; i++){

var randomIndex = Math.floor(Math.random() * chars.length);

result += chars[randomIndex];

}

return result;

}



// 創建房間
function createRoom(){

var newRoomId = generateRoomId();

currentRoomId = newRoomId;

var roomData = {

board: null,

turn: "white",

players: {

white: null,
black: null

},

createdTime: Date.now(),

chat: {}

};

database.ref("rooms/" + newRoomId).set(roomData);

roomStatusText.innerText = "房間建立成功 房間ID: " + newRoomId;

listenRoom(newRoomId);

}



// 加入房間
function joinRoom(){

var inputRoom = roomInput.value;

if(inputRoom == ""){

alert("請輸入房間ID");

return;

}

currentRoomId = inputRoom;

roomStatusText.innerText = "嘗試加入房間 " + inputRoom;

listenRoom(inputRoom);

}



// 玩家選擇白棋
function chooseWhite(){

if(currentRoomId == null){

alert("請先加入房間");

return;

}

database.ref("rooms/" + currentRoomId + "/players/white").set(true);

playerColor = "white";

roomStatusText.innerText = "你是白棋";

}



// 玩家選擇黑棋
function chooseBlack(){

if(currentRoomId == null){

alert("請先加入房間");

return;

}

database.ref("rooms/" + currentRoomId + "/players/black").set(true);

playerColor = "black";

roomStatusText.innerText = "你是黑棋";

}



// 綁定按鈕
createRoomButton.onclick = createRoom;
joinRoomButton.onclick = joinRoom;

chooseWhiteButton.onclick = chooseWhite;
chooseBlackButton.onclick = chooseBlack;
