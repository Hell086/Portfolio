import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { projects } from '../constants';
import ProjectGallery from './ProjectGallery';

// Flatten all category arrays and deduplicate by id
const allProjects = Object.values(projects)
  .flat()
  .filter((p, index, self) => self.findIndex(x => x.id === p.id) === index);

const caseStudyLabels = {
  Painting: ['Concept & Story', 'Creative Intent', 'Visual Direction', 'Process', 'Final Artwork'],
  'UI/UX': ['Project Overview', 'Design Goal', 'UX & Visual Direction', 'Design Process', 'Final Design'],
  Animation: ['Concept & Story', 'Creative Direction', 'Visual Direction', 'Animation Process', 'Final Animation'],
  'Motion Graphics': ['Concept & Story', 'Creative Direction', 'Visual Direction', 'Animation Process', 'Final Animation'],
  'Graphic Design': ['Concept & Purpose', 'Creative Intent', 'Visual Direction', 'Design Process', 'Final Design'],
};

// These concise notes are derived from the existing project descriptions.
const caseStudyContent = {
  1: ['A personal painting exploring the Newar tradition of the Kumari, a pre-pubescent girl worshipped as the living incarnation of the goddess Taleju.',
    'The piece holds the weight of divinity alongside a childs vulnerability, inviting the viewer into a space where myth and reality coexist.',
    'Crimson and gold frame the subjects distant gaze, while layered acrylic washes and fine brushwork build a reverent, detailed surface.',
    'The work developed over three weeks through layered acrylic washes and careful fine-detail brushwork.'],
  2: ['Project Abhaya is a social initiative focused on awareness and support for abuse survivors in Nepal. I handled the website design from user research and wireframing through high-fidelity prototypes and handoff.',
    'The design needed to make resources easy to find for visitors in distress while maintaining clarity, emotional safety, and accessibility.',
    'A calming palette, readable typography, and straightforward navigation were chosen to support a clear, safe experience across devices.',
    'I moved from research and wireframes into high-fidelity prototypes, then prepared the design for implementation with developer collaboration.'],
  3: ['This 3D animation explores the visceral feeling of a Formula 1 car at full speed through motion, light, and environmental detail.', 'The focus was recreating the sense of speed through details such as tire deformation, heat shimmer, and aerodynamic movement.', 'Motion blur, depth of field, chromatic aberration, HDRI lighting, and the cars rear-wing movement shape the final visual language.', 'The animation was developed in Blender with Cycles rendering, then composited in After Effects to refine the final image.'],
  4: ['Inside The Art follows the creative process itself, with layers peeling back, brushstrokes appearing in reverse, and colour blooming from nothing.', 'It was made both as a personal showreel and as a standalone exploration of the relationship between static art and time.', 'After Effects animation, Illustrator vector work, and custom audio design create an organic visual essay rather than a mechanical sequence.', 'Each transition was hand-crafted and timed to create a cohesive journey through the creative process.'],
  5: ['This was a full branding exercise for a local coffee shop seeking a modern but warm identity across logo, packaging, and marketing materials.', 'The identity needed to feel artisanal and approachable without relying on familiar coffee-shop cliches.', 'The final direction uses a minimal wordmark, a custom icon combining a coffee cup and leaf, and a custom-modified typeface.', 'The identity moved from concept exploration to refined logo variants, colour and typography guidance, and applied mockups.'],
  6: ['Abstract Dreams is a painting series inspired by the vivid, disjointed, and emotionally charged logic of dreams.', 'Each piece isolates an emotional state and translates it into colour, stroke direction, and spatial composition.', 'Warm hues push forward while cool tones recede, creating depth without traditional perspective.', 'The series was painted over six months and developed as a study of how colour can communicate mood and narrative.'],
  7: ['EcoTracker is a concept mobile app for tracking a daily carbon footprint and finding practical ways to reduce environmental impact.', 'The interface needed to make complex environmental data easy to understand and motivating for everyday users.', 'A green-forward palette, progress-based gamification, and micro-animations support regular check-ins and make the data feel approachable.', 'The project was designed in Figma and developed into interactive prototypes for user testing.'],
  8: ['Analytics Pro is a B2B SaaS dashboard concept for business owners who need clear, actionable insights from complex data sets.', 'The challenge was to present high data density without overwhelming the user.', 'A modular card system, progressive disclosure, strong typographic hierarchy, and accessible chart patterns support the dark-mode interface.', 'The design was developed by organising the data into focused modules and refining the hierarchy and visual cues around it.'],
  9: ['This stylized 3D character was created for a game prototype, from early concept through final render.', 'The aim was an expressive character with a face rig capable of conveying a range of emotions and movement that feels grounded.', 'The character combines a stylized form with an expressive face rig and animation states including walk cycles, combat stances, and idle motion.', 'The workflow covered modelling, UV unwrapping, texturing, rigging, and animation, with attention to weight and momentum.'],
  10: ['This 3D animation explores the visceral feeling of a Formula 1 car at full speed through motion, light, and environmental detail.', 'The focus was recreating the sense of speed through details such as tire deformation, heat shimmer, and aerodynamic movement.', 'Motion blur, HDRI lighting, and the cars rear-wing movement shape the final visual language.', 'The animation was developed in Blender with Cycles rendering and finished with custom compositing in After Effects.'],
  11: ['This short brand intro was made for a tech startup launching its product across social media, a website hero, and presentations.', 'The brief called for something punchy, modern, and memorable in under ten seconds, with or without sound.', 'Kinetic typography, sharp geometric transitions, monochrome colour, and a single accent colour support the logo reveal.', 'The sequence was produced in After Effects with custom expressions used to refine the motion.'],
  12: ['This editorial poster was part of a political campaign series and needed to communicate authority, hope, and clarity in print and social formats.', 'The design was intended to create immediate impact while keeping the message direct at very different viewing sizes.', 'High-contrast portrait treatment, a restricted two-colour palette, and oversized display type create the visual hierarchy.', 'Photography retouching and the final layout were developed in Photoshop and Illustrator.'],
  13: ['Uljhan, meaning entanglement in Nepali and Hindi, is an abstract painting from a period of personal uncertainty and mental noise.', 'Rather than resolving the uncertainty, the work invites the viewer to sit with complexity.', 'Overlapping strokes, competing colours, fragmented shapes, and built-up texture create a raw visual record of that experience.', 'Oil and mixed media were layered over multiple sessions without a fixed composition planned from the start.'],
  15: ['This project focused on building a clean, animator-friendly character rig in Blender.', 'The goal was a rig that could be handed to another animator without extra explanation and would support creativity without getting in the way.', 'IK/FK limb switching, a custom spine system, facial shape keys, and intuitive controls form the rigs visual and technical language.', 'The rig was developed as a technical study and documented with a short breakdown video.'],
  16: ['The 2024 Motion Reel is a curated collection of brand animation, title sequences, UI motion studies, and experimental work from the year.', 'It serves as both a professional portfolio piece and a personal marker of the years creative output.', 'The reel uses deliberate cuts and a custom audio track to connect different animation styles into one focused presentation.', 'Each edit was selected and synced to highlight a particular skill or technique.'],
  17: ['This poster project explored expressive visual communication through bold composition, mixed typography, and experimental image treatment.', 'The open brief allowed room to push beyond conventional layout and explore a space between fine art and graphic design.', 'Distortion, layering, contrast, hand-drawn elements, and texture create tension and intrigue.', 'The piece was designed in Photoshop with scanned hand-drawn elements and custom texture overlays composited into the final work.'],
};

const getCaseStudy = (project) => {
  const labels = caseStudyLabels[project.category] || caseStudyLabels['Graphic Design'];
  const content = caseStudyContent[project.id] || [project.longDescription || project.description];

  return {
    sections: labels.slice(0, 4).map((title, index) => ({ title, content: content[index] })).filter(section => section.content),
    finalLabel: labels[4],
  };
};

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
  const caseStudy = project ? getCaseStudy(project) : null;

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
            src={project.heroImg || project.img}
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

          {/* Case study */}
          <motion.div
            className="md:col-span-2 space-y-12"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {caseStudy.sections.map((section, index) => (
              <React.Fragment key={section.title}>
                <section className={index > 0 ? 'border-t border-neutral-200 pt-10' : ''}>
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">{section.title}</h2>
                  <p className="text-neutral-600 text-lg leading-relaxed">{section.content}</p>
                </section>
                {index === 0 && project.projectLink && (
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all text-sm w-fit"
                  >
                    View Project
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                )}
              </React.Fragment>
            ))}

            {/* Final work */}
            <section className="border-t border-neutral-200 pt-10">
              <div className="mb-5">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
                  {String(caseStudy.sections.length + 1).padStart(2, '0')}
                </p>
                <h2 className="text-2xl font-bold text-neutral-900">{caseStudy.finalLabel}</h2>
              </div>
              <ProjectGallery
                images={project.subImages || []}
                title={project.title}
                label={caseStudy.finalLabel}
              />
            </section>
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
