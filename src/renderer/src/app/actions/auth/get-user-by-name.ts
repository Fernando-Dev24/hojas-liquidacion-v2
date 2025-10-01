import { dbPromise } from '@renderer/config/firebase'
import { User } from '@renderer/interfaces'
import { collection, getDocs, query, where } from 'firebase/firestore'

interface Params {
  username: string | null
  password: string | null
}

export const getUserByName = async ({ username, password }: Params) => {
  if (!username || !password) return null

  try {
    const db = await dbPromise
    const collectionRef = collection(db, 'users')
    const q = query(
      collectionRef,
      where('username', '==', username),
      where('password', '==', password)
    )
    const snapshot = await getDocs(q)
    const user = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<User, 'id'>)
    }))

    return user[0]
  } catch (error) {
    console.log(error)
    throw error
  }
}
