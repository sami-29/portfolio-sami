import Project from "../../components/Project";
import projectsData from "./projectsData";

export default function Projects() {
  return (
    <main className=' dark:bg-gray-900'>
      <div className='flex flex-col font-mono ml-auto mr-auto mt-24 px-4 sm:px:0 sm:w-3/4 xl:w-1/2'>
        <h1 className='text-4xl sm:text-5xl md:text-5xl lg:text-6xl dark:text-white '>
          Projects
        </h1>
        <p className='text-lg dark:text-gray-400 my-10'>
          Here&aposs a small selection of some of my recent projects and
          experiences.
        </p>
        {projectsData.map((project, index) => {
          return (
            <Project
              key={index}
              img={project.img}
              title={project.title}
              description={project.description}
              siteUrl={project.siteUrl}
              githubUrl={project.githubUrl}
            />
          );
        })}
      </div>
    </main>
  );
}
