// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJPeBSqbF1KDS8ygKrq7tQy8GmrVPL9zA",
  authDomain: "threads-53d29.firebaseapp.com",
  projectId: "threads-53d29",
  storageBucket: "threads-53d29.appspot.com",
  messagingSenderId: "649979958209",
  appId: "1:649979958209:web:168996bfa5a41afea55540",
  measurementId: "G-6YYN0MZSJH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
