import React, { useRef } from 'react';

const orgs = [
  {
    name: 'Bits & Circuits',
    logo: '/assets/logos/Bits-01.jpg',
  },
  {
    name: 'Project Abhaya',
    logo: '/assets/logos/Abhaya logo.png',
  },
  {
    name: 'Wind Designs',
    logo: '/assets/logos/wind-01.svg',
  },
];

const WorkedIn = () => {
  const trackRef = useRef(null);

  const handleMouseEnter = () => {
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = 'paused';
    }
  };

  const handleMouseLeave = () => {
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = 'running';
    }
  };

  return (
    <section
      className="py-5 c-space overflow-hidden border-y border-neutral-200 select-none"
      style={{ background: '#F9F9F9' }}
    >
      {/* Label */}
      <p className="text-center text-[12px] font-semibold tracking-[0.25em] text-neutral-400 uppercase mb-8">
        Worked In
      </p>

      {/* Outer mask container */}
      <div
        className="overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Single scrolling track — pause controlled via ref on the whole track */}
        <div
          ref={trackRef}
          className="workedin-track"
        >
          {/* Render 6× so it never runs out on any screen width */}
          {[...Array(6)].map((_, rep) =>
            orgs.map((org, i) => (
              <OrgItem key={`${rep}-${i}`} org={org} />
            ))
          )}
        </div>
      </div>

      <style>{`
        .workedin-track {
          display: flex;
          min-width: max-content;
          animation: workedin-scroll 35s linear infinite;
        }

        @keyframes workedin-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

const OrgItem = ({ org }) => (
  <div className="inline-flex items-center gap-4 px-14 md:px-20 group cursor-default">
    {/* Logo */}
    <div className="w-15 h-15 md:w-20 md:h-20 flex-shrink-0 flex items-center justify-center">
      <img
        src={org.logo}
        alt={org.name}
        className="w-full h-full object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-400"
      />
    </div>

    {/* Name */}
    <span className="text-base md:text-lg font-semibold text-neutral-400 group-hover:text-neutral-800 transition-colors duration-300 whitespace-nowrap">
      {org.name}
    </span>

  </div>
);

export default WorkedIn;