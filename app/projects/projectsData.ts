import type { Project } from "./types";
import { ProjectTags } from "./tags";
import progres0 from "../../public/assets/projects/progres0.png";
import progres1 from "../../public/assets/projects/progres1.png";
import progres2 from "../../public/assets/projects/progres2.png";
import progres3 from "../../public/assets/projects/progres3.png";
import progres4 from "../../public/assets/projects/progres4.png";
import progres5 from "../../public/assets/projects/progres5.png";
import portal2d from "../../public/assets/projects/portal2d.png";
import linus1 from "../../public/assets/projects/linus1.webp";
import rps1 from "../../public/assets/projects/rps1.webp";
import shadow_foundry from "../../public/assets/projects/shadow_foundry.webp";
import CDLA from "../../public/assets/projects/CDLA.webp";
import MARE from "../../public/assets/projects/MARE.webp";
import RateMyApp from "../../public/assets/projects/RateMyApp.png";
import eTasc from "../../public/assets/projects/eTasc.png";
import Restaurant_template from "../../public/assets/projects/Restaurant_template.png";
import Tetris from "../../public/assets/projects/Tetris.png";
import portfolio from "../../public/assets/projects/portfolio.png";
import easyai from "../../public/assets/projects/easyai.png";
import easyai1 from "../../public/assets/projects/easyai1.png";
import easyai2 from "../../public/assets/projects/easyai2.png";
import easyai3 from "../../public/assets/projects/easyai3.png";
import easyai4 from "../../public/assets/projects/easyai4.png";
import easyai5 from "../../public/assets/projects/easyai5.png";
import personalFitness from "../../public/assets/projects/personalFitness.png";
import runematch from "../../public/assets/projects/runematch.png";
import runematch2 from "../../public/assets/projects/runematch2.png";
import tracktalk1 from "../../public/assets/projects/tracktalk1.png";
import tracktalk2 from "../../public/assets/projects/tracktalk2.png";
import tracktalk3 from "../../public/assets/projects/tracktalk3.png";
import tracktalk4 from "../../public/assets/projects/tracktalk4.png";
import pharma from "../../public/assets/projects/pharma.png";
import pharma2 from "../../public/assets/projects/pharma2.png";
import pharma3 from "../../public/assets/projects/pharma3.png";
import pharma4 from "../../public/assets/projects/pharma4.png";
import scl1 from "../../public/assets/projects/2scl1.png";
import scl2 from "../../public/assets/projects/2scl2.png";
import scl3 from "../../public/assets/projects/2scl3.png";
import scl4 from "../../public/assets/projects/2scl4.png";
import scl5 from "../../public/assets/projects/2scl5.png";

const projectsData: Project[] = [
  {
    images: [
      {
        src: MARE,
        alt: "Maritime Risk Assessment Engine Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
    ],
    slug: "MARE",
    title: "Maritime Risk Assessment Engine (MARE)",
    description:
      "A project built using Mapbox, Turf, D3.js, and Vanilla Javascript, the rest of the functionality is custom built.",
    tags: [ProjectTags.PROFESSIONAL, ProjectTags.DATA_VIZ],
    siteUrl: null,
    githubUrl: null,
  },
  {
    images: [
      {
        src: scl1,
        alt: "2scl Platform Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
      {
        src: scl2,
        alt: "2scl Platform Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
      {
        src: scl3,
        alt: "2scl Platform Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
      {
        src: scl4,
        alt: "2scl Platform Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
      {
        src: scl5,
        alt: "2scl Platform Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
    ],
    slug: "2scl",
    title: "2scl",
    tags: [
      { label: "In Development", colorScheme: "purple" },
      { label: "Client Project", colorScheme: "orange" },
    ],
    description:
      "2scl is a sustainable development goals platform for cities to manage their goals and track their progress/compare it to previous times/years as well as AI integration and assistant. It also features a budget/objectives/alerts/resources tracker, automatic API integration with manual data entry fallback, and calculation of all 17 SDGs indicators. In addition to the platform itself is the presentation site for the project",
    siteUrl: null,
    githubUrl: null,
  },
  {
    images: [
      {
        src: progres1,
        alt: "Progres Student Portal Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
      {
        src: progres0,
        alt: "Progres Student Portal Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
      {
        src: progres2,
        alt: "Progres Student Portal Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
      {
        src: progres3,
        alt: "Progres Student Portal Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
      {
        src: progres4,
        alt: "Progres Student Portal Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
      {
        src: progres5,
        alt: "Progres Student Portal Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
    ],
    slug: "progres",
    title: "Progres",
    tags: [
      ProjectTags.PERSONAL,
      ProjectTags.ASTRO,
      ProjectTags.CLOUDFLARE_WORKERS,
    ],
    description:
      "A separate frontend for the official Algerian university student portal 'Progres'. This web app addresses many bugs of the official portal, offering a significantly improved UI/UX, enhanced privacy, and a better overall student experience. Built with Astro and hosted on Cloudflare Workers, it interfaces directly with the official university API.",
    siteUrl: null,
    githubUrl: null,
  },

  {
    images: [
      {
        src: easyai,
        alt: "EasyAI Platform Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
      {
        src: easyai1,
        alt: "EasyAI Platform Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
      {
        src: easyai2,
        alt: "EasyAI Platform Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
      {
        src: easyai3,
        alt: "EasyAI Platform Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
      {
        src: easyai4,
        alt: "EasyAI Platform Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
      {
        src: easyai5,
        alt: "EasyAI Platform Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
    ],
    slug: "EasyAi",
    title: "EasyAI",
    tags: [
      { label: "In Development", colorScheme: "purple" },
      { label: "Personal Project", colorScheme: "blue" },
    ],
    description:
      "EasyAI is a project I developed to make AI workflows more accessible to non-technical users. The tech stack includes Next.js, ChakraUI, and Supabase. the api's used are OpenAI and ComfyUI for custom workflows. The project is currently in development.",
    siteUrl: null,
    githubUrl: null,
  },
  {
    images: [
      {
        src: pharma4,
        alt: "Pharma Platform Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
      {
        src: pharma,
        alt: "Pharma Platform Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
      {
        src: pharma2,
        alt: "Pharma Platform Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
      {
        src: pharma3,
        alt: "Pharma Platform Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
    ],
    slug: "pharma",
    title: "SmartSig",
    tags: [
      { label: "In Development", colorScheme: "purple" },
      { label: "Client Project", colorScheme: "orange" },
    ],
    description:
      "Pharma is dashboard for pharmacies to manage sigs, weekly reports, standardize sig naming using permutations, powered by AI to double check the accuracy of the data.",
    siteUrl: null,
    githubUrl: null,
  },
  {
    images: [
      {
        src: Tetris,
        alt: "Tetris Solver Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
    ],
    slug: "tetris-solver",
    title: "Tetris solver",
    tags: [
      { label: "In Development", colorScheme: "purple" },
      { label: "Learning Project", colorScheme: "green" },
    ],
    description:
      "The game rules are: Given a sequence of X pieces, and an initial board state clear Y lines. this python project was used to create very large datasets to train a neural network. which I then used to build a web app using flask for the backend and HTMX + Alpine.js for the frontend, development is in progress.",
    siteUrl: null,
    githubUrl: null,
  },
  {
    images: [
      {
        src: runematch,
        alt: "RuneMatch Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
      {
        src: runematch2,
        alt: "RuneMatch Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
    ],
    slug: "RuneMatch",
    title: "RuneMatch",
    tags: [ProjectTags.CLIENT, ProjectTags.IN_DEVELOPMENT, ProjectTags.NEXTJS],
    description:
      "RuneMatch is a casino game that allows users to trade their runescape In-game gold for credits which can be used to play multiple runescape themed games.",
    siteUrl: "https://runematch.vercel.app/",
    githubUrl: null,
  },
  {
    images: [
      {
        src: tracktalk1,
        alt: "TrackTalk Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
      {
        src: tracktalk2,
        alt: "TrackTalk Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
      {
        src: tracktalk3,
        alt: "TrackTalk Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
      {
        src: tracktalk4,
        alt: "TrackTalk Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
    ],
    slug: "tracktalk",
    title: "TrackTalk",
    tags: [ProjectTags.CLIENT, ProjectTags.IN_DEVELOPMENT, ProjectTags.NEXTJS],
    description:
      "TrackTalk is a Music Streaming Platform. I developed this project using Next.js, Supabase, and TailwindCSS. The project is currently in development.",
    siteUrl: null,
    githubUrl: null,
  },
  {
    images: [
      {
        src: RateMyApp,
        alt: "RateMyApp Platform Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
    ],
    slug: "ratemyapp",
    title: "RateMyApp",
    tags: [
      { label: "Personal Project", colorScheme: "blue" },
      { label: "Next.js", colorScheme: "gray" },
    ],
    description:
      "RateMyApp is a user-driven platform I developed to allow users to submit their applications for constructive critique, donations, or open-source contributions. Bootstrapped with create-t3-app, the tech stack includes Next.js, Clerk (auth), Prisma (ORM), TailwindCss with Daisy UI (UI), Planetscale (database), and Uploadthing (image storage). It also utilizes tanstack, react query, zod, react-hook-form, and dayjs libraries.",
    siteUrl: "https://ratemyapp.vercel.app",
    githubUrl: "https://github.com/sami-29/rate-my-app-t3",
  },
  {
    images: [
      {
        src: eTasc,
        alt: "E-TASC Platform Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
    ],
    slug: "eTasc",
    title: "E-TASC",
    description:
      "This is an annotation and text analysis platform. it was built using vanilla javascript, HTML, and CSS. the functionality was custom built by me except for Word category which uses the Stanford CoreNLP library.",
    tags: [
      { label: "Professional", colorScheme: "blue" },
      { label: "NLP", colorScheme: "green" },
    ],
    siteUrl: null,
    githubUrl: null,
  },
  {
    images: [
      {
        src: portfolio,
        alt: "Portfolio Website Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
    ],
    slug: "customPortfolio",
    title: "Custom portfolio",
    description:
      "This minimalist portfolio website was built using Vite, React, React Router, TailwindCSS, and Framer Motion. It includes an image viewer, a masonry grid, and a fun easteregg. The site is mobile-responsive and simple to navigate.",
    tags: [
      { label: "Client Project", colorScheme: "orange" },
      { label: "React", colorScheme: "cyan" },
    ],
    siteUrl: "https://portfolio-jacob.pages.dev/",
    githubUrl: null,
  },
  {
    images: [
      {
        src: personalFitness,
        alt: "Personal Fitness Website Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
    ],
    slug: "personalFitnessWebsite",
    title: "Personal Fitness website",
    description:
      "This personal fitness website was built using Next.js, wispCMS, TypeScript, TailwindCSS, Framer Motion, Leaflet, and Umami.is for analytics. It's mobile-responsive and simple to navigate.",
    tags: [
      { label: "Client Project", colorScheme: "orange" },
      { label: "Next.js", colorScheme: "gray" },
    ],
    siteUrl: "https://icpersonaltraining.com/",
    githubUrl: null,
  },
  {
    images: [
      {
        src: Restaurant_template,
        alt: "Restaurant Template Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
    ],
    slug: "restaurantTemplate",
    title: "Restaurant Template",
    description:
      "A customizable restaurant website template built using Next.js. It's designed with user experience and ease of use in mind. Technologies used include Next.js 13, Tailwind, FramerFramer Motion, Leaflet,react-hook-form with Yup.",
    tags: [
      { label: "Template", colorScheme: "yellow" },
      { label: "Next.js", colorScheme: "gray" },
    ],
    siteUrl: "https://restaurant-template-one.vercel.app",
    githubUrl: null,
  },
  {
    images: [
      {
        src: CDLA,
        alt: "Calendrier de l'avent Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
    ],
    slug: "calendrierDeLavent",
    title: "Calendrier de l'avent",
    description:
      "I contributed to this website that's built using Elementor/WordPress. I used custom CSS and jQuery for the parts i worked on.",
    tags: [
      { label: "Client Project", colorScheme: "orange" },
      { label: "WordPress", colorScheme: "pink" },
    ],
    siteUrl: "https://calendrierdelavent.com",
    githubUrl: null,
  },

  {
    images: [
      {
        src: shadow_foundry,
        alt: "Shadow Foundry Website Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
    ],
    slug: "shadowFoundryAi",
    title: "Shadow Foundry.ai",
    description:
      "Shadow Foundry is a static website I created for a client, constructed with HTML, SCSS, and JavaScript. The project also includes the Splide carousel library and self-hosted fonts.",
    tags: [
      { label: "Client Project", colorScheme: "orange" },
      { label: "Static Site", colorScheme: "teal" },
    ],
    siteUrl: "https://shadowfoundry-ai.netlify.app/",
    githubUrl: "https://github.com/bentaleb-dev/Shadow-Foundry.ai",
  },
  {
    images: [
      {
        src: portal2d,
        alt: "2D Portal Effect Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
    ],
    slug: "2dPortal",
    title: "2D Portal Effect",
    description:
      'Developed with Vanilla JS, Vite, and Three.js, this project creates a 2D portal effect that zooms into a picture frame, transitioning the user into a "3D world." The effect can be reversed by pressing the escape key.',
    tags: [
      { label: "Learning Project", colorScheme: "green" },
      { label: "Three.js", colorScheme: "purple" },
    ],
    siteUrl: "https://2d-portal.vercel.app",
    githubUrl: "https://github.com/sami-29/2d-portal",
  },
  {
    images: [
      {
        src: rps1,
        alt: "Rock Paper Scissors Game Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
    ],
    slug: "RPS",
    title: "Rock Paper Scissors",
    description:
      "Rock Paper Scissors is a FrontendMentor.io challenge where the user can play the game against the computer. The project was developed using React, TypeScript, and CSS3.",
    tags: [
      { label: "Learning Project", colorScheme: "green" },
      { label: "React", colorScheme: "cyan" },
    ],
    siteUrl: "https://sami-29.github.io/rock-paper-scissors-react/",
    githubUrl: "https://github.com/sami-29/rock-paper-scissors-react",
  },
  {
    images: [
      {
        src: linus1,
        alt: "Linus Tech Tips Website Screenshot",
        isSpecial: false,
        isCustomStyles: false,
      },
    ],
    slug: "LTS",
    title: "Linus Tech Tips",
    description:
      "Linus Tech Tips is a university project I developed to create a shopping page complete with a cart, product details, and filtering capabilities. The site is named after a popular Canadian tech YouTuber. It was built using PHP, MySQL, and plain CSS3.",
    tags: [
      { label: "Learning Project", colorScheme: "green" },
      { label: "PHP", colorScheme: "purple" },
    ],
    siteUrl: "https://ltt-dev.000webhostapp.com/",
    githubUrl: "https://github.com/sami-29/linus_tech_tips",
  },
];

export default projectsData;
