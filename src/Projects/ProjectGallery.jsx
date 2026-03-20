import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const ProjectGallery = ({ images = [], coverImage, title }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Build full gallery: cover image first, then subImages
  const allImages = [
    ...(coverImage ? [{ src: coverImage, label: 'Cover' }] : []),
    ...images.map((src, i) => ({ src, label: `Image ${i + 1}` })),
  ];

  const openLightbox = (index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const goPrev = useCallback(() => {
    setActiveIndex(i => (i - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  const goNext = useCallback(() => {
    setActiveIndex(i => (i + 1) % allImages.length);
  }, [allImages.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxOpen, goPrev, goNext]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen]);

  if (allImages.length === 0) return null;

  // ── Layout variants based on image count ──────────────────────────────────
  const renderGrid = () => {
    if (allImages.length === 1) {
      return (
        <div className="w-full aspect-video rounded-2xl overflow-hidden cursor-zoom-in" onClick={() => openLightbox(0)}>
          <img src={allImages[0].src} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        </div>
      );
    }

    if (allImages.length === 2) {
      return (
        <div className="grid grid-cols-2 gap-3">
          {allImages.map((img, i) => (
            <div key={i} className="aspect-video rounded-2xl overflow-hidden cursor-zoom-in" onClick={() => openLightbox(i)}>
              <img src={img.src} alt={`${title} ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      );
    }

    if (allImages.length === 3) {
      return (
        <div className="grid grid-cols-2 gap-3">
          <div className="row-span-2 rounded-2xl overflow-hidden cursor-zoom-in" onClick={() => openLightbox(0)}>
            <img src={allImages[0].src} alt={`${title} 1`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          {allImages.slice(1).map((img, i) => (
            <div key={i} className="aspect-video rounded-2xl overflow-hidden cursor-zoom-in" onClick={() => openLightbox(i + 1)}>
              <img src={img.src} alt={`${title} ${i + 2}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      );
    }

    // 4+ images: masonry-style grid with "View all" overlay on last
    const visibleImages = allImages.slice(0, 4);
    const remaining = allImages.length - 4;

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {/* Large featured first image */}
        <div className="col-span-2 md:col-span-2 aspect-video rounded-2xl overflow-hidden cursor-zoom-in" onClick={() => openLightbox(0)}>
          <img src={visibleImages[0].src} alt={`${title} 1`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        </div>

        {/* Side images */}
        {visibleImages.slice(1, 3).map((img, i) => (
          <div key={i} className="aspect-square rounded-2xl overflow-hidden cursor-zoom-in" onClick={() => openLightbox(i + 1)}>
            <img src={img.src} alt={`${title} ${i + 2}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        ))}

        {/* Bottom row */}
        {visibleImages[3] && (
          <div
            className="aspect-video rounded-2xl overflow-hidden cursor-zoom-in relative"
            onClick={() => openLightbox(3)}
          >
            <img src={visibleImages[3].src} alt={`${title} 4`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            {remaining > 0 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-2xl">
                <div className="text-center">
                  <p className="text-white text-3xl font-black">+{remaining}</p>
                  <p className="text-white/70 text-sm mt-1">more photos</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
          Gallery · {allImages.length} {allImages.length === 1 ? 'image' : 'images'}
        </h3>
        {allImages.length > 1 && (
          <button
            onClick={() => openLightbox(0)}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors"
          >
            View all
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        )}
      </div>

      {renderGrid()}

      {/* ── Lightbox ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-5 right-5 z-60 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              onClick={closeLightbox}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-60 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium">
              {activeIndex + 1} / {allImages.length}
            </div>

            {/* Prev */}
            {allImages.length > 1 && (
              <button
                className="absolute left-4 md:left-8 z-60 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Main image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={allImages[activeIndex].src}
                alt={`${title} ${activeIndex + 1}`}
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            {/* Next */}
            {allImages.length > 1 && (
              <button
                className="absolute right-4 md:right-8 z-60 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                onClick={(e) => { e.stopPropagation(); goNext(); }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Thumbnail strip */}
            {allImages.length > 1 && (
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-2xl max-w-[90vw] overflow-x-auto">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                    className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      i === activeIndex ? 'border-blue-500 opacity-100' : 'border-transparent opacity-50 hover:opacity-75'
                    }`}
                  >
                    <img src={img.src} alt={`thumb ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectGallery;