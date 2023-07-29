// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,signOut,GoogleAuthProvider,sendPasswordResetEmail,onAuthStateChanged,ActionCodeSettings} from 'firebase/auth';
import {getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';
import {getStorage,ref} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdQU1vR14zriEAq_tePBGJmhSmo3Sp8vg",
  authDomain: "gamehub-d2555.firebaseapp.com",
  projectId: "gamehub-d2555",
  storageBucket: "gamehub-d2555.appspot.com",
  messagingSenderId: "875495955443",
  appId: "1:875495955443:web:e6a533a59ee116ab95d086"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Data base
export const database = getFirestore(app);
//auth
export const auth = getAuth(app);
// Google SignIn
export const Provider = new GoogleAuthProvider(app); 
// Storage
export const Storage =getStorage();

export {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  deleteDoc,
}