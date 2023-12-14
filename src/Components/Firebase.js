
import { initializeApp } from "firebase/app"

import {getAuth} from 'firebase/auth'

import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA3i1t51w5qfZIJEXiG6kgkkwOu9vR94Rs",
  authDomain: "moviedb-6a6c3.firebaseapp.com",
  projectId: "moviedb-6a6c3",
  storageBucket: "moviedb-6a6c3.appspot.com",
  messagingSenderId: "124646915973",
  appId: "1:124646915973:web:b6cde1e7c4850e6e120eec",
  measurementId: "G-45FZ80QCYE"
};


  const App = initializeApp(firebaseConfig)

  export const  auth = getAuth(App) 
  export const db = getFirestore(App)
   export const database = getFirestore(App)