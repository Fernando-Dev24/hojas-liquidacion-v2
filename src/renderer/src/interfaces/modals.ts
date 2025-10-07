import { ModalState } from '@renderer/store/modal-store'

export interface ModalProps {
  id: keyof ModalState['modals']
}
