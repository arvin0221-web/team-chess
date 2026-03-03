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

  db.ref("rooms/" + roomId).set({
    fen: chess.fen(),
    turnIndex: 0,
    lastWhiteMovedPiece: null
  });

  listenRoom();
}

function joinRoom() {
  roomId = document.getElementById("roomInput").value;

  db.ref("rooms/" + roomId + "/players").once("value").then(snapshot => {
    let players = snapshot.val() || {};
    if (!players.whiteA) role = "whiteA";
    else role = "whiteB";

    db.ref("rooms/" + roomId + "/players/" + role).set(true);
    listenRoom();
  });
}

function listenRoom() {
  db.ref("rooms/" + roomId).on("value", snapshot => {
    let data = snapshot.val();
    if (!data) return;

    chess.load(data.fen);
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
