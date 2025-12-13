import { Routes, Route } from 'react-router-dom'
import HomePage from './components/home/home.page.jsx'
import Navbar from './components/navbar/navbar.page.jsx'
import LoginPage from './components/login/login.page.jsx'
import RegisterPage from './components/register/register.page.jsx'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  )
}

export default App
