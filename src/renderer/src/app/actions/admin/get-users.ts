import { dbPromise } from '@renderer/config/firebase'
import { User } from '@renderer/interfaces'
import { collection, getDocs } from 'firebase/firestore'

export const getUsers = async () => {
  try {
    const db = await dbPromise
    const usersCollection = collection(db, 'users')
    const userSnapshot = await getDocs(usersCollection)
    const userList = userSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<User, 'id'>)
    }))

    return userList
  } catch (error) {
    console.log(error)
    throw new Error('Error al obtener los usuarios')
  }
}
