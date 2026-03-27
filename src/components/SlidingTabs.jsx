import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

const SlidingTabs = ({ tabs, activeTab, onTabChange }) => {
  const [indicatorStyle, setIndicatorStyle] = useState(null);
  const tabRefs = useRef({});
  const containerRef = useRef(null);

  useEffect(() => {
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
  }, [activeTab]);

  return (
    <div className="flex justify-center w-full pb-2 mb-8">
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="overflow-x-auto scrollbar-hide">
        <div
          ref={containerRef}
          className="relative inline-flex bg-gray-100 rounded-full p-1 min-w-max"
        >
          {/* Animated sliding background — hidden until measured */}
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