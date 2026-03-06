const firebaseConfig = {
  apiKey: "AIzaSyDzIXHlM0TyySFC7qNOsvFaD1X7uk58HXs",
  authDomain: "team-chess-2989a.firebaseapp.com",
  projectId: "team-chess-2989a",
  storageBucket: "team-chess-2989a.firebasestorage.app",
  messagingSenderId: "562832397441",
  appId: "1:562832397441:web:f98d61763cb8b1ac19e980",
  measurementId: "G-D9340S9MH1",
  databaseURL: "https://team-chess-2989a-default-rtdb.firebaseio.com"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.database();

let roomId=null;
let playerColor=null;
let board=[];
let selected=null;

const pieces={
r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",p:"♟",
R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔",P:"♙"
};

function initBoard(){

board=[

["r","n","b","q","k","b","n","r"],
["p","p","p","p","p","p","p","p"],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["P","P","P","P","P","P","P","P"],
["R","N","B","Q","K","B","N","R"]

];

}

function drawBoard(){

const boardDiv=document.getElementById("board");
boardDiv.innerHTML="";

for(let y=0;y<8;y++){

for(let x=0;x<8;x++){

const s=document.createElement("div");

s.className="square "+((x+y)%2?"black":"white");

s.dataset.x=x;
s.dataset.y=y;

const p=board[y][x];

if(p) s.innerText=pieces[p];

s.onclick=clickSquare;

boardDiv.appendChild(s);

}

}

}

function clickSquare(){

if(!playerColor)return;

const x=parseInt(this.dataset.x);
const y=parseInt(this.dataset.y);

if(selected==null){

selected={x,y};

return;

}

movePiece(selected.x,selected.y,x,y);

selected=null;

}

function movePiece(x1,y1,x2,y2){

const piece=board[y1][x1];

if(!piece)return;

if(playerColor=="white" && piece==piece.toLowerCase())return;
if(playerColor=="black" && piece==piece.toUpperCase())return;

if(playerColor=="black"){

board[y2][x2]=piece;
board[y1][x1]="";

}else{

if(!isLegalWhiteMove(x1,y1,x2,y2,piece))return;

board[y2][x2]=piece;
board[y1][x1]="";

}

updateBoard();

}

function isLegalWhiteMove(x1,y1,x2,y2,p){

const dx=Math.abs(x2-x1);
const dy=Math.abs(y2-y1);

p=p.toUpperCase();

if(p=="P"){

if(x1==x2 && y2==y1-1)return true;

}

if(p=="R"){

if(x1==x2 || y1==y2)return true;

}

if(p=="B"){

if(dx==dy)return true;

}

if(p=="Q"){

if(dx==dy || x1==x2 || y1==y2)return true;

}

if(p=="N"){

if((dx==1&&dy==2)||(dx==2&&dy==1))return true;

}

if(p=="K"){

if(dx<=1 && dy<=1)return true;

}

return false;

}

function createRoom(){

roomId=Math.random().toString(36).substring(2,7);

initBoard();

db.ref("rooms/"+roomId).set({
board:board
});

listenRoom();

document.getElementById("status").innerText="房間ID: "+roomId;

}

function joinRoom(){

roomId=document.getElementById("roomInput").value;

listenRoom();

document.getElementById("status").innerText="加入房間 "+roomId;

}

function chooseColor(c){

playerColor=c;

document.getElementById("status").innerText+=" | 你是 "+c;

}

function listenRoom(){

db.ref("rooms/"+roomId).on("value",(snap)=>{

const data=snap.val();

if(!data)return;

board=data.board;

drawBoard();

});

}

function updateBoard(){

db.ref("rooms/"+roomId).update({
board:board
});

}

initBoard();
drawBoard();
