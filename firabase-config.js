// Import fungsi yang dibutuhkan dari SDK Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";

// Konfigurasi Firebase aplikasi web Anda
// Pastikan data berikut sesuai dengan proyek Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyAOKOMk2H6-mRY0zu0THAabUpwQ1kTadZ4",
  authDomain: "nilai-input-mahasiswa-decc9.firebaseapp.com",
  projectId: "nilai-input-mahasiswa-decc9",
  storageBucket: "nilai-input-mahasiswa-decc9.appspot.com",
  messagingSenderId: "125442172771",
  appId: "1:125442172771:web:e4a15d15873dd52f956",
  measurementId: "G-PM7S4HLEQ0"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log("🔥 Firebase berhasil terhubung!");
export { db, collection, addDoc, getDocs, deleteDoc, doc };
