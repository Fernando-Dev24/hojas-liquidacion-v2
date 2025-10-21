export type Sector = 'PÚBLICO' | 'PRIVADO'

export interface SchoolDirectoryEntry {
  id: string
  infra: string
  name: string
  sector: Sector
  municipio: string
  nit: string
  createdAt: Date
  updatedAt: Date
}
