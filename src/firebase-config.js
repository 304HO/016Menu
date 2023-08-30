import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkxjvTGvE-ZThMZeQHjxBUsYRauvMpt_w",
  authDomain: "menu-25648.firebaseapp.com",
  projectId: "menu-25648",
  storageBucket: "menu-25648.appspot.com",
  messagingSenderId: "276878701002",
  appId: "1:276878701002:web:443ae1669633c87123df33",
  measurementId: "G-C003EQVJZC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
