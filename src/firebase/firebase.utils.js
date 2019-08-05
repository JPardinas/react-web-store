import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA3llZziU1YcN0TemCobzaHzYuPMobVTxE",
  authDomain: "react-shop-website.firebaseapp.com",
  databaseURL: "https://react-shop-website.firebaseio.com",
  projectId: "react-shop-website",
  storageBucket: "",
  messagingSenderId: "812882359322",
  appId: "1:812882359322:web:765063542ae5f475"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
