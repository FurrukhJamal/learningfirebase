import { initializeApp } from 'firebase/app';
//import * as firebase from 'firebase';
//import '@firebase/auth';
//import '@firebase/firestore';

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";
import { getFirestore } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBkYzzfw1K61HAknCIB7gy_bfM9gP36IGk",
    authDomain: "oddjobs-test.firebaseapp.com",
    databaseURL: "https://oddjobs-test.firebaseio.com",
    projectId: "oddjobs-test",
    storageBucket: "oddjobs-test.appspot.com",
    messagingSenderId: "720777998625",
    appId: "1:720777998625:web:5dce6843847a268324ce60",
    measurementId: "G-HSV12WDPK3"
  };
  
  // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);

//let app;
// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }

const app = initializeApp(firebaseConfig)
const db = getFirestore()
export{ app, db }