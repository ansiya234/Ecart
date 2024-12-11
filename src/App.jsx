import { Route, Routes } from 'react-router-dom'
import './App.css'
import Cart from './pages/Cart'
import Home from './Pages/Home'
import Wishlist from './Pages/Wishlist'
import Footer from './components/Footer'
import View from './Pages/View'


function App() {
 

  return (
    <>
    <Routes>
    <Route element={<Home/>} path='/'/>
    <Route element={<Cart/>}path='/cart'/>
    <Route element={<Wishlist/>}path='/wishlist'/>
    <Route element={<View/>}path='/view/:id'/>
    
    </Routes>
    <Footer/>
      
    </>
  )
}

export default App