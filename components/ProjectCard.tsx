// components/ProjectCard.tsx
import React from "react";

interface ProjectCardProps {
  title: string;
  image: string;
  description?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, image, description }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 w-[90%] max-w-xl shadow-lg border border-white/20 transition-all hover:scale-105 duration-300">
        <img src={image} alt={title} className="rounded-lg mb-4 w-full object-cover" />
        <h2 className="text-2xl font-semibold text-white mb-2">{title}</h2>
        {description && <p className="text-white/80">{description}</p>}
      </div>
    </div>
  );
};

export default ProjectCard;
