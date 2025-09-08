import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from '../ui/home'

const Layout = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/*" element={<Navigate to="/app/home" replace />} />
    </Routes>
  )
}

export default Layout
