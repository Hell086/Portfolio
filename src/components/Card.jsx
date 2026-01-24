import React from 'react';

const Card = ({ project, onClick }) => {
  return (
    <div
      className={`${project.gridClass} grid-default-color group cursor-pointer relative overflow-hidden`}
      onClick={onClick}
    >
      {/* Background Image */}
      {project.img && (
        <div className="absolute inset-0">
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-70"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t  from-black/75 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80"></div>
        </div>
      )}

      {/* Category Tag */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1.5  bg-white/50 backdrop-blur-sm rounded-full text-xs font-medium text-black/70 ">
          {project.category}
        </span>
      </div>

      {/* Project Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transition-transform duration-300 lg:group-hover:-translate-y-10">
        <h3 className="text-2xl font-bold text-white mb-1">
          {project.title}
        </h3>
        {project.description && (
          <p className="text-xs text-white/90">
            {project.description}
          </p>
        )}
      </div>

      {/* Learn More Button - Desktop only (slides up on hover) */}
      <div className="hidden lg:flex absolute bottom-0 left-0 right-0 p-6 z-20 items-center translate-y-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <button
          className="text-sm font-semibold text-white hover:text-blue-400 flex items-center gap-2 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          Learn more
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Hover overlay effect */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300" />
    </div>
  );
};

export default Card;