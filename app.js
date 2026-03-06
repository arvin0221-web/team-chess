let board = null;
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

const chess = new Chess();

let roomId = "";
let role = "";
let lastWhiteMovedPiece = null;

const turnOrder = ["black", "whiteA", "whiteB"];

function createRoom() {
  roomId = document.getElementById("roomInput").value;
  role = "black";

  function createRoom() {
  roomId = document.getElementById("roomInput").value;

  if (!roomId) {
    alert("請輸入房間代碼");
    return;
  }

  role = "black";

  db.ref("rooms/" + roomId).set({
    fen: chess.fen(),
    turnIndex: 0,
    lastWhiteMovedPiece: null,
    players: {
      black: true
    }
  }).then(() => {
    alert("房間建立成功，你是 black");
    listenRoom();
  });
  }

  listenRoom();
}

function joinRoom() {
  roomId = document.getElementById("roomInput").value;

  if (!roomId) {
    alert("請輸入房間代碼");
    return;
  }

  db.ref("rooms/" + roomId).once("value").then(snapshot => {

    if (!snapshot.exists()) {
      alert("房間不存在");
      return;
    }

    let data = snapshot.val();
    let players = data.players || {};

    if (!players.whiteA) role = "whiteA";
    else if (!players.whiteB) role = "whiteB";
    else {
      alert("房間已滿");
      return;
    }

    db.ref("rooms/" + roomId + "/players/" + role).set(true)
      .then(() => {
        alert("加入成功，你是 " + role);
        listenRoom();
      });
  });
}

function listenRoom() {
  db.ref("rooms/" + roomId).on("value", snapshot => {
    let data = snapshot.val();
    if (!data) return;

    chess.load(data.fen);
    board.position(data.fen);
    lastWhiteMovedPiece = data.lastWhiteMovedPiece;

    document.getElementById("turnDisplay").innerText =
      "目前回合: " + turnOrder[data.turnIndex];
  });
}

function makeMove(from, to) {
  db.ref("rooms/" + roomId).once("value").then(snapshot => {
    let data = snapshot.val();
    let currentTurn = turnOrder[data.turnIndex];

    if (currentTurn !== role) return;

    if ((role === "whiteA" || role === "whiteB") &&
        from === data.lastWhiteMovedPiece) {
      alert("白方不能連續動同一隻棋");
      return;
    }

    let move = chess.move({ from, to });

    if (move) {
      let newTurnIndex = (data.turnIndex + 1) % 3;

      db.ref("rooms/" + roomId).update({
        fen: chess.fen(),
        turnIndex: newTurnIndex,
        lastWhiteMovedPiece:
          role.startsWith("white") ? from : null
      });
    }
  });
}
window.onload = function() {

  board = Chessboard('board', {
    draggable: true,
    position: 'start',
    onDrop: function (source, target) {

      if (!roomId) return 'snapback';

      db.ref("rooms/" + roomId).once("value").then(snapshot => {
        let data = snapshot.val();
        if (!data) return 'snapback';

        let currentTurn = turnOrder[data.turnIndex];

        if (currentTurn !== role) return 'snapback';

        if ((role === "whiteA" || role === "whiteB") &&
            source === data.lastWhiteMovedPiece) {
          alert("白方不能連續動同一隻棋");
          return 'snapback';
        }

        let move = chess.move({
          from: source,
          to: target,
          promotion: 'q'
        });

        if (move === null) return 'snapback';

        let newTurnIndex = (data.turnIndex + 1) % 3;

        db.ref("rooms/" + roomId).update({
          fen: chess.fen(),
          turnIndex: newTurnIndex,
          lastWhiteMovedPiece:
            role.startsWith("white") ? source : null
        });
      });

    }
  });

};
