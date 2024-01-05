import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyACH112rbKjZT_hW0fSdtIqxW8GdB_Kb_Q",
  authDomain: "labour-link-4cb81.firebaseapp.com",
  projectId: "labour-link-4cb81",
  storageBucket: "labour-link-4cb81.appspot.com",
  messagingSenderId: "362466852690",
  appId: "1:362466852690:web:e9eef5054adf316a07848b",
  measurementId: "G-1KXBZTMLPH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app;