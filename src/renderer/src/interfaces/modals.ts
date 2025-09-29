import { type State } from '@renderer/store/modal-store'

export interface ModalProps {
  id: keyof State['modals']
}
