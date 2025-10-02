import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Obtener las variables de entorno desde ElectronAPI
const getFirebaseConfig = async () => {
  // const env = await window.electronAPI.getEnv()
  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  }
}

// Inicializar Firebase de forma asincrona
let db: any
const initFirebase = async () => {
  const firebaseConfig = await getFirebaseConfig()
  const app = initializeApp(firebaseConfig)
  db = getFirestore(app)
  return db
}

export const dbPromise = initFirebase()

// export db para uso sincrono
export { db }
