import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import './App.css'

// Import pages
import WelcomePage from './pages/WelcomePage'
import SituationsPage from './pages/SituationsPage'
import SituationDetail from './pages/SituationDetail'
import PersonalArea from './pages/PersonalArea'
import DatabaseInitializer from './components/DatabaseInitializer'

function App() {
  return (
    <div className="app-container" dir="rtl">
      <DatabaseInitializer>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/situations" element={<SituationsPage />} />
            <Route path="/situation/:id" element={<SituationDetail />} />
            <Route path="/personal-area" element={<PersonalArea />} />
          </Routes>
        </AnimatePresence>
      </DatabaseInitializer>
    </div>
  )
}

export default App 