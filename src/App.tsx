import { Routes, Route } from 'react-router-dom'
import './App.css'
import { ListPage } from './pages/ListPage'
import { DetailsPage } from './pages/DetailsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/property/:id" element={<DetailsPage />} />
    </Routes>
  )
}

export default App
