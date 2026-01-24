import React from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Experiences from "./sections/Experiences";
import Testimonial from "./sections/Testimonial";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import Project from "./sections/Project";
import About from "./sections/About";
import Service from "./sections/Service";

const App = () => {
  return (
  <div className="container mx-auto max-w-7xl">
    <Navbar/>
    <Hero />
    <About />
    <Service/>
    <Project/>
    <Experiences />
    <Testimonial />
    <Contact />
    <Footer />
  </div>
  );
};

export default App;