import AboutCard from "../../components/AboutCard";

import css from "../../public/assets/about/css.webp";
import git from "../../public/assets/about/git.webp";
import gsap from "../../public/assets/about/gsap.webp";
import html from "../../public/assets/about/html.webp";
import js from "../../public/assets/about/js.webp";
import NextJs from "../../public/assets/about/NextJs.webp";
import PocketBase from "../../public/assets/about/PocketBase.webp";
import php from "../../public/assets/about/php.webp";
import node from "../../public/assets/about/node.webp";
import tailwind from "../../public/assets/about/tailwind.webp";
import python from "../../public/assets/about/python.webp";
import vite from "../../public/assets/about/vite.webp";
import sass from "../../public/assets/about/sass.webp";
import threejs from "../../public/assets/about/three.js.webp";
import typescript from "../../public/assets/about/typescript.webp";
import react from "../../public/assets/about/react.webp";

const cards = [
  {
    title: "HTML5",
    description: "Basic HTML (Hyper Text Markup Language)",
    src: html,
  },
  {
    title: "CSS3",
    description: "Basic CSS (cascade style sheet)",
    src: css,
  },
  {
    title: "JavaScript",
    description: "I have good knowledge of Javascript es6+",
    src: js,
  },
  {
    title: "React",
    description: "I use React for single page and highly interactive web apps",
    src: react,
  },
  {
    title: "TypeScript",
    description: "I use TypeScript for medium to larger scale web applications",
    src: typescript,
  },
  {
    title: "Git",
    description:
      "I use git to maintain and push my projects to my repositories",
    src: html,
  },
  {
    title: "SCSS",
    description: "I use SCSS over CSS because of its extra features",
    src: sass,
  },
  {
    title: "Tailwind CSS",
    description:
      "I use Tailwind if i don't need very fancy css and wanna keep it minimalistic",
    src: tailwind,
  },
  {
    title: "Node.js",
    description: "Node.js is my go to JavaScript runtime",
    src: node,
  },
  {
    title: "PHP",
    description:
      "I don't use php in my projects but i have enough knowledge about it",
    src: php,
  },
  {
    title: "Python",
    description:
      "I started programming with python and i am comfortable working with it",
    src: python,
  },
  {
    title: "Vite",
    description: "I use vite as my bundler for high performance websites",
    src: vite,
  },
  {
    title: "Three.js",
    description:
      "Three.js is a JavaScript library used to create and display animated 3D computer graphics in the web",
    src: threejs,
  },
  {
    title: "Gsap",
    description:
      "I use Gsap for complex animations and better control over them",
    src: gsap,
  },
  {
    title: "Next Js",
    description:
      "I use Next js for static websites or as my fullstack framework",
    src: NextJs,
  },
  {
    title: "PocketBase",
    description:
      "Open Source backend in 1 file with realtime database, authentication, file storage and admin dashboard",
    src: PocketBase,
  },
];

export default function About() {
  return (
    <main className='mb-10'>
      <div className='flex flex-col font-mono ml-auto mr-auto mt-24 px-4 sm:px:0 sm:w-3/4 xl:w-1/2'>
        <h1 className='text-4xl sm:text-5xl lg:text-6xl dark:text-white '>
          About me
        </h1>
        <p className='text-lg dark:text-gray-400 my-10'>
          I am Bentaleb Sami, a 20 year old algerian computer science student at
          the university of Badji Moukhtar Annaba i am currently third year
          which means i&aposll get my license diploma this year. <br /> I am
          also mostly a self taught web developer with 3 years of experience
          programming i started out with python, just solving leet code and
          project euler problems and fun projects, then i wanted to specialize
          in web development and i found the easier way is to start with
          frontend so i did just that.
          <br />I have made multiple projects which some of them are listed in
          this website some others are in my github and others are retired
          because i have made them in the start of my learning journey so they
          don&apost show the best version of my code.
        </p>
        <h2 className='text-3xl sm:text-4xl lg:text-5xl  dark:text-white '>
          Tools
        </h2>
        <p className='text-base dark:text-white my-10'>
          The tools I use while developing.
        </p>
      </div>
      <div className='select-none px-4 sm:px:0 sm:w-3/4 m-auto grid md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 '>
        {cards.map((card, index) => {
          return (
            <AboutCard
              key={index}
              src={card.src}
              title={card.title}
              description={card.description}
            />
          );
        })}
      </div>
    </main>
  );
}
