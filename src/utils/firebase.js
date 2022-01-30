// Import the functions you need from the SDKs you need
import firebase from 'firebase'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrGixsKyAQBW0oZQl8S_7iVP51UdKQZLo",
  authDomain: "mychat-5fe8d.firebaseapp.com",
  projectId: "mychat-5fe8d",
  storageBucket: "mychat-5fe8d.appspot.com",
  messagingSenderId: "794609494151",
  appId: "1:794609494151:web:6b55bc7e904915a3573022",
  measurementId: "G-KB866EKF53"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export default app