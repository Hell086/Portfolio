import HeroText from "../components/HeroText";

const Hero = () => {
  return (
    <section
      className="flex items-center justify-center md:items-center md:justify-start c-space section-spacing hero-section"
      id="home"
    >
      <HeroText />
    </section>
  );
};

export default Hero;