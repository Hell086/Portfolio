import HeroText from "../components/HeroText";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  return (
    <section
      className="flex items-start justify-center md:items-start md:justify-start c-space pt-24 pb-10"
      id="home"
    >
      <HeroText />
    </section>
  );
};

export default Hero;