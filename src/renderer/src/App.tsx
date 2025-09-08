import { HashRouter } from 'react-router-dom'
import { Router } from './app/router/router'
import { Bounce, ToastContainer } from 'react-toastify'

/* STYLES */
import './styles/main.css'

function App(): React.JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <HashRouter>
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
      </HashRouter>
    </>
  )
}

export default App
