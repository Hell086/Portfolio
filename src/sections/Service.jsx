import React from "react";

const Service = () => {
  return (
    <section className="services-section" id="services">
      {/* Pills */}
      <span className="services-pill pill-top">Acrylic Painting</span>
      <span className="services-pill pill-left">UI/UX Design</span>
      <span className="services-pill pill-right">Graphic Design</span>
      <span className="services-pill pill-bottom-left">Motion Graphics</span>
      <span className="services-pill pill-bottom-right">Animation</span>

      {/* Center Content */}
      <div className="services-center" >
        <h1 className="services-title">
          What I bring to <br /> the table
        </h1>
      </div>
    </section>
  );
};

export default Service;
