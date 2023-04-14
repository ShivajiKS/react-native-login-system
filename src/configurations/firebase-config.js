import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyA4cAwETQNZGmP5UtSd3slwMpXJ9gaU9-4",
    authDomain: "login-system-97018.firebaseapp.com",
    projectId: "login-system-97018",
    storageBucket: "login-system-97018.appspot.com",
    messagingSenderId: "162838724472",
    appId: "1:162838724472:web:29ebd52ea25d94a7a9d28d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }