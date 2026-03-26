import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCA774d4JHT38HYyOFJQ4A0SML993KJJKA",
  authDomain: "finaltrip-599a4.firebaseapp.com",
  projectId: "finaltrip-599a4",
  storageBucket: "finaltrip-599a4.firebasestorage.app",
  messagingSenderId: "210497992473",
  appId: "1:210497992473:web:a20c6dce08ed00a5953788",
  measurementId: "G-1GM2VTRSJG"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
