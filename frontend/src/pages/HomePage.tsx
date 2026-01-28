import React from 'react';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Process from '../components/Process';
import Feedback from '../components/Feedback';
import Contact from '../components/Contact';
import SimpleProductsPage from '../components/Product';

const CheckoutPageWrapper: React.FC = () => {
    return (
    <div className="App">
      <Hero />
      <About />
      <Skills />
      <Process />
      <Portfolio />
      <SimpleProductsPage/>
      <Feedback/>
      <Contact />
    </div>
  );
};

export default CheckoutPageWrapper;