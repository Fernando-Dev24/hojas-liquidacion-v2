import { HashRouter } from 'react-router-dom'
import { Router } from './app/router/router'
import { Bounce, ToastContainer } from 'react-toastify'
import { es } from 'date-fns/locale/es'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { registerLocale, setDefaultLocale } from 'react-datepicker'

/* COMPONENTS */
import { PDFWrapper, ConsolidadoWrapper } from './docs'

/* STYLES */
import './styles/main.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-confirm-alert/src/react-confirm-alert.css'
import 'react-tooltip/dist/react-tooltip.css'
import 'react-datepicker/dist/react-datepicker.css'

// inicializar query client
const queryClient = new QueryClient()

// Setear el datepicker como es
setDefaultLocale('es')
registerLocale('es', es)

function App() {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <HashRouter>
        <QueryClientProvider client={queryClient}>
          <PDFWrapper id="pdfModal" />
          <ConsolidadoWrapper id="consolidadoModal" />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            pauseOnFocusLoss={false}
            closeOnClick
            rtl={false}
            draggable
            theme="light"
            transition={Bounce}
            toastClassName="toastify-custom-styles"
          />
          <Router />
        </QueryClientProvider>
      </HashRouter>
    </>
  )
}

export default App
