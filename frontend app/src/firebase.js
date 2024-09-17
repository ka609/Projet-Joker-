// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Importer le module d'authentification
import { getFirestore,} from "firebase/firestore"; // Importer Firestore
import { getAnalytics } from "firebase/analytics";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD86bGdUP1UQIHEiFC36q2bEBASMHsmd8g",
  authDomain: "datafire-d4025.firebaseapp.com",
  projectId: "datafire-d4025",
  storageBucket: "datafire-d4025.appspot.com",
  messagingSenderId: "208771689179",
  appId: "1:208771689179:web:42b6a8c68813fa7a61bafe",
  measurementId: "G-WPTP43VH3G"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser les services Firebase
const auth = getAuth(app);  // Initialiser et exporter le module d'authentification
const db = getFirestore(app);  // Initialiser et exporter Firestore
const analytics = getAnalytics(app);

export { auth, db, analytics };
