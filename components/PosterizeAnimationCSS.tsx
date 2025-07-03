"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Spline from "@splinetool/react-spline";
import PosterizeBackground from "./PosterizeBackground";
import TitleGlitch from "./TitleGlitch";
import { motion } from "framer-motion";

// 💡 Replace with your actual projects
const projects = [
  {
    title: "Project Evaluator",
    image: "/images/project-evaluator.png", // Save your third screenshot as this file
    description:
      "A collaborative platform for structured and transparent project evaluation.",
    demo: "https://lapas.vercel.app/",
    github: "#",
    images: [
      "/images/project-evaluator-1.png",
      "/images/project-evaluator-2.png",
      "/images/project-evaluator-3.png",
    ],
  },
    {
    title: "Spline Room Demo",
    image: "/images/spline-room.png", // Save your fourth screenshot as this file
    description: "3D interactive room prototype. Showcases spatial design and interactivity.",
    demo: "#",
    github: "#",
        images: [
      "/images/project-evaluator-1.png",
      "/images/project-evaluator-2.png",
      "/images/project-evaluator-3.png",
    ],
  },
      {
    title: "Coconut & Cardamom",
    image: "/images/coconut-cardamom.png", // Save your first screenshot as this file
    description:
      "Authentic Kerala Spices & Cuisine in Riga. Coming soon landing page.",
    demo: "https://coconutandcardamom.eu", // Add your demo link if available
    github: "#",  // Add your GitHub link if available
         images: [
      "/images/project-evaluator-1.png",
      "/images/project-evaluator-2.png",
      "/images/project-evaluator-3.png",
    ],
  },
  {
    title: "BookNow",
    image: "/images/booknow.png", // Save your second screenshot as this file
    description: "Project that showcases a seamless booking experience. Interactive and user-friendly.",
    demo: "https://booknoweu.com/",
    github: "#",
        images: [
      "/images/project-evaluator-1.png",
      "/images/project-evaluator-2.png",
      "/images/project-evaluator-3.png",
    ],
  },


];

const aboutMeText = `
Need a standout website or digital experience? I'm a creative developer who helps brands and individuals build modern, interactive, and visually rich platforms that leave a lasting impression.

From 3D visuals and animations to sleek, responsive design—I turn concepts into dynamic experiences that feel alive and perform beautifully.

If you're looking for someone who can design, develop, and elevate your online presence—let's work together!
`;

// 🎴 ProjectCard component
const ProjectCard = ({
  title,
  image,
  images = [],
  description,
  demo,
  github,
  style = {},
  onClick,
  onImageClick,
}: {
  title: string;
  image: string;
  images?: string[];
  description?: string;
  demo?: string;
  github?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onImageClick?: () => void;
}) => {
  const [current, setCurrent] = useState(0);

  // Use images array if available, else fallback to single image
  const slides = images && images.length > 0 ? images : [image];

  // Slide navigation handlers
  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Example: Set color palette based on project image (hardcoded for each project)
  let palette = {
    title: "#8C3AE4",      // gold/yellow
    text: "#F9F9FB",       // light gray
    buttonBg: "#4E409D",   // gold/yellow
    buttonText: "#4E409D", // dark
    border: "#8C3AE4",     // gold/yellow
  };

  if (image.includes("spline-room")) {
    palette = {
      title: "#DB8024",   // teal
      text: "#FFF5E1",     // light teal
      buttonBg: "#7DE2D1",
      buttonText: "#181818",
      border: "#7DE2D1",
    };
  } else if (image.includes("coconut-cardamom")) {
    palette = {
      title: "#008148",    // coconut orange
      text: "#D1F7FF",     // coconut cream
      buttonBg: "#F7B267",
      buttonText: "#181818",
      border: "#008148",
    };
  } else if (image.includes("booknow")) {
    palette = {
      title: "#A717EE",    // lime green
      text: "#E6FCD9",     // light green
      buttonBg: "#A3E635",
      buttonText: "#181818",
      border: "#A717EE",
    };
  }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center scroll-snap-align"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={style}
      onClick={onClick}
    >
      <div
        className="bg-white/10 backdrop-blur-md rounded-xl p-4 w-full max-w-md shadow-lg border transition-all hover:scale-105 duration-300"
        style={{ borderColor: palette.border }}
      >
        <div style={{ position: "relative", width: "100%", height: "192px" }}>
          <img
            src={slides[current]}
            alt={title}
            className="rounded-lg mb-3 w-full object-cover h-48 cursor-zoom-in"
            onClick={e => {
              e.stopPropagation();
              onImageClick && onImageClick();
            }}
            style={{ transition: "opacity 0.3s" }}
          />
          {slides.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition"
                style={{ zIndex: 2 }}
                aria-label="Previous image"
              >
                &#8592;
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition"
                style={{ zIndex: 2 }}
                aria-label="Next image"
              >
                &#8594;
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {slides.map((_, idx) => (
                  <span
                    key={idx}
                    className={`inline-block w-2 h-2 rounded-full ${idx === current ? "bg-white" : "bg-white/40"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <h2
          className="text-xl font-bold mb-2"
          style={{ color: palette.title, textShadow: "0 1px 8px rgba(0,0,0,0.18)" }}
        >
          {title}
        </h2>
        {description && (
          <p
            className="mb-3"
            style={{ color: palette.text }}
          >
            {description}
          </p>
        )}
        <div className="flex gap-4">
          {demo && (
            <a
              href={demo}
              target="_blank"
              className="px-3 py-1.5 bg-white text-black rounded hover:bg-gray-200 transition"
            >
              View Demo
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              className="px-3 py-1.5 border border-white text-white rounded hover:bg-white hover:text-black transition"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const imageAssets = [
  "/images/posterize-high.png",
  "/images/zoomout.png",
  "/images/green screen 1.png",
];

const splineSceneUrl = "https://prod.spline.design/oD33zQ6pWq4NjV22/scene.splinecode";

const PosterizeAnimationCSS = () => {
  const [playClicked, setPlayClicked] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [hoveringArt, setHoveringArt] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [showDamn, setShowDamn] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [openProjectIdx, setOpenProjectIdx] = useState<number | null>(null);
  const [showSubtitle, setShowSubtitle] = useState(false);

  // Preload assets (as before)
  useEffect(() => {
    let cancelled = false;
    const preloadImages = () =>
      Promise.all(
        imageAssets.map(
          (src) =>
            new Promise<void>((resolve) => {
              const img = new window.Image();
              img.src = src;
              img.onload = () => resolve();
              img.onerror = () => resolve();
            })
        )
      );
    const preloadSpline = () =>
      fetch(splineSceneUrl, { method: "GET" }).then(() => {});
    Promise.all([preloadImages(), preloadSpline()]).then(() => {
      if (!cancelled) setAssetsLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!assetsLoaded) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-black flex items-center justify-center text-white text-xl z-50">
        Loading...
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black overflow-hidden overflow-x-hidden text-white" style={{ overflowX: "hidden" }}>
      {/* Background Spline */}
      {playClicked && (
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
          <Spline scene={splineSceneUrl} style={{ width: "100%", height: "100%" }} />
        </div>
      )}

      {/* Foreground Content */}
      <div className="absolute inset-0 w-full h-full z-10 overflow-y-auto hide-scrollbar" style={{ scrollSnapType: "none", scrollBehavior: "smooth" }}>
        {!playClicked && (
          <PosterizeBackground
            playClicked={playClicked}
            hoveringArt={hoveringArt}
            parallax={{ x: 0, y: 0 }}
            imageWidth={1920}
            imageHeight={1080}
          />
        )}

        <motion.div
          initial={false}
          animate={
            playClicked
              ? { marginTop: "2rem", scale: 0.7 }
              : { marginTop: "12vh", scale: 1 }
          }
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center", // <-- center everything horizontally
            zIndex: 20,
            position: "relative",
          }}
        >
          <div
            onMouseEnter={() => setShowSubtitle(true)}
            onMouseLeave={() => setShowSubtitle(false)}
            style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <div style={{ width: "fit-content", textAlign: "center" }}>
              <TitleGlitch
                showDamn={showDamn}
                glitching={glitching}
                hoveringArt={hoveringArt}
                handleArtEnter={() => setHoveringArt(true)}
                handleArtLeave={() => setHoveringArt(false)}
                playBtnRef={null}
                playIconRef={null}
                handlePlay={() => setPlayClicked(true)}
                handlePointerMove={() => {}}
                handlePointerLeave={() => {}}
              />
              {/* Subtitle appears on hover */}
            </div>
          </div>
        </motion.div>

        {playClicked && showScrollHint && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 opacity-70 pointer-events-none">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path
                d="M7 11L14 18L21 11"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        {/* Project Cards Row */}
        {playClicked && (
          <div className="w-full flex justify-center py-12" style={{ margin: 0, padding: 0 }}>
            <div
              className="flex flex-row gap-8 w-full justify-center hide-scrollbar"
              style={{
                overflowX: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              {projects.map((proj, idx) => (
                <ProjectCard
                  key={idx}
                  title={proj.title}
                  image={proj.image}
                  description={proj.description}
                  demo={proj.demo}
                  github={proj.github}
                  style={{
                    width: "280px",
                    maxHeight: "280px",
                    height: "280px",
                    minWidth: "280px",
                    maxWidth: "280px",
                    cursor: "pointer",
                    margin: 0,
                  }}
                  onClick={() => setOpenProjectIdx(null)} // disables card click opening
                  onImageClick={() => setOpenProjectIdx(idx)} // only image opens
                />
              ))}
            </div>
            <style jsx global>{`
              .hide-scrollbar {
                scrollbar-width: none;
              }
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        )}

        {/* About Me card as a vertical section after horizontal cards */}
        {playClicked && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex justify-center items-center min-h-[70vh] w-full"
            style={{ marginTop: "8vh", marginLeft: 0, marginRight: 0, paddingLeft: 0, paddingRight: 0 }}
          >
            <div
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 w-full flex flex-col items-center justify-center"
              style={{ maxWidth: 480, margin: 0 }}
            >
              <h2 className="text-2xl font-bold mb-3 text-center">About Me</h2>
              <p className="text-white/80 whitespace-pre-line text-center">{aboutMeText}</p>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        {playClicked && (
          <motion.footer
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center justify-center w-full mt-16 mb-6"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-8 py-6 w-full flex flex-col items-center justify-center"
              style={{ maxWidth: 480 }}>
              <div className="flex gap-6 mb-3">
                <a
                  href="https://www.linkedin.com/in/abil-sebastian-online/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hover:text-blue-400 transition"
                >
                  <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.845-1.563 3.043 0 3.604 2.004 3.604 4.609v5.587z"/></svg>
                </a>
                <a
                  href="https://github.com/Abilsebastian"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="hover:text-gray-300 transition"
                >
                  <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576 4.765-1.588 8.199-6.084 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a
                  href="https://instagram.com/YOUR_INSTAGRAM"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:text-pink-400 transition"
                >
                  <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.851s-.011 3.584-.069 4.85c-.062 1.367-.334 2.634-1.308 3.608-.975.974-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608-.058-1.266-.069-1.646-.069-4.85s.011-3.585.069-4.851c.062-1.367.334-2.634 1.308-3.608.975-.974 2.242-1.246 3.608-1.308 1.266-.058 1.646-.069 4.85-.069zm0-2.163c-3.259 0-3.667.012-4.947.07-1.276.058-2.687.334-3.678 1.325-.991.991-1.267 2.402-1.325 3.678-.058 1.28-.07 1.688-.07 4.947s.012 3.667.07 4.947c.058 1.276.334 2.687 1.325 3.678.991.991 2.402 1.267 3.678 1.325 1.28.058 1.688.07 4.947.07s3.667-.012 4.947-.07c1.276-.058 2.687-.334 3.678-1.325.991-.991 1.267-2.402 1.325-3.678.058-1.28.07-1.688.07-4.947s-.012-3.667-.07-4.947c-.058-1.276-.334-2.687-1.325-3.678-.991-.991-2.402-1.267-3.678-1.325-1.28-.058-1.688-.07-4.947-.07zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                </a>
              </div>
              <div className="text-xs text-white/60 text-center">
                &copy; {new Date().getFullYear()} Abil Sebastian. All rights reserved.
              </div>
            </div>
          </motion.footer>
        )}
      </div>

      {/* Project Image Gallery Overlay */}
      {openProjectIdx !== null && (
        <div
          onClick={() => setOpenProjectIdx(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "zoom-out",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "2rem",
              cursor: "auto",
            }}
            onClick={e => e.stopPropagation()}
          >
            <iframe
              src={projects[openProjectIdx].demo}
              title={projects[openProjectIdx].title}
              style={{
                width: "90vw",
                maxWidth: 900,
                height: "80vh",
                border: "none",
                borderRadius: "1rem",
                background: "#fff",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
          {/* Optional close button */}
          <button
            onClick={() => setOpenProjectIdx(null)}
            style={{
              position: "absolute",
              top: 32,
              right: 32,
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: 40,
              height: 40,
              fontSize: 24,
              cursor: "pointer",
              zIndex: 10000,
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default PosterizeAnimationCSS;
