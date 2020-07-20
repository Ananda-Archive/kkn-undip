import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyDPo_JsSyYbvvogq2Fje7FhvCcOF7KZiXg",
    authDomain: "kkn-srondol-kulon.firebaseapp.com",
    databaseURL: "https://kkn-srondol-kulon.firebaseio.com",
    projectId: "kkn-srondol-kulon",
    storageBucket: "kkn-srondol-kulon.appspot.com",
    messagingSenderId: "90464876051",
    appId: "1:90464876051:web:13874579f1a11b7fea31e6",
    measurementId: "G-XG4ZW3FDG8"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();

  export {firebaseApp, db}