// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBAuxS6YUMnkm92LfOPG-IypkeM-zJEnSg",
    authDomain: "roombuddy-359212.firebaseapp.com",
    projectId: "roombuddy-359212",
    storageBucket: "roombuddy-359212.appspot.com",
    messagingSenderId: "300354566042",
    appId: "1:300354566042:web:2d480554c6fddb903cec23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();


export default app;