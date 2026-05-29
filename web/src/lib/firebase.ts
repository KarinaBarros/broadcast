import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDB_LVWDQoPEOXOcNuOO5lmNFzFJ33yNw",
  authDomain: "broadcast-415db.firebaseapp.com",
  projectId: "broadcast-415db",
  storageBucket: "broadcast-415db.firebasestorage.app",
  messagingSenderId: "850057808362",
  appId: "1:850057808362:web:579093a6e495a95d144a93",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);