import z from 'zod'

export interface User {
  id: string
  password: string
  roles: string[]
  userId: string
  username: string
}

export interface UserForm {
  username: string
  password: string
  roles: string
}

export const userSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
  roles: z.string().min(3)
})
