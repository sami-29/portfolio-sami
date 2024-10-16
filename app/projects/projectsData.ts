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

const projectsData = [
  {
    img: MARE,
    title: "Maritime Risk Assessment Engine (MARE)",
    description:
      "A project built using Mapbox, Turf, D3.js, and Vanilla Javascript, the rest of the functionality is custom built.",
    siteUrl: null,
    githubUrl: null,
  },
  {
    img: easyai,
    title: "EasyAI *In development*",
    description:
      "EasyAI is a project I developed to make AI workflows more accessible to non-technical users. The tech stack includes Next.js, ChakraUI, and Supabase. the api's used are OpenAI and ComfyUI for custom workflows. The project is currently in development.",
    siteUrl: null,
    githubUrl: null,
  },
  {
    img: Tetris,
    title: "Tetris solver *In development*",
    description:
      "The game rules are: Given a sequence of X pieces, and an initial board state clear Y lines. this python project was used to create very large datasets to train a neural network. which I then used to build a web app using flask for the backend and HTMX + Alpine.js for the frontend, development is in progress.",
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
      "This is an annotation and text analysis platform. it was built using vanilla javascript, HTML, and CSS. the functionality was custom built by me except for Word category which uses the Stanford CoreNLP library.",
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
      "I contributed to this website that's built using Elementor/WordPress. I used custom CSS and jQuery for the parts i worked on.",
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
];

export default projectsData;
