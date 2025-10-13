import { dbPromise } from '@renderer/config/firebase'
import { AdminConfig } from '@renderer/interfaces/admin'
import { doc, getDoc } from 'firebase/firestore'

export const getAdminConfig = async () => {
  try {
    const db = await dbPromise
    const docRef = doc(db, 'config', 'admin-config')
    const docSnap = await getDoc(docRef)
    const data = docSnap.data()

    return data as AdminConfig
  } catch (error) {
    console.log(error)
    return null
  }
}
