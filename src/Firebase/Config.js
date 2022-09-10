// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBglPTrbSLSaooY3KJJifm9q9LIZkbo5jA",
    authDomain: "roommate-finder-30a35.firebaseapp.com",
    projectId: "roommate-finder-30a35",
    storageBucket: "roommate-finder-30a35.appspot.com",
    messagingSenderId: "1014472257964",
    appId: "1:1014472257964:web:5a90dd0eefac043ed5ca09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;