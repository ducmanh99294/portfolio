import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Process from './components/Process' 
import Feedback from './components/Feedback';
import ProductsPage from './components/Product';
import './assets/global.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Process />
      <Portfolio />
      <ProductsPage/>
      <Feedback/>
      <Contact />
      <Footer />
    </div>
  );
}

export default App;