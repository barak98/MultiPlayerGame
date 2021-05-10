import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBJG5rNAzq5OjHPMGosNQFQl8MyC1D4kOs",
  authDomain: "myfirstproject-686a3.firebaseapp.com",
  projectId: "myfirstproject-686a3",
  storageBucket: "myfirstproject-686a3.appspot.com",
  messagingSenderId: "446970742606",
  appId: "1:446970742606:web:8c6627be4c52e8860ec01f",
  measurementId: "G-H3BRR96C11"
});

export const auth = app.auth()
export default app;
