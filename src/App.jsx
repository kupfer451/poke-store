import { Routes, Route } from 'react-router-dom'
import HomePage from './components/home/home.page.jsx'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

export default App
