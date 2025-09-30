import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// configuracion developtment de firebase
const developmentConfig = {
  apiKey: 'AIzaSyAnN2vVZb7Zfvo3RZLCIxyhtU47ObVDtTQ',
  authDomain: 'db-hojas-observaciones.firebaseapp.com',
  projectId: 'db-hojas-observaciones',
  storageBucket: 'db-hojas-observaciones.firebasestorage.app',
  messagingSenderId: '456727269655',
  appId: '1:456727269655:web:6e6f6258bc973cf6da2752'
}

// initizalice firebase
const app = initializeApp(developmentConfig)
export const db = getFirestore(app)
