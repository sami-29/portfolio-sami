import Project from "../../components/Project";
import projectsData from "./projectsData";

export default function Projects() {
  return (
    <main className=' dark:bg-gray-900'>
      <div className='flex flex-col px-4 mt-24 ml-auto mr-auto font-mono sm:px:0 sm:w-3/4 xl:w-1/2'>
        <h1 className='text-4xl sm:text-5xl md:text-5xl lg:text-6xl dark:text-white '>
          Projects
        </h1>
        <p className='my-10 text-lg dark:text-gray-400'>
          Here&apos; a small selection of some of my recent projects and
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
