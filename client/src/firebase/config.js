// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzQmVilyOgT4w86IIx8lGjB82R9IVPHL8",
  authDomain: "ceylon-odyessey.firebaseapp.com",
  projectId: "ceylon-odyessey",
  storageBucket: "ceylon-odyessey.appspot.com",
  messagingSenderId: "66673984556",
  appId: "1:66673984556:web:cc79b6d304acb7460f3d89",
  measurementId: "G-7Q7SYQDT23",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
