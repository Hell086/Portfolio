import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { mySocials } from "../constants";

const About = () => {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true });

  // Counter animation hook
  const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isInView) return;

      let startTime;
      let animationFrame;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, isInView]);

    return count;
  };

  const tools = [
    { name: 'Illustrator', logo: 'assets/logos/illustrator.svg' },
    { name: 'Photoshop', logo: 'assets/logos/photoshop.svg' },
    { name: 'After Effects', logo: 'assets/logos/Aftereffect.svg' },
    { name: 'Figma', logo: 'assets/logos/figma.svg' },
    { name: 'Blender', logo: 'assets/logos/blender.svg' },
  ];

  const stats = [
    { label: 'Years Of Experience', value: 2, suffix: '+' },
    { label: 'Completed Projects', value: 10, suffix: '+' },
    { label: 'Happy Clients', value: 20, suffix: '+' },
  ];

  return (
    <section
      id="about"
      className="c-space py-16 sm:py-20">
      {/* Header */}
      <div className="mb-10 relative">
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-neutral-900 text-center">
          Binay Shrestha
        </h1>

          {/* CTA */}
            <div 
            className="mt-8 relative flex flex-col items-center gap-8">
            <motion.button
            className="mt-7 px-5 py-2 border-2 hover:cursor-pointer border-blue-600 rounded-full text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            
          >
            Let's chat
          </motion.button>

        <div className="flex gap-2 sm:absolute sm:left-0 sm:top-0 sm:flex-col">
        {mySocials.map((social, index) => (
          <a href={social.href} key={index}
          className="transition-all duration-300 ease-in-out hover:scale-110 inline-block"
          style={{
            filter: 'grayscale(100%) brightness(0.8)',
            transition: 'all 0.3s ease-in-out'
          }}

           onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'brightness(0) saturate(100%) invert(38%) sepia(89%) saturate(2699%) hue-rotate(202deg) brightness(101%) contrast(98%)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'grayscale(100%) brightness(0.8)';
            }}
          >
            <img 
              src={social.icon} 
              className="w-5 h-5" 
              alt={social.name}
            />
          </a>
        ))}
      </div>

          {/* Tagline */}
          
          <p className="text-neutral-600 text-sm text-center sm:absolute sm:right-0 sm:bottom-0 sm:w-[200px] sm:text-right">
            An artist shaping stories through lines, colors, and feeling one artwork at a time.
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="bg-neutral-900 rounded-lg p-6 sm:p-10">
        <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white font-semibold leading-tight">
          I'm a versatile{' '}
          <span className="text-blue-600">
            designer who partners with founders to turn ideas into real products.
          </span>{' '}
          I focus on clear interfaces, sharp decisions, and fast execution.
        </p>

        {/* Tech Stack */}
        <div className="mt-14">
          <h3 className="text-white  text-xl sm:text-2xl md:text-3xl font-medium mb-8">
            Tech Stack
          </h3>

          <div className="flex flex-col lg:flex-row gap-12 justify-between">
            {/* Tools */}
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center shadow-lg bg-neutral-800"
                >
                  <img
                    src={tool.logo}
                    alt={tool.name}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Stats */}
            <div
              className="flex justify-center flex-row sm:flex-row gap-8 sm:gap-12"
              ref={statsRef}
            >
              {stats.map((stat, index) => {
                const count = useCounter(stat.value);
                return (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                      {count}
                      {stat.suffix}
                    </div>
                    <div className="text-neutral-400 text-xs sm:text-sm mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;