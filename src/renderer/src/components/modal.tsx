import { useModals, type ModalState } from '@renderer/store/modal-store'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root')

interface Props {
  id: keyof ModalState['modals']
  customCloseFn?: () => void
  children: React.ReactNode
  [x: string]: any
}

export const Modal = ({ id, customCloseFn, children, ...props }: Props) => {
  const { modals, toggleModal } = useModals((state) => state)

  return (
    <ReactModal
      isOpen={!!modals[id]}
      onRequestClose={() => (customCloseFn ? customCloseFn() : toggleModal(id))}
      closeTimeoutMS={200}
      overlayClassName="modal-background"
      {...props}
    >
      <div className={`relative py-10 px-8 ${props.customClassName}`}>{children}</div>
    </ReactModal>
  )
}
