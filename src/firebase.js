import firebase from "firebase";

var firebaseConfig = {
  
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();

  export {firebaseApp, db}
