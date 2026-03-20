import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Experiences from "./sections/Experiences";
import Testimonial from "./sections/Testimonial";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import Project from "./sections/Project";
import About from "./sections/About";
import Service from "./sections/Service";
import ProjectOverview from "./Projects/ProjectOverview";

// All your existing sections composed as the Home page
const Home = () => (
  <div className="container mx-auto max-w-7xl">
    <Navbar />
    <Hero />
    <About />
    <Service />
    <Project />
    <Experiences />
    <Testimonial />
    <Contact />
    <Footer />
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectOverview />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;