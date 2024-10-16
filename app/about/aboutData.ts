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
    description: "Provides structure to web content",
    src: html,
    MostlyUsed: true,
  },
  {
    title: "CSS3",
    description: "Styles and formats HTML documents",
    src: css,
    MostlyUsed: true,
  },
  {
    title: "JavaScript",
    description: "Powers web interactivity",
    src: js,
    MostlyUsed: true,
  },
  {
    title: "React",
    description: "UI library for single-page apps",
    src: react,
    MostlyUsed: true,
  },
  {
    title: "TypeScript",
    description: "Static type definitions for JS",
    src: typescript,
    MostlyUsed: true,
  },
  {
    title: "Git",
    description: "Tracks source code changes",
    src: git,
    MostlyUsed: true,
  },
  {
    title: "SCSS",
    description: "Enhanced CSS with variables, nesting",
    src: sass,
    MostlyUsed: false,
  },
  {
    title: "Tailwind CSS",
    description: "Utility-first CSS framework",
    src: tailwind,
    MostlyUsed: true,
  },
  {
    title: "Node.js",
    description: "Runs JS outside a web browser",
    src: node,
    MostlyUsed: true,
  },
  {
    title: "PHP",
    description: "Server-side scripting language",
    src: php,
    MostlyUsed: true,
  },
  {
    title: "Python",
    description: "General-purpose programming language",
    src: python,
    MostlyUsed: false,
  },
  {
    title: "Vite",
    description: "Next-gen front-end build tool",
    src: vite,
    MostlyUsed: true,
  },
  {
    title: "Three.js",
    description: "Creates 3D graphics in web",
    src: threejs,
    MostlyUsed: false,
  },
  {
    title: "Gsap",
    description: "Advanced JS animation library",
    src: gsap,
    MostlyUsed: false,
  },
  {
    title: "Next Js",
    description: "Production React framework",
    src: NextJs,
    MostlyUsed: true,
  },
  {
    title: "SQL",
    description: "Manages large data sets",
    src: Sql,
    MostlyUsed: true,
  },
  {
    title: "mongodb",
    description: "Flexible, JSON-like database",
    src: mongodb,
    MostlyUsed: false,
  },
  {
    title: "Prisma",
    description: "Next-gen ORM for Node.js and TypeScript",
    src: prisma,
    MostlyUsed: true,
  },
  {
    title: "tRPC",
    description: "End-to-end typesafe API toolkit",
    src: tRPC,
    MostlyUsed: true,
  },
  {
    title: "Vue",
    description: "Progressive UI framework",
    src: Vue,
    MostlyUsed: false,
  },
  {
    title: "Nuxt",
    description: "High-level Vue.js framework",
    src: NUXT,
    MostlyUsed: false,
  },
  {
    title: "Ruby",
    description: "High-level, interpreted language",
    src: ruby,
    MostlyUsed: false,
  },
  {
    title: "Rails",
    description: "Web app framework in Ruby",
    src: rails,
    MostlyUsed: false,
  },
  {
    title: "Linux",
    description: "Open-source Unix-like OS",
    src: linux,
    MostlyUsed: true,
  },
  {
    title: "Htmx",
    description: "dynamic HTML interactivity with minimal JavaScript required.",
    src: htmx,
    MostlyUsed: false,
  },
  {
    title: "AWS",
    description:
      "cloud services platform for scalable infrastructure and tools",
    src: aws,
    MostlyUsed: true,
  },
  {
    title: "Go",
    description: "simple, fast, concurrent language for scalable applications.",
    src: go,
    MostlyUsed: false,
  },
  {
    title: "Flask",
    description: "Python web framework",
    src: flask,
    MostlyUsed: false,
  },
];

export default cards;
