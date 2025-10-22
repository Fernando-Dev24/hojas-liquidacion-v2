import { SchoolDirectoryEntry } from '../interfaces/school-directory'
import { create } from 'zustand'
import { PaginationActions } from './observations-store'

interface DirectoryState {
  totalPages: number
  currentPage: number
  directoryToEdit: SchoolDirectoryEntry | null

  setPagination: (totalPages: number) => void
  setDirectoryEdit: (directory: SchoolDirectoryEntry | null) => void
  triggerPagination: (action: PaginationActions) => void
}

export const useDirectory = create<DirectoryState>()((set, get) => ({
  currentPage: 1,
  totalPages: 1,
  directoryToEdit: null,

  setPagination: (totalPages: number) => set({ totalPages }),
  setDirectoryEdit: (directory: SchoolDirectoryEntry | null) => set({ directoryToEdit: directory }),
  triggerPagination: (action: PaginationActions) => {
    const { currentPage } = get()
    switch (action) {
      case 'prev':
        set({ currentPage: currentPage - 1 })
        break
      case 'next':
        set({ currentPage: currentPage + 1 })
        break
      case 'reset':
        set({ currentPage: 1 })
        break
      default:
        set({ currentPage: 1 })
        break
    }
  }
}))
