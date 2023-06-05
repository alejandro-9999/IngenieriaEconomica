// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPlGUqjZKwAc78JCQkbszaqIwT2bnSTr4",
  authDomain: "ingenieria-economica-777ab.firebaseapp.com",
  projectId: "ingenieria-economica-777ab",
  storageBucket: "ingenieria-economica-777ab.appspot.com",
  messagingSenderId: "756400771445",
  appId: "1:756400771445:web:20a7f2373ac05898cdc33c",
  measurementId: "G-SHH9PW6D1N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
