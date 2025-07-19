import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Routes from './routes.jsx'
import './Styles/global.css'
import './Styles/layout.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Routes />
  </StrictMode>,
)
