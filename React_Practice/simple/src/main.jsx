import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Newstring from './stringMethods.jsx'
import StringStateExample from './stringMethods.jsx'
import BooleanStateExample from './Boolean_in_usestate.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <StringStateExample/>
    <BooleanStateExample/>
  </>
  
)
