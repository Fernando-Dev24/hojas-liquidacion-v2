import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from '../ui/home'
import { UpdatePage } from '../../update/update-page'

const Layout = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/update/:id" element={<UpdatePage />} />
      <Route path="/*" element={<Navigate to="/app/home" replace />} />
    </Routes>
  )
}

export default Layout
