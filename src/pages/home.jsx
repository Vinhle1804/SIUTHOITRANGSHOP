import React from 'react'
import Header from '../components/header'
import Carousel from '../components/carousel'
import Footer from '../components/footter'
import ProductList from '../components/newProducts'

function Home() {
  return (
  <div>
  <Header/>
  <Carousel/>
  <ProductList/>
  <Footer/>
  </div>
  )
}

export default Home
