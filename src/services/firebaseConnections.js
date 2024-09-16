import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDjzzGddkTB3AiICe-FNkZEISxWGtA9RLw",
    authDomain: "tickets-e0fc7.firebaseapp.com",    
    projectId: "tickets-e0fc7",
    storageBucket: "tickets-e0fc7.appspot.com",
    messagingSenderId: "674909253328",
    appId: "1:674909253328:web:8a396ec6328d2d664938d5",
    measurementId: "G-DK7YZE7D5G"
  };


  const firebaseApp = initializeApp(firebaseConfig)

  const auth =getAuth(firebaseApp)
  const db = getFirestore(firebaseApp)
  const storage = getStorage(firebaseApp)

  export {auth,db,storage}