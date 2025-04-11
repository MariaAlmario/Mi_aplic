// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Configuración
const firebaseConfig = {
  apiKey: "AIzaSyAjqBF6CZgbby16cTK7L8l4sD_B1wgp4NU",
  authDomain: "lorem-f90ca.firebaseapp.com",
  projectId: "lorem-f90ca",
  storageBucket: "lorem-f90ca.firebasestorage.app",
  messagingSenderId: "633968262603",
  appId: "1:633968262603:web:254db33ab7b23f75628a4e"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };
