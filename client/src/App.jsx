import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Footer from './components/Footer.jsx'
import AllRooms from './pages/AllRooms.jsx'

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div className="min-h-screen flex flex-col">
      {!isOwnerPath && <Navbar />}

      <main className="flex-1">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<AllRooms />} />
        </Routes>
      </main>

      {!isOwnerPath && <Footer />}
    </div>
  )
}

export default App
