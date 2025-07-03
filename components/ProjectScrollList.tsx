"use client";

import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const projects = [
  {
    title: "Creative Portfolio",
    image: "/images/project1.png",
    github: "https://github.com/yourname/project1",
    live: "https://yourwebsite.com/project1",
  },
  {
    title: "Music Visualizer",
    image: "/images/project2.png",
    github: "https://github.com/yourname/project2",
    live: "https://yourwebsite.com/project2",
  },
];

const Card = ({ project }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 100, rotateY: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="project-card"
      initial="hidden"
      animate={controls}
      variants={variants}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        margin: "50px auto",
        width: "300px",
        borderRadius: "15px",
        background: "#111",
        color: "#fff",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        overflow: "hidden",
      }}
    >
      <img
        src={project.image}
        alt={project.title}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h3>{project.title}</h3>
        <div style={{ marginTop: "10px" }}>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginRight: "10px",
              padding: "8px 16px",
              borderRadius: "6px",
              background: "#3498db",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            View Project
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              background: "#2ecc71",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectScrollList = () => {
  return (
    <div style={{ padding: "100px 20px", maxWidth: "1200px", margin: "0 auto" }}>
      {projects.map((project, idx) => (
        <Card key={idx} project={project} />
      ))}
    </div>
  );
};

export default ProjectScrollList;
