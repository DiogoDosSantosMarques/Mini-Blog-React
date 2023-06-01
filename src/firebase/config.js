// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBHDxapi3En7RECbNDbuTymhpciBz_9G9E",
  authDomain: "daylly-blog-react.firebaseapp.com",
  projectId: "daylly-blog-react",
  storageBucket: "daylly-blog-react.appspot.com",
  messagingSenderId: "1013120571974",
  appId: "1:1013120571974:web:fe4d35adbde71dc61cc847",
  measurementId: "G-7X8TNGTBKQ"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);




export { db };


