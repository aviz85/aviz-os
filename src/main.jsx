import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { documentTitle } from './constants/texts'
import { SupabaseProvider } from './utils/SupabaseContext'

// Set document title from constants
document.title = documentTitle

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SupabaseProvider>
      <Router>
        <App />
      </Router>
    </SupabaseProvider>
  </React.StrictMode>,
) 