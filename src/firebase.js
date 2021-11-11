import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyA1u2FeKwaI6D5fGhysPrzk4WOdOeWQQsM",
    authDomain: "fortunelands-180156.firebaseapp.com",
    projectId: "fortunelands-180156",
    storageBucket: "fortunelands-180156.appspot.com",
    messagingSenderId: "291736909374",
    appId: "1:291736909374:web:5c6e381e7a7a978dacc36f",
    measurementId: "G-Q3THJQ83RZ"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

const db= firebaseApp.database();
const auth = firebase.auth();
const storage = firebase.storage();


export {db,auth,storage}