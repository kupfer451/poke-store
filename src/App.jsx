import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/navbar.page.jsx'
import Footer from './components/footer/footer.page.jsx'
import './App.css'
import HomePage from './components/home/home.page.jsx'
import LoginPage from './components/login/login.page.jsx'
import RegisterPage from './components/register/register.page.jsx'
import CarritoPage from './components/carrito/carrito.page.jsx'
import ProductoPage from './components/productos/producto.page.jsx'
import NosotrosPage from './components/nosotros/nosotros.page.jsx'
import ColeccionPage from './components/coleccion/coleccion.page.jsx'
import CartasNuevasPage from "./components/tarjetas/cartas-nuevas.jsx";
import CartasRarasPage from "./components/tarjetas/cartas-raras.jsx";
import BackofficePage from './components/backoffice/backoffice.page.jsx';

function App() {
  return (
    <>
      <Navbar/>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/carrito" element={<CarritoPage />} />
        <Route path="/producto" element={<ProductoPage />} />
        <Route path="/nosotros" element={<NosotrosPage />} />
        <Route path="/coleccion" element={<ColeccionPage />} />
        <Route path="/cartas-nuevas" element={<CartasNuevasPage />} />
        <Route path="/cartas-raras" element={<CartasRarasPage />} />
        <Route path="/backoffice" element={<BackofficePage />} />
      </Routes>

      <Footer/>
    </>
  )
}

export default App