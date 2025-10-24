import { Navigate, Route, Routes } from 'react-router-dom'
import { useCallback, useEffect } from 'react'
import { HomePage } from '../ui/home'
import { Admin } from '../../admin/ui/admin'
import { UpdatePage } from '../../update/update-page'
import { Agenda } from '../../agenda/agenda'
import { SchoolDirectory } from '../../directory/school-directory'
import { getObservationSchema } from '@renderer/app/actions'
import { useObservationPDFShema } from '@renderer/store/observation-pdf'

const Layout = () => {
  const setSchema = useObservationPDFShema((state) => state.setSchema)

  const cb = useCallback(async () => {
    const schema = await getObservationSchema()
    setSchema(schema)
  }, [getObservationSchema])

  useEffect(() => {
    cb()
  }, [])

  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/update/:id" element={<UpdatePage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/agenda" element={<Agenda />} />
      <Route path="/directory" element={<SchoolDirectory />} />
      <Route path="/*" element={<Navigate to="/app/home" replace />} />
    </Routes>
  )
}

export default Layout
