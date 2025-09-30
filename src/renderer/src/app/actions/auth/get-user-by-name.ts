import { db } from '@renderer/config/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

export const getUserByName = async (username: string | null) => {
  if (!username) return null

  try {
    const collectionRef = collection(db, 'users')
    const q = query(collectionRef, where('username', '==', username))
    const snapshot = await getDocs(q)
    const user = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))

    return user[0]
  } catch (error) {
    console.log(error)
    throw error
  }
}
