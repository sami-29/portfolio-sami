import css from "../../public/assets/about/css.webp";
import git from "../../public/assets/about/git.webp";
import gsap from "../../public/assets/about/gsap.webp";
import html from "../../public/assets/about/html.webp";
import js from "../../public/assets/about/js.webp";
import NextJs from "../../public/assets/about/NextJs.webp";
import prisma from "../../public/assets/about/Prisma.png";
import php from "../../public/assets/about/php.webp";
import node from "../../public/assets/about/node.webp";
import tailwind from "../../public/assets/about/tailwind.webp";
import python from "../../public/assets/about/python.webp";
import vite from "../../public/assets/about/vite.webp";
import sass from "../../public/assets/about/sass.webp";
import threejs from "../../public/assets/about/three.js.webp";
import typescript from "../../public/assets/about/typescript.webp";
import react from "../../public/assets/about/react.webp";
import mongodb from "../../public/assets/about/mongodb.webp";
import Sql from "../../public/assets/about/Sql.png";
import tRPC from "../../public/assets/about/tRPC.webp";
import NUXT from "../../public/assets/about/NUXT.webp";
import Vue from "../../public/assets/about/Vue.webp";
import ruby from "../../public/assets/about/ruby.png";
import linux from "../../public/assets/about/linux.png";
import rails from "../../public/assets/about/rails.png";
import htmx from "../../public/assets/about/htmx.dark.svg";
import aws from "../../public/assets/about/AWS-Logo.svg";
import go from "../../public/assets/about/Go.svg";
import flask from "../../public/assets/about/Flask.svg";

const cards = [
  {
    title: "HTML5",
    description: "Building modern and accessible web experiences.",
    src: html,
    MostlyUsed: true,
    website: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    title: "CSS3",
    description: "Crafting beautiful, responsive, and user-centric designs.",
    src: css,
    MostlyUsed: true,
    website: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    title: "JavaScript",
    description: "Developing dynamic and interactive web applications.",
    src: js,
    MostlyUsed: true,
    website: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    title: "React",
    description: "Building high-performance and scalable user interfaces.",
    src: react,
    MostlyUsed: true,
    website: "https://react.dev",
  },
  {
    title: "TypeScript",
    description: "Writing robust, maintainable, and error-free code.",
    src: typescript,
    MostlyUsed: true,
    website: "https://www.typescriptlang.org",
  },
  {
    title: "Git",
    description: "Ensuring efficient and collaborative version control.",
    src: git,
    MostlyUsed: true,
    website: "https://git-scm.com",
  },
  {
    title: "SCSS",
    description: "Creating modular and maintainable stylesheets.",
    src: sass,
    MostlyUsed: false,
    website: "https://sass-lang.com",
  },
  {
    title: "Tailwind CSS",
    description: "Implementing rapid and consistent styling.",
    src: tailwind,
    MostlyUsed: true,
    website: "https://tailwindcss.com",
  },
  {
    title: "Node.js",
    description: "Developing powerful and scalable backend services.",
    src: node,
    MostlyUsed: true,
    website: "https://nodejs.org",
  },
  {
    title: "PHP",
    description: "Building robust and reliable server-side applications.",
    src: php,
    MostlyUsed: true,
    website: "https://www.php.net",
  },
  {
    title: "Python",
    description: "Leveraging a versatile and powerful programming language.",
    src: python,
    MostlyUsed: false,
    website: "https://www.python.org",
  },
  {
    title: "Vite",
    description: "Utilizing a next-generation front-end build tool.",
    src: vite,
    MostlyUsed: true,
    website: "https://vitejs.dev",
  },
  {
    title: "Three.js",
    description: "Creating immersive 3D graphics on the web.",
    src: threejs,
    MostlyUsed: false,
    website: "https://threejs.org",
  },
  {
    title: "Gsap",
    description: "Building advanced and high-performance animations.",
    src: gsap,
    MostlyUsed: false,
    website: "https://greensock.com/gsap",
  },
  {
    title: "Next Js",
    description: "Delivering high-performance, server-rendered React apps.",
    src: NextJs,
    MostlyUsed: true,
    website: "https://nextjs.org",
  },
  {
    title: "SQL",
    description: "Managing data with efficient and reliable databases.",
    src: Sql,
    MostlyUsed: true,
    website: "https://www.w3schools.com/sql",
  },
  {
    title: "mongodb",
    description: "Designing flexible and scalable NoSQL databases.",
    src: mongodb,
    MostlyUsed: false,
    website: "https://www.mongodb.com",
  },
  {
    title: "Prisma",
    description: "Simplifying database access with a modern ORM.",
    src: prisma,
    MostlyUsed: true,
    website: "https://www.prisma.io",
  },
  {
    title: "tRPC",
    description: "Building end-to-end typesafe APIs with ease.",
    src: tRPC,
    MostlyUsed: true,
    website: "https://trpc.io",
  },
  {
    title: "Vue",
    description: "Crafting progressive and performant user interfaces.",
    src: Vue,
    MostlyUsed: false,
    website: "https://vuejs.org",
  },
  {
    title: "Nuxt",
    description: "Developing intuitive and powerful Vue.js applications.",
    src: NUXT,
    MostlyUsed: false,
    website: "https://nuxt.com",
  },
  {
    title: "Ruby",
    description: "Writing clean and elegant server-side logic.",
    src: ruby,
    MostlyUsed: false,
    website: "https://www.ruby-lang.org",
  },
  {
    title: "Rails",
    description: "Building full-featured web applications with Ruby on Rails.",
    src: rails,
    MostlyUsed: false,
    website: "https://rubyonrails.org",
  },
  {
    title: "Linux",
    description: "Operating in a powerful and open-source environment.",
    src: linux,
    MostlyUsed: true,
    website: "https://www.linux.org",
  },
  {
    title: "Htmx",
    description: "Enhancing HTML with dynamic, JavaScript-free interactivity.",
    src: htmx,
    MostlyUsed: false,
    website: "https://htmx.org",
  },
  {
    title: "AWS",
    description: "Deploying scalable and reliable cloud-based solutions.",
    src: aws,
    MostlyUsed: true,
    website: "https://aws.amazon.com",
  },
  {
    title: "Go",
    description: "Building fast, concurrent, and scalable applications.",
    src: go,
    MostlyUsed: false,
    website: "https://golang.org",
  },
  {
    title: "Flask",
    description: "Developing lightweight and modular Python web services.",
    src: flask,
    MostlyUsed: false,
    website: "https://flask.palletsprojects.com",
  },
];

export default cards;
