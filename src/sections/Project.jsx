import { useState } from "react";
import SlidingTabs from "../components/SlidingTabs";
import Card from "../components/Card";
import { projects } from "../constants";

const Project = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Tab configuration
  const tabs = [
    { id: 'all', label: 'Featured Work' },
    { id: 'painting', label: 'Painting' },
    { id: 'ui-ux', label: 'UI/UX Design' },
    { id: 'animation', label: 'Animation' },
    { id: 'motion', label: 'Motion Graphics' },
    { id: 'graphics', label: 'Graphics Design' },
  ];

  const handleProjectClick = (project) => {
    // Navigate to project detail page
    console.log('Clicked project:', project);
    // window.location.href = `/project/${project.id}`;
    // Or if using React Router: navigate(`/project/${project.id}`);
  };

  return (
    <section className="c-space section-spacing" id="projects">
      {/* Header */}
      <h2 className="text-heading text-center mb-4">My Projects</h2>
      <p className="text-center text-neutral-400 mb-8">
        Explore my creative work across different categories
      </p>

      {/* Sliding Tabs */}
      <SlidingTabs 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      {/* Projects Grid */}
      <div className="px-10 grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[20rem] mt-8">
        {projects[activeTab]?.map((project) => (
          <Card 
            key={project.id}
            project={project}
            onClick={() => handleProjectClick(project)}
          />
        ))}
      </div>
    </section>
  );
};

export default Project;