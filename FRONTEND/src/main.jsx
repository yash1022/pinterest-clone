import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createContext } from 'react'
import { BrowserRouter } from "react-router-dom";

 const ModalContext = createContext()

function Root() {
  const [toggleModal, setToggleModal] = useState(false)

  return (
    <StrictMode>
       <BrowserRouter>
      <ModalContext.Provider value={{ toggleModal, setToggleModal }}>
       <App /> 
      </ModalContext.Provider>
        </BrowserRouter>
    </StrictMode>
  )
}

// Render to DOM
createRoot(document.getElementById('root')).render(<Root />)
export default ModalContext