import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyASgoTtFKGHAOf9jMRgDk9w0jYvXeslEnw",
  authDomain: "forum-domoustache.firebaseapp.com",
  projectId: "forum-domoustache",
  storageBucket: "forum-domoustache.firebasestorage.app",
  messagingSenderId: "609863036952",
  appId: "1:609863036952:web:0bd971da4f4db16bf7d36d",
  measurementId: "G-ESREQB30TB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);