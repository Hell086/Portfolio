import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { projects } from '../constants';
import ProjectGallery from './components/ProjectGallery';

// Flatten all category arrays and deduplicate by id
const allProjects = Object.values(projects)
  .flat()
  .filter((p, index, self) => self.findIndex(x => x.id === p.id) === index);

// ── Related Projects ─────────────────────────────────────────────────────────
const RelatedProjects = ({ currentId, category }) => {
  const navigate = useNavigate();
  const related = allProjects
    .filter(p => p.id !== currentId && p.category === category)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <motion.div
      className="mt-20 pt-12 border-t border-neutral-200"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <h2 className="text-2xl font-bold text-neutral-900 mb-8">
        More <span className="text-blue-600">{category}</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {related.map((p, i) => (
          <motion.div
            key={p.id}
            onClick={() => {
              navigate(`/project/${p.id}`);
              window.scrollTo(0, 0);
            }}
            className="group cursor-pointer rounded-2xl overflow-hidden relative aspect-[4/3] bg-neutral-200"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + i * 0.1 }}
          >
            {p.img && (
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white font-bold text-sm leading-tight">{p.title}</p>
              {p.subtitle && <p className="text-blue-400 text-xs mt-0.5">{p.subtitle}</p>}
              {p.year && <p className="text-white/50 text-xs mt-0.5">{p.year}</p>}
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const ProjectOverview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = allProjects.find(p => p.id === parseInt(id, 10));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 gap-4">
        <p className="text-neutral-400 text-lg">Project not found.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 border-2 border-blue-600 rounded-full text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-all"
        >
          Go home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">

      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        {project.img ? (
          <motion.img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        ) : (
          <div className="w-full h-full bg-neutral-900" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium transition-all"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </motion.button>

        {/* Title block */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 px-8 pb-10 md:px-14 md:pb-14 z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-blue-600/80 backdrop-blur-sm rounded-full text-xs text-white font-semibold tracking-widest uppercase">
              {project.category}
            </span>
            {project.year && (
              <span className="text-white/50 text-sm">{project.year}</span>
            )}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-blue-400 text-2xl md:text-3xl font-semibold mt-1">
              {project.subtitle}
            </p>
          )}
          {project.role && (
            <p className="text-white/50 text-sm mt-3 italic">{project.role}</p>
          )}
        </motion.div>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">

          {/* Left col: Description + Gallery */}
          <motion.div
            className="md:col-span-2 space-y-12"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Overview */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Overview</h2>
              <p className="text-neutral-600 text-lg leading-relaxed">
                {project.longDescription || project.description || 'No description available.'}
              </p>
            </div>

            {/* Gallery — shows cover + all subImages */}
            <ProjectGallery
              images={project.subImages || []}
              coverImage={project.img}
              title={project.title}
            />
          </motion.div>

          {/* Right col: Meta sidebar */}
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* Tools */}
            {project.tags && project.tags.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-3">
                  Tools Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1.5 bg-neutral-900 text-white text-xs rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Year */}
            {project.year && (
              <div>
                <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-1">Year</h3>
                <p className="text-neutral-800 font-semibold text-lg">{project.year}</p>
              </div>
            )}

            {/* Role */}
            {project.role && (
              <div>
                <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-1">Role</h3>
                <p className="text-neutral-800 font-semibold">{project.role}</p>
              </div>
            )}

            {/* Category */}
            <div>
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-1">Category</h3>
              <p className="text-neutral-800 font-semibold">{project.category}</p>
            </div>

            {/* Image count */}
            {project.subImages && project.subImages.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-1">Photos</h3>
                <p className="text-neutral-800 font-semibold">{project.subImages.length + 1} images</p>
              </div>
            )}

            {/* Live link */}
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all text-sm w-fit"
              >
                View Live
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            )}

            {/* Back link */}
            <button
              onClick={() => navigate('/#projects')}
              className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-700 transition-colors w-fit"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Projects
            </button>
          </motion.div>
        </div>

        {/* Related Projects */}
        <RelatedProjects currentId={project.id} category={project.category} />
      </div>
    </div>
  );
};

export default ProjectOverview;