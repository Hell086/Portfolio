import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { motion } from 'motion/react';

const SlidingTabs = ({ tabs, activeTab, onTabChange }) => {
  const [indicatorStyle, setIndicatorStyle] = useState(null);
  const tabRefs = useRef({});
  const containerRef = useRef(null);

  const updateIndicator = () => {
    const activeEl = tabRefs.current[activeTab];
    const container = containerRef.current;
    if (activeEl && container) {
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();
      setIndicatorStyle({
        left: activeRect.left - containerRect.left,
        width: activeRect.width,
      });
    }
  };

  // useLayoutEffect — runs synchronously after DOM paint
  // prevents the flash on first render
  useLayoutEffect(() => {
    updateIndicator();
  }, [activeTab]);

  // Handle window resize — recalculate indicator position
  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeTab]);

  return (
    <div className="flex justify-center w-full pb-2 mb-8">
      {/* Fix: plain <style> instead of styled-jsx */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="overflow-x-auto scrollbar-hide">
        <div
          ref={containerRef}
          className="relative inline-flex bg-gray-100 rounded-full p-1 min-w-max"
        >
          {/* Indicator — only renders after first measurement */}
          {indicatorStyle && (
            <motion.div
              className="absolute top-1 bottom-1 bg-blue-500 rounded-full shadow-md"
              animate={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
            />
          )}

          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => (tabRefs.current[tab.id] = el)}
              onClick={() => onTabChange(tab.id)}
              className={`relative z-10 px-3 sm:px-4 md:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlidingTabs;