import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAY07hZlcV-5Csx0mwbEL2t_FcI9hspZT4",
  authDomain: "music-9af31.firebaseapp.com",
  projectId: "music-9af31",
  storageBucket: "music-9af31.appspot.com",
  appId: "1:191416273812:web:0f3058cd8a1007c2f39d81",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

db.enablePersistence().catch((error) => {
  console.log(`Firebase persistence error ${error.code}`);
});

const usersCollection = db.collection("users");
const songsCollection = db.collection("songs");
const commentsCollection = db.collection("comments");

// eslint-disable-next-line
export { auth, usersCollection, songsCollection, storage, commentsCollection };
