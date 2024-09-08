import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SessionProvider } from './context/SessionContext.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SessionProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </SessionProvider>
  </StrictMode>,
)
