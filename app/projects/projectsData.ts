import huddle1 from "../../public/assets/projects/huddle1.webp";
import portal2d from "../../public/assets/projects/portal2d.png";
import linus1 from "../../public/assets/projects/linus1.webp";
import rps1 from "../../public/assets/projects/rps1.webp";
import shadow_foundry from "../../public/assets/projects/shadow_foundry.webp";
import todo1 from "../../public/assets/projects/todo1.webp";
import CDLA from "../../public/assets/projects/CDLA.webp";
import MARE from "../../public/assets/projects/MARE.webp";
import RateMyApp from "../../public/assets/projects/RateMyApp.png";
import eTasc from "../../public/assets/projects/eTasc.png";
import Restaurant_template from "../../public/assets/projects/Restaurant_template.png";
import Tetris_logo from "../../public/assets/projects/Tetris_logo.png";
import portfolio from "../../public/assets/projects/portfolio.png";
import easyai from "../../public/assets/projects/easyai.png";

const projectsData = [
  {
    img: MARE,
    title: "Maritime Risk Assessment Engine (MARE)",
    description:
      "A project built using Mapbox, Turf, D3.js, and Vanilla JavaScript. Due to privacy concerns, I am unable to provide more information about this project.",
    siteUrl: null,
    githubUrl: null,
  },
  {
    img: easyai,
    title: "EasyAI *In development*",
    description:
      "EasyAI is a project I developed to make AI workflows more accessible to non-technical users. The tech stack includes Next.js, ChakraUI, and Supabase. The project is still in development.",
    siteUrl: null,
    githubUrl: null,
  },
  {
    img: RateMyApp,
    title: "RateMyApp",
    description:
      "RateMyApp is a user-driven platform I developed to allow users to submit their applications for constructive critique, donations, or open-source contributions. Bootstrapped with create-t3-app, the tech stack includes Next.js, Clerk (auth), Prisma (ORM), TailwindCss with Daisy UI (UI), Planetscale (database), and Uploadthing (image storage). It also utilizes tanstack, react query, zod, react-hook-form, and dayjs libraries.",
    siteUrl: "https://ratemyapp.vercel.app",
    githubUrl: "https://github.com/sami-29/rate-my-app-t3",
  },
  {
    img: eTasc,
    title: "E-TASC",
    description:
      "This is an annotation and text analysis platform. Due to privacy concerns, I am unable to provide more information about this project.",
    siteUrl: null,
    githubUrl: null,
  },
  {
    img: portfolio,
    title: "Custom portfolio",
    description:
      "This portfolio website was built using Vite, React, Chakra UI, and Framer Motion. It includes an image viewer, a masonry grid, and a fun easteregg. The site is mobile-responsive and simple to navigate.",
    siteUrl: "https://portfolio-jacob.pages.dev/",
    githubUrl: null,
  },

  {
    img: Tetris_logo,
    title: "Tetris solver",
    description:
      "A python program that solves a large number of Tetris games using Heuristics, The games are usually in this format: Given a sequence of X pieces, and an initial board state clear Y lines. It can also be used to create solvable games with their X pieces and Y lines to clear.",
    siteUrl: null,
    githubUrl: null,
  },
  {
    img: Restaurant_template,
    title: "Restaurant Template",
    description:
      "A customizable restaurant website template built using Next.js. It's designed with user experience and ease of use in mind. Technologies used include Next.js 13, Tailwind, FramerFramer Motion, Leaflet,react-hook-form with Yup.",
    siteUrl: "https://restaurant-template-one.vercel.app",
    githubUrl: null,
  },
  {
    img: CDLA,
    title: "Calendrier de l'avent",
    description:
      "I contributed to this project by developing a video carousel for the website in Elementor/WordPress. This was achieved using custom JavaScript, the Swiper library, and jQuery.",
    siteUrl: "https://calendrierdelavent.com",
    githubUrl: null,
  },

  {
    img: shadow_foundry,
    title: "Shadow Foundry.ai",
    description:
      "Shadow Foundry is a static website I created for a client, constructed with HTML, SCSS, and JavaScript. The project also includes the Splide carousel library and self-hosted fonts.",
    siteUrl: "https://shadowfoundry-ai.netlify.app/",
    githubUrl: "https://github.com/bentaleb-dev/Shadow-Foundry.ai",
  },
  {
    img: portal2d,
    title: "2D Portal Effect",
    description:
      'Developed with Vanilla JS, Vite, and Three.js, this project creates a 2D portal effect that zooms into a picture frame, transitioning the user into a "3D world." The effect can be reversed by pressing the escape key.',
    siteUrl: "https://2d-portal.vercel.app",
    githubUrl: "https://github.com/sami-29/2d-portal",
  },
  {
    img: rps1,
    title: "Rock Paper Scissors",
    description:
      "Rock Paper Scissors is a FrontendMentor.io challenge where the user can play the game against the computer. The project was developed using React, TypeScript, and CSS3.",
    siteUrl: "https://sami-29.github.io/rock-paper-scissors-react/",
    githubUrl: "https://github.com/sami-29/rock-paper-scissors-react",
  },
  {
    img: linus1,
    title: "Linus Tech Tips",
    description:
      "Linus Tech Tips is a university project I developed to create a shopping page complete with a cart, product details, and filtering capabilities. The site is named after a popular Canadian tech YouTuber. It was built using PHP, MySQL, and plain CSS3.",
    siteUrl: "https://ltt-dev.000webhostapp.com/",
    githubUrl: "https://github.com/sami-29/linus_tech_tips",
  },
  {
    img: todo1,
    title: "Todo Website",
    description:
      "This todo website was built using React and CSS3. It offers functionalities like adding and removing tasks, marking tasks as done, and switching between a dark and light theme with different backgrounds.",
    siteUrl: "https://todo-list-react.pages.dev/",
    githubUrl: "https://github.com/sami-29/todo-list-react",
  },
  {
    img: huddle1,
    title: "Huddle Landing Page",
    description:
      "The Huddle Landing Page is a mockup website from FrontendMentor.io. It was built using HTML and CSS, with the primary challenge being SVG alignment for optimal compatibility with all screen sizes.",
    siteUrl: "https://sami-29.github.io/huddle-landing-page/",
    githubUrl: "https://github.com/sami-29/huddle-landing-page",
  },
];

export default projectsData;
