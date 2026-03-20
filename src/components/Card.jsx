import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ project }) => {
  const navigate = useNavigate();

  const handleLearnMore = (e) => {
    e.stopPropagation();
    navigate(`/project/${project.id}`);
  };

  return (
    <div
      className={`${project.gridClass} grid-default-color group cursor-pointer relative overflow-hidden`}
      onClick={handleLearnMore}
    >
      {/* Background Image */}
      {project.img && (
        <div className="absolute inset-0">
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-70 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/85" />
        </div>
      )}

      {/* Category Tag */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1.5 bg-white/50 backdrop-blur-sm rounded-full text-xs font-medium text-black/70">
          {project.category}
        </span>
      </div>

      {/* Year Tag */}
      {project.year && (
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1.5 bg-black/30 backdrop-blur-sm rounded-full text-xs font-medium text-white/80">
            {project.year}
          </span>
        </div>
      )}

      {/* Project Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transition-transform duration-300 lg:group-hover:-translate-y-12">
        <h3 className="text-2xl font-bold text-white mb-0.5">
          {project.title}
        </h3>
        {project.subtitle && (
          <p className="text-sm font-medium text-blue-400 mb-1">{project.subtitle}</p>
        )}
        {project.description && (
          <p className="text-xs text-white/80 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        )}

        {/* Tags preview */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="px-2 py-0.5 bg-white/10 backdrop-blur-sm rounded-full text-[10px] text-white/70 border border-white/10">
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-0.5 bg-white/10 backdrop-blur-sm rounded-full text-[10px] text-white/70 border border-white/10">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Learn More Button — slides up on hover (desktop only) */}
      <div className="hidden lg:flex absolute bottom-0 left-0 right-0 p-6 z-20 items-center justify-between translate-y-12 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <button
          className="text-sm font-semibold text-white hover:text-blue-400 flex items-center gap-2 transition-colors"
          onClick={handleLearnMore}
        >
          Learn more
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {project.role && (
          <span className="text-xs text-white/50 italic">{project.role}</span>
        )}
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
    </div>
  );
};

export default Card;