import { Suspense, useEffect, lazy, useCallback } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useLogin } from '@renderer/store'

/* LAZY AND NOT LAZY COMPONENTS */
import { Loader, Error } from '../../components'
const Login = lazy(() => import('../auth/pages/login'))

/* ROUTES */
import { routes } from './routes'
import { getUserByName } from '../actions'

const currentUser = {}

export const Router = () => {
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')
  const { setUser, reset, status } = useLogin((state) => state)

  const {
    data: user,
    isLoading,
    error
  } = useQuery({
    queryKey: ['get-user'],
    queryFn: () => getUserByName({ username, password })
  })

  // si no existe usuario mandamos al usuario a la pagina del login, si existe entonces lo llevamos a la app
  const cb = useCallback(() => {
    if (!user) reset()
    else {
      setUser(user)
    }
  }, [user])

  useEffect(() => cb(), [cb])

  if (isLoading) return <Loader />
  if (error) return <Error errorLabel="el usuario" />

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {status === 'not-authenticated' ? (
          <>
            <Route path="/auth/*" element={<Login />} />
            <Route path="/*" element={<Navigate to="/auth/login" replace />} />
          </>
        ) : currentUser ? (
          <>
            {routes.map(({ id, path, Component }) => (
              <Route key={id} path={path} element={<Component />} />
            ))}

            <Route path="/*" element={<Navigate to={routes[0].to} replace />} />
          </>
        ) : (
          <>
            <Route path="/*" element={<Navigate to="/auth/login" replace />} />
          </>
        )}
      </Routes>
    </Suspense>
  )
}
