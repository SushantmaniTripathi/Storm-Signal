import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import Layout from './components/layout/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  )
}

export default App