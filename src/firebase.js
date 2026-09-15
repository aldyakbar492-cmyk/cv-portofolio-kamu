import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAULVBFawTZ1yaewYsH4tdq5bvq2_wh1dY",
  authDomain: "cv-portfolio-system-imvash.firebaseapp.com",
  projectId: "cv-portfolio-system-imvash",
  storageBucket: "cv-portfolio-system-imvash.firebasestorage.app",
  messagingSenderId: "939404750177",
  appId: "1:939404750177:web:1156bb96161fdac9c8a920",
  measurementId: "G-TZZRVDDZWF"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;