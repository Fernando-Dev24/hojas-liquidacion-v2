import { DirectoryNavbar, DirectoryTable } from '../components'

export const SchoolDirectory = () => {
  return (
    <div className="container">
      <DirectoryNavbar />

      {/* LANDING */}
      <div className="my-10">
        <h2 className="pb-1 text-center text-4xl font-semibold text-secondary">
          Directorio Escolar
        </h2>
        <p className="text-center text-gray-600 text-lg">
          Crea y edita directorios de centros escolares del <br /> área departamental de San
          Salvador
        </p>
      </div>

      {/* TABLE */}
      <DirectoryTable />
    </div>
  )
}
