// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
     apiKey: "AIzaSyDxL7KzN_6XnYUg1KNkZaZm8Ry3HjczLwY",
     authDomain: "hus-oppgaver.firebaseapp.com",
     databaseURL: "https://hus-oppgaver-default-rtdb.firebaseio.com",
     projectId: "hus-oppgaver",
     storageBucket: "hus-oppgaver.appspot.com",
     messagingSenderId: "226057982465",
     appId: "1:226057982465:web:2b0c1bd1634a0f6f98e600",
     measurementId: "G-B6MMTHKWLE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };

