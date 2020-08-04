import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyByBPM4Gn-9tFt8J-ZGQr4s_kFWFgfzzPs",
  authDomain: "umkm-srondolkulon.firebaseapp.com",
  databaseURL: "https://umkm-srondolkulon.firebaseio.com",
  projectId: "umkm-srondolkulon",
  storageBucket: "umkm-srondolkulon.appspot.com",
  messagingSenderId: "836654582400",
  appId: "1:836654582400:web:8bdccdd400a45a5c373465"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();

  export {firebaseApp, db}