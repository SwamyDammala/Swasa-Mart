import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLKGWGWZZB2FQPJlvz-HIHa0MSPTSP1Cs",
  authDomain: "swasa-mart.firebaseapp.com",
  projectId: "swasa-mart",
  storageBucket: "swasa-mart.appspot.com",
  messagingSenderId: "203851010707",
  appId: "1:203851010707:web:9f8651d2af38c71db1b366",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
