import React from 'react'
import Contact from '../components/Contact/Contact';
import { Helmet } from 'react-helmet-async';
const ContactScreen = () => {
  return (
    <div>
    <Helmet>
       <title>Contact us</title>
     </Helmet>
    <Contact/>
    </div>
  )
}

export default ContactScreen;
