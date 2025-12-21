import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInAnonymously, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, onSnapshot, increment, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCRDoOpYiyTHURxLhcq9adRX9__djYj_J0",
    authDomain: "news-d6614.firebaseapp.com",
    projectId: "news-d6614",
    storageBucket: "news-d6614.firebasestorage.app",
    messagingSenderId: "818748521624",
    appId: "1:818748521624:web:4afd501bc7991464d724ed",
    measurementId: "G-TG0CW4PZXF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = "news-d6614-main";

export const initAuth = async () => {
    if (!auth.currentUser) return await signInAnonymously(auth);
    return auth.currentUser;
};

export { 
    auth, db, appId, onAuthStateChanged, collection, doc, getDoc, getDocs, 
    addDoc, updateDoc, deleteDoc, query, onSnapshot, increment, setDoc, 
    serverTimestamp, signInWithEmailAndPassword, signOut 
};
