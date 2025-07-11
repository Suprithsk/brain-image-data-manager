import React from 'react';

const ProjectList = () => {

  const projects = ['000-0-001'];

  const handleProjectClick = (title) => {
    console.log('Selected Project:', title);

  };

  return (
    <div className="flex flex-wrap p-4">
      {projects.map((title) => (
        <div
          key={title}
          onClick={() => handleProjectClick(title)}
          className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 m-4 w-full max-w-sm"
        >
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
