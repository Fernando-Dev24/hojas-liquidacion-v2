import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from '../ui/home'
import { UpdatePage } from '../../update/update-page'
import { useCallback, useEffect } from 'react'
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
      <Route path="/*" element={<Navigate to="/app/home" replace />} />
    </Routes>
  )
}

export default Layout
