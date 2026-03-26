import HeroText from "../components/HeroText";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
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