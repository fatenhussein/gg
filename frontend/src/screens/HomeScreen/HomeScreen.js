import React from 'react'
import Navbar from '../../components/NavBar/NavBar';
import Services from '../../components/services/Services';
import Slider from "../../components/slider/Slider";
import Footer from '../../components/footer/Footer';
import "./HomeScreen.css"
import { Helmet } from 'react-helmet-async';
const HomeScreen = () => {
  return (
    <div className='pro-container'>
         <Helmet>
          <title>Home</title>
        </Helmet>
      <Navbar/>
      <Slider/>
      <Services/>
      <Footer/>
    </div>
  )
}

export default HomeScreen;
