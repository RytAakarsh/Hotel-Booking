import React from 'react'
import Hero from '../components/Hero.jsx'
import FeaturedDestination from '../components/FeaturedDestination.jsx'
import ExclusiveOffer from '../components/ExclusiveOffer.jsx'
import Testimonial from '../components/Testimonial.jsx'

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedDestination />
      <ExclusiveOffer />
      <Testimonial /> 
    </>
  )
}

export default Home