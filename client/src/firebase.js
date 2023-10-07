import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-e3152.firebaseapp.com",
  projectId: "real-estate-e3152",
  storageBucket: "real-estate-e3152.appspot.com",
  messagingSenderId: "625096002654",
  appId: "1:625096002654:web:1fe9af8507ef84c3ddf8cf"
};

export const app = initializeApp(firebaseConfig);