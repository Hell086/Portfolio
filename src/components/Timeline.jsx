"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    
    <div className="timeline-wrapper c-space section-spacing relative" ref={containerRef} 
    style={{isolation: 'isolate', overflow: 'hidden'}}>
      <h2 className="text-center text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 ">
        My Work Experience</h2>
      <div ref={ref} className="relative pb-20">
        {data.map((item, index) => {
          // CHANGE 1: Calculate when the blue line reaches this specific circle
          // Each circle is positioned at a different height, so we calculate its position
          const circleStart = index / data.length;
          const circleEnd = (index + 0.3) / data.length;
          
          // CHANGE 2: Create color transforms that change when blue line touches the circle
          const outerCircleColor = useTransform(
            scrollYProgress,
            [circleStart, circleEnd],
            ['#0D6EFD', '#FFFFFF'] // Blue to White
          );
          
          const innerCircleColor = useTransform(
            scrollYProgress,
            [circleStart, circleEnd],
            ['#FFFFFF', '#0D6EFD'] // White to Blue
          );

          return (
            <div
              key={index}
              className="flex justify-start pt-10 md:pt-40 md:gap-10"
            >
              <div className="sticky z-40 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
                {/* CHANGE 3: Outer circle - animates from blue to white when the line touches it */}
                <motion.div 
                  className="absolute flex items-center justify-center w-10 h-10 rounded-full -left-[15px] transition-all duration-300" 
                  style={{ 
                    backgroundColor: outerCircleColor
                  }}
                >
                  {/* CHANGE 4: Inner circle - animates from white to blue when the line touches it */}
                  <motion.div 
                    className="w-4 h-4 p-2  rounded-full  transition-all duration-300" 
                    style={{ 
                      backgroundColor: innerCircleColor
                    }} 
                  />
                </motion.div>
                <div className="flex-col hidden gap-2 text-xl font-bold md:flex md:pl-20 md:text-4xl text-neutral-300">
                  <h3>{item.date}</h3>
                  <h3 className="font-extrabold text-3xl text-neutral-500">{item.job}</h3>
                  <h3 className="font-medium text-2xl text-neutral-400">{item.worked}</h3>
                  
                </div>
              </div>

              <div className="relative w-full pl-20 pr-4 md:pl-4">
                <div className="block mb-4 text-2xl font-bold text-left text-neutral-300 md:hidden ">
                  <h3>{item.date}</h3>
                  <h3>{item.job}</h3>
                </div>
                {item.contents.map((content, index) => (
                  <p className="mb-3 font-normal text-neutral-400" key={index}>
                    {content}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-1 left-1 top-0 overflow-hidden 
          w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] 
          from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  
          [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,
          transparent_100%)] "
        >
          {/* CHANGE 5: This is the blue animated line that triggers the circle color changes */}
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-blue-100 via-[#0D6EFD]/50 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
      <div className="relative flex flex-col items-center ">
          <motion.button
                  className="px-6 py-3 hover:cursor-pointer rounded-full bg-accent text-white hover:bg-blue-400 font-semibold "
                >
                  View Resume
                </motion.button>
      </div>
    </div>
  );
};