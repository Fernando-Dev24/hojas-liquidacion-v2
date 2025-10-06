import { HashRouter } from 'react-router-dom'
import { Router } from './app/router/router'
import { Bounce, ToastContainer } from 'react-toastify'

/* COMPONENTS */
import { PDFWrapper, ConsolidadoWrapper } from './docs'

/* STYLES */
import './styles/main.css'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// inicializar query client
const queryClient = new QueryClient()

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
            theme="dark"
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
