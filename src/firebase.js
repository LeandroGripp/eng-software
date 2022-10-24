import { initializeApp } from "firebase/app";
import {
  getAuth,
} from "firebase/auth";
import {
  getFirestore,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA3miyWlZVvMZkIYRDiSybZUmOLZB0lObk",
  authDomain: "notable-60ca1.firebaseapp.com",
  projectId: "notable-60ca1",
  storageBucket: "notable-60ca1.appspot.com",
  messagingSenderId: "523143067655",
  appId: "1:523143067655:web:96def5c10104ea902252a2"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export {
  auth,
  db,
};