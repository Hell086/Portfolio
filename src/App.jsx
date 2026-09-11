import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Experiences from "./sections/Experiences";
import Testimonial from "./sections/Testimonial";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import Project from "./sections/Project";
import About from "./sections/About";
import WorkedIn from "./sections/WorkedIn";
import Service from "./sections/Service";
import ProjectOverview from "./Projects/ProjectOverview";

// All your existing sections composed as the Home page
const Home = () => (
  <div className="container mx-auto max-w-7xl">
    <Hero />
    <About />
    <WorkedIn />
    <Service />
    <Project />
    <Experiences />
    <Testimonial />
    <Contact />
    <Footer />
  </div>
);

const ScrollToSection = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (pathname !== "/") return;

    const sectionId = hash.replace("#", "");
    const target = sectionId && document.getElementById(sectionId);

    if (target) {
      requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth" }));
    } else if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToSection />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectOverview />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
