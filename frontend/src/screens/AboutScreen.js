import React from 'react';
import About from '../components/About/About';
import { Helmet } from 'react-helmet-async';

const AboutScreen = () => {
  return (
    <div>
      <Helmet>
        <title>About</title>
      </Helmet>
      <About />
    </div>
  );
};

export default AboutScreen;
