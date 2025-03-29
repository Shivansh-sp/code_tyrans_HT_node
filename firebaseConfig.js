// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFrsZ6PsqYehbjorNyggyltaR_IUCHpIw",
  authDomain: "serene-mind-86266.firebaseapp.com",
  projectId: "serene-mind-86266",
  storageBucket: "serene-mind-86266.firebasestorage.app",
  messagingSenderId: "55531768602",
  appId: "1:55531768602:web:9b8b7ed9f55bc7f0e8faa3",
  measurementId: "G-KKD4CS7MXL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);