import HeroText from "../components/HeroText";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  return (
    <section className="flex items-start justify-center overflow-hidden md:items-start md:justify-start c-space "
    id="home">
      <HeroText />
    </section>
  );
};

export default Hero;
