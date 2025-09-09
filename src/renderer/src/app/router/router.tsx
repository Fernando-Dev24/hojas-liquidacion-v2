import { Suspense, useEffect, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

/* HOOKS */
// import { useAuthContext } from '../pages/auth/hooks';

/* LAZY AND NOT LAZY COMPONENTS */
import { Loader } from '../../components'
const Login = lazy(() => import('../auth/pages/login'))
/* const Profile = lazy(() => import('../pages/auth/screens/Profile')); */

/* ROUTES */
import { routes } from './routes'

/* VARIABLES */
const status: 'not-authenticated' | 'authenticated' = 'authenticated'
const currentUser = {}

export const Router = () => {
  /* HOOKS */
  //const { status, currentUser, startCheckingToken } = useAuthContext()

  /* EFFECT - CUANDO LA APP SE INICIE PROCEDEMOS A ENTRAR DIRECTAMENTE AL EFFECT QUE VALIDARA SI EXISTE UN USUARIO */
  /* useEffect(() => {
    const checkToken = async () => await startCheckingToken()
    checkToken()
  }, []) */

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
