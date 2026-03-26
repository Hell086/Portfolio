import { useState } from "react";
import SlidingTabs from "../components/SlidingTabs";
import Card from "../components/Card";
import { projects } from "../constants";

const Project = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "Featured Work" },
    { id: "painting", label: "Painting" },
    { id: "ui-ux", label: "UI/UX Design" },
    { id: "animation", label: "Animation" },
    { id: "motion", label: "Motion Graphics" },
    { id: "graphics", label: "Graphics Design" },
  ];

  const handleProjectClick = (project) => {
    console.log("Clicked project:", project);
  };

  return (
    <section className="c-space section-spacing " id="projects">
      {/* Header */}
      <h2 className="text-heading text-center mb-3">My Projects</h2>
      <p className="text-center text-neutral-400 mb-8">
        Explore my creative work across different disciplines
      </p>

      {/* Tabs */}
      <SlidingTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-6 md:auto-rows-[18rem]">
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
