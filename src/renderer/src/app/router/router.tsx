import { Suspense, useEffect, lazy, useCallback } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

/* HOOKS */
// import { useAuthContext } from '../pages/auth/hooks';

/* LAZY AND NOT LAZY COMPONENTS */
import { Loader } from '../../components'
const Login = lazy(() => import('../auth/pages/login'))
/* const Profile = lazy(() => import('../pages/auth/screens/Profile')); */

/* ROUTES */
import { routes } from './routes'
import { useQuery } from '@tanstack/react-query'
import { getUserByName } from '../actions'
import { useLogin } from '@renderer/store'

/* VARIABLES */
const currentUser = {}

export const Router = () => {
  const username = localStorage.getItem('username')

  const {
    data: user,
    isLoading,
    error
  } = useQuery({
    queryKey: ['get-user'],
    queryFn: () => getUserByName(username)
  })

  const { setUser, reset, status } = useLogin((state) => state)

  // si no existe usuario mandamos al usuario a la pagina del login, si existe entonces lo llevamos a la app
  const cb = useCallback(() => {
    if (!user) reset()
    else setUser(user)
  }, [user])

  useEffect(() => cb(), [cb])

  if (isLoading) return <Loader />
  if (error) return <div>Error al cargar usuarios, recarga la página dentro de un minuto</div>

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
