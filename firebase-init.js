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

// 建立資料庫物件
var database = firebase.database();


// 全域輸出
window.database = database;
