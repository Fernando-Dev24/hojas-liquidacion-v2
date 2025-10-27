import { initializeApp } from 'firebase/app'
import { Firestore, getFirestore } from 'firebase/firestore'

// Obtener las variables de entorno desde ElectronAPI
const getFirebaseConfig = async () => {
  try {
    const env = await window.electronAPI.getEnv()
    return {
      apiKey: env.VITE_FIREBASE_API_KEY,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: env.VITE_FIREBASE_APP_ID
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

// Inicializar Firebase de forma asincrona
let db: Firestore
const initFirebase = async () => {
  try {
    const firebaseConfig = await getFirebaseConfig()
    const app = initializeApp(firebaseConfig)

    // Inicializar firestore
    db = getFirestore(app)
    return db
  } catch (error) {
    console.log('Error al inicializar Firebase', error)
    throw error
  }
}

export const dbPromise = initFirebase()

// export db para uso sincrono
export { db }
