import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoWwl1DxQa3qoX-PmvQe5sqiybzkXYNug",
  authDomain: "artefice-bloorsoft.firebaseapp.com",
  projectId: "artefice-bloorsoft",
  storageBucket: "artefice-bloorsoft.appspot.com",
  messagingSenderId: "244209947040",
  appId: "1:244209947040:web:247853eaaecc4450e894c5",
  measurementId: "G-89KSWYHQ53"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)