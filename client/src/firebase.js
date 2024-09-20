// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE,
  authDomain: "mern-blog--auth-57390.firebaseapp.com",
  projectId: "mern-blog--auth-57390",
  storageBucket: "mern-blog--auth-57390.appspot.com",
  messagingSenderId: "54327389493",
  appId: "1:54327389493:web:513d0cb519044c859fb07c"
};

// Initialize Firebasee
export const app = initializeApp(firebaseConfig);