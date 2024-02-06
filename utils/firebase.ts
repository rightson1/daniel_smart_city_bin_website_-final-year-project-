import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "daniel-94fd9.firebaseapp.com",
  projectId: "daniel-94fd9",
  storageBucket: "daniel-94fd9.appspot.com",
  messagingSenderId: "683392866358",
  appId: "1:683392866358:web:7a4ba1774e947a1ad7a097",
};

const app = initializeApp(firebaseConfig, {});
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
