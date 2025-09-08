import { JSX, LazyExoticComponent, lazy } from 'react'

/* STATIC ROUTES = SI EN ALGUN CASO QUEREMOS QUE LA APP CREE UNA RUTA NO LAZY SOLAMENTE LA IMPORTAMOS COMO LO HARIAMOS NORMALMENTE */

type JSXComponent = () => JSX.Element

interface Route {
  id: number
  to: string
  path: string
  Component: LazyExoticComponent<JSXComponent> | JSXComponent
}

const HomeLayout = lazy(() => import('../pages/home/layouts/layout'))

export const routes: Route[] = [
  {
    id: 1,
    to: '/app/home',
    path: '/app/*',
    Component: HomeLayout
  }
]
