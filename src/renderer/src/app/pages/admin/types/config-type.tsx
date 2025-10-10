import { FiPackage } from 'react-icons/fi'
import { MdAttachMoney } from 'react-icons/md'
interface ConfigOption {
  id: string
  label: string
  icon: React.ReactNode
}

export const configOptions: ConfigOption[] = [
  {
    id: 'packages',
    label: 'Paquetes',
    icon: <FiPackage size={20} />
  },
  {
    id: 'finances',
    label: 'Financiero',
    icon: <MdAttachMoney size={20} />
  }
]
