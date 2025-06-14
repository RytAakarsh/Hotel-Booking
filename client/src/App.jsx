import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Footer from './components/Footer.jsx'
import AllRooms from './pages/AllRooms.jsx'
import RoomDetails from './pages/RoomDetails.jsx'
import MyBooking from './pages/MyBooking.jsx'
import HotelReg from './components/HotelReg.jsx'
import Layout from './pages/hotelOwner/Layout.jsx'

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div className="min-h-screen flex flex-col">
      {!isOwnerPath && <Navbar />}
      {false && <HotelReg />} 

      <main className="flex-1">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<AllRooms />} />
          <Route path='/rooms/:id' element={<RoomDetails />} />
          <Route path='/my-bookings' element={<MyBooking />} />
          <Route path='/owner' element={<Layout />}>

          </Route>
        </Routes>
      </main>

      {!isOwnerPath && <Footer />}
    </div>
  )
}

export default App
