import HeroText from "../components/HeroText";
import { useMediaQuery } from "react-responsive";
// import { Canvas } from "@react-three/fiber";
// import { Painting } from "../components/Painting";
// import { OrbitControls } from "@react-three/drei";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  return (
    <section className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space">
      <HeroText />
      {/* <figure
      className="absolute inset-0"
      style={{width: "100vw", height: "100vh"}}>
      <Canvas>
        <Painting/>
        <OrbitControls/>
      </Canvas>
      </figure> */}
    </section>
  );
};

export default Hero;
