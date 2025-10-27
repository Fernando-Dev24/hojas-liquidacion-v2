import { initializeApp } from 'firebase/app'
import { Firestore, getFirestore } from 'firebase/firestore'

// Obtener las variables de entorno desde ElectronAPI
const getFirebaseConfig = async () => {
  const env = await window.electronAPI.getEnv()
  return {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID
  }
}

// Inicializar Firebase de forma asincrona
let db: Firestore
const initFirebase = async () => {
  const firebaseConfig = await getFirebaseConfig()
  const app = initializeApp(firebaseConfig)
  db = getFirestore(app)
  return db
}

export const dbPromise = initFirebase()

// export db para uso sincrono
export { db }
