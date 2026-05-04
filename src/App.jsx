import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Credentials from './components/Credentials';
import Testimonials from './components/Testimonials';
import Clinic from './components/Clinic';
import Contact from './components/Contact';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Credentials />
        <Testimonials />
        <Clinic />
        <Contact />
      </main>
      <Footer />
      {/* SmileBot – 24/7 AI patient assistant */}
      <Chatbot />
    </>
  );
}

export default App;
