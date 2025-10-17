import { FiPackage } from 'react-icons/fi'
import { MdAttachMoney } from 'react-icons/md'

interface ConfigOption {
  id: 'paquetes' | 'financiero'
  label: string
  icon: React.ReactNode
  options: ConfigOptions[]
}

interface ConfigOptions {
  value: string
  label: string
}

const options: ConfigOptions[] = [
  {
    value: 'no-limit',
    label: 'Sin limite'
  },
  {
    value: '10',
    label: '10'
  },
  {
    value: '5',
    label: '5'
  },
  {
    value: '4',
    label: '4'
  },
  {
    value: '3',
    label: '3'
  },
  {
    value: '2',
    label: '2'
  },
  {
    value: '1',
    label: '1'
  }
]

export const configOptions: ConfigOption[] = [
  {
    id: 'paquetes',
    label: 'Paquetes',
    icon: <FiPackage size={20} />,
    options
  },
  {
    id: 'financiero',
    label: 'Financiero',
    icon: <MdAttachMoney size={20} />,
    options
  }
]
