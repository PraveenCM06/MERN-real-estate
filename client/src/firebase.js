// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//VITE_FIREBASE_API_KEY = "AIzaSyD5JFQSVrWJYMqMaW33eEgkQY2ACRwRt1U"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-estate-f5702.firebaseapp.com",
  projectId: "mern-real-estate-f5702",
  storageBucket: "mern-real-estate-f5702.appspot.com",
  messagingSenderId: "697589638863",
  appId: "1:697589638863:web:12c5ecd3a04883dd9379ba"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);