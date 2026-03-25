// 聊天系統

var chatInput = document.getElementById("chatInput");

var sendChatButton = document.getElementById("sendChatBtn");

var chatMessages = document.getElementById("chatMessages");



function addChatMessage(player , message){

var line = document.createElement("div");

line.innerText = player + ": " + message;

chatMessages.appendChild(line);

chatMessages.scrollTop = chatMessages.scrollHeight;

}



function sendChat(){

var text = chatInput.value;

if(text == "") return;

sendChatMessage(text);

chatInput.value = "";

}



sendChatButton.onclick = sendChat;
