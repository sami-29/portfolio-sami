import type { Project } from "./types";
import { ProjectTags } from "./tags";
import progres0 from "../../public/assets/projects/progres0.png";
import progres1 from "../../public/assets/projects/progres1.png";
import progres2 from "../../public/assets/projects/progres2.png";
import progres3 from "../../public/assets/projects/progres3.png";
import progres4 from "../../public/assets/projects/progres4.png";
import progres5 from "../../public/assets/projects/progres5.png";
import MARE from "../../public/assets/projects/MARE.webp";
import eTasc from "../../public/assets/projects/eTasc.png";
import Tetris from "../../public/assets/projects/Tetris.png";
import Tetris2 from "../../public/assets/projects/Tetris2.png";
import portfolio1 from "../../public/assets/projects/portfolio1.jpg";
import portfolio2 from "../../public/assets/projects/portfolio2.png";
import portfolio3 from "../../public/assets/projects/portfolio3.png";
import portfolio4 from "../../public/assets/projects/portfolio4.png";
import portfolio5 from "../../public/assets/projects/portfolio5.png";
import easyai from "../../public/assets/projects/easyai.png";
import easyai1 from "../../public/assets/projects/easyai1.png";
import easyai2 from "../../public/assets/projects/easyai2.png";
import easyai3 from "../../public/assets/projects/easyai3.png";
import easyai4 from "../../public/assets/projects/easyai4.png";
import easyai5 from "../../public/assets/projects/easyai5.png";
import personalFitness from "../../public/assets/projects/personalFitness.png";
import Restaurant_template from "../../public/assets/projects/Restaurant_template.jpg";
import Restaurant_template2 from "../../public/assets/projects/Restaurant_template2.png";
import shadow_foundry from "../../public/assets/projects/shadow_foundry.webp";
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
import CafeTheLuckyBoots1 from "../../public/assets/projects/CafeTheLuckyBoots1.png";
import CafeTheLuckyBoots2 from "../../public/assets/projects/CafeTheLuckyBoots2.png";
import CafeTheLuckyBoots3 from "../../public/assets/projects/CafeTheLuckyBoots3.png";
import CafeTheLuckyBoots4 from "../../public/assets/projects/CafeTheLuckyBoots4.png";
import CafeTheLuckyBoots5 from "../../public/assets/projects/CafeTheLuckyBoots5.png";
import CafeTheLuckyBoots6 from "../../public/assets/projects/CafeTheLuckyBoots6.png";
import CafeTheLuckyBoots7 from "../../public/assets/projects/CafeTheLuckyBoots7.png";
import speeedy from "../../public/assets/projects/speeedy.png";

const projectsData: Project[] = [
  // ─── FEATURED ──────────────────────────────────────────────────────────────
  {
    images: [
      { src: MARE, alt: "MARE – Maritime Risk Assessment Engine", isSpecial: false, isCustomStyles: false },
    ],
    slug: "MARE",
    title: "Maritime Risk Assessment Engine",
    subtitle: "Geospatial risk platform for vessel collision analysis across shipping lanes.",
    description:
      "Interactive risk assessment tool for the maritime industry. Processes large geospatial datasets and renders risk heatmaps with smooth pan/zoom over dense map layers.",
    problem:
      "Maritime operators needed to analyze vessel collision risk across busy shipping lanes in real time, over datasets with millions of geospatial points. Without the UI freezing or rendering lag making the tool unusable.",
    architecture: [
      "Mapbox GL JS for base map and performant layer rendering",
      "Turf.js for geospatial operations: buffers, intersections, point aggregation",
      "Custom risk-scoring algorithm built in Vanilla JavaScript",
      "D3.js for supplementary statistical charts alongside the map",
    ],
    challenges: [
      "Rendering millions of geospatial points in real time without blocking the main thread",
      "Designing a risk model flexible enough to handle different vessel types and lane densities",
      "Optimizing layer update cycles so pan/zoom stays smooth at high data density",
    ],
    results: [
      "Interactive risk heatmaps that render and respond in under 1 second",
      "Smooth pan and zoom maintained across dense multi-layer map views",
      "Custom scoring algorithm that scales across vessel type and traffic volume",
    ],
    tags: [ProjectTags.PROFESSIONAL, ProjectTags.DATA_VIZ],
    keywords: [
      "maritime risk assessment platform",
      "geospatial dashboard",
      "shipping lane risk analysis",
      "data visualization platform",
      "mapbox application",
    ],
    siteUrl: null,
    githubUrl: null,
    featured: true,
  },


  {
    images: [
      { src: pharma4, alt: "SmartSIG – Pharmacy Dashboard", isSpecial: false, isCustomStyles: false },
      { src: pharma, alt: "SmartSIG – Manual Review Queue", isSpecial: false, isCustomStyles: false },
      { src: pharma2, alt: "SmartSIG – Permutations View", isSpecial: false, isCustomStyles: false },
      { src: pharma3, alt: "SmartSIG – AI Validation", isSpecial: false, isCustomStyles: false },
    ],
    slug: "pharma",
    title: "SmartSIG",
    subtitle: "Pharmacy sig management platform: permutation engine, time-travel action log, structured review queue, and AI clinical validation.",
    description:
      "Full-stack platform for pharmacies to standardize, review, and validate prescription sigs at scale. Replaces ad-hoc spreadsheet workflows with an audited queue, a canonical deduplication engine, per-field action history, and AI-assisted clinical safety checks.",
    problem:
      "A pharmacy owner and his team were spending several hours every week manually reviewing sigs in spreadsheets with no standardization, no audit trail, and nothing to catch clinical errors before sigs entered production use. The same instruction existed under dozens of slightly different names with no way to see they were duplicates.",
    architecture: [
      "Next.js App Router + tRPC (end-to-end typed API) + Prisma + PostgreSQL",
      "Manual review queue: parsed/approved/skipped tabs, reviewer claim-locking (prevents two people editing the same sig simultaneously), timed undo drawer that reverses actions server-side",
      "Action log: every field change, approval, skip, and return writes an Action record with a full diffwho changed what, from what value, to what value, and when. Viewable inline per sig and on a dedicated history page",
      "Permutation engine: a canonical hash is computed from each sig's structured field values (not its name). Sigs that share a hash are grouped into a Permutationthe deduplicated canonical form. Makes 'how many ways are we writing this instruction?' a searchable dashboard instead of an unanswerable question",
      "Upstream Vite/React preprocessing tool for Epic EHR CSV exportsparses free-text ENTERED_SIG fields against clinical dictionaries (frequency codes, route codes, dose units), assigns a confidence score per mapping, surfaces low-confidence cases for manual correction before they enter the review queue",
      "Multi-step sig support: tapering dose schedules modeled as ordered stages; field values across steps stored as pipe-delimited strings (e.g. 'Once Daily|Twice Daily'); reviewers confirm which fields were inferred vs explicitly stated before approval",
      "AI validation layer (BAML typed LLM function signatures): ValidateSigBatch for batch post-approval safety checks, AnalyzeUnapprovedSig for pre-approval deep analysis, conversational Q&A on validation results with real-time streaming",
      "Role system: Admin / Normal / Junior / Onboardingnew users land on a waiting page until approved by an admin. NextAuth + OTP passwordless auth, Playwright E2E tests, Sentry error monitoring, GitHub Actions daily DB backups",
    ],
    challenges: [
      "Parsing messy free-text EHR sigs ('0.1 mg q6h PRN HTN' and '0.1 mg every 6 hours if needed for high blood pressure' mean the same thing) into normalized structured fields without losing clinical intent",
      "Modeling multi-step sigs where each stage has independent field valuesand preserving the full sequence in a single DB record without losing per-step granularity",
      "Designing the permutation hash so it captures semantic equivalence across different surface representations, not just exact string matches",
      "Building claim-locking that handles concurrent reviewers without deadlocks or a reviewer silently overwriting another's work",
      "Integrating AI validation as a safety net that flags issues without blocking the pharmacist's workflow or creating alert fatigue",
    ],
    results: [
      "Replaced hours of weekly manual sig review with a structured, audited queue. Pharmacists work claims, not spreadsheets",
      "Every action in the system is logged with a field-level diff: any change can be traced back to who made it, when, and what it replaced. Full time-travel audit trail",
      "Permutation engine automatically surfaces sig duplicates. A searchable view of every canonical instruction and all its variant names",
      "Upstream preprocessing handles new healthcare facility data automatically: new sigs are discovered, parsed, and pushed to the review queue without manual data entry",
      "AI validation catches critical/warning/info-level clinical issues before sigs are used in production, with conversational follow-up for pharmacist review",
    ],
    tags: [
      { label: "Client Project", colorScheme: "orange" },
      { label: "In Development", colorScheme: "purple" },
    ],
    keywords: [
      "pharmacy automation",
      "pharmacy management software",
      "prescription sig management",
      "AI clinical validation",
      "pharmacy workflow software",
      "SmartSIG",
    ],
    siteUrl: null,
    githubUrl: null,
    featured: true,
  },

  {
    images: [
      { src: scl1, alt: "2scl – SDG Dashboard", isSpecial: false, isCustomStyles: false },
      { src: scl2, alt: "2scl – Progress Tracking", isSpecial: false, isCustomStyles: false },
      { src: scl3, alt: "2scl – Indicator View", isSpecial: false, isCustomStyles: false },
      { src: scl4, alt: "2scl – Budget Tracker", isSpecial: false, isCustomStyles: false },
      { src: scl5, alt: "2scl – AI Assistant", isSpecial: false, isCustomStyles: false },
    ],
    slug: "2scl",
    title: "2SCL – Smart City Platform (City SDG)",
    subtitle: "Smart city platform and city platform for tracking all 17 UN SDG indicators with AI assistance, API ingestion, and year-over-year comparison.",
    description:
      "Smart city platform for cities to track, compare, and manage their UN Sustainable Development Goals. This city platform handles data from multiple sources, calculates all 17 SDG indicators, and gives city teams a single place for budgeting, alerts, and progress reporting.",
    problem:
      "City governments had no unified tool to track SDG progress across departments. Data lived in disconnected spreadsheets and external APIs with no way to compare year-over-year or see budget and resource allocation alongside indicator performance.",
    architecture: [
      "Full-stack web application with a data-dense dashboard and a separate presentation site",
      "Automatic API integration for real-time data ingestion with manual data entry fallback",
      "Calculation engine covering all 17 UN SDG indicators and their sub-indicators",
      "AI assistant for interpreting results and surfacing recommendations",
    ],
    challenges: [
      "Unifying heterogeneous data sources (live APIs + manual CSV) into one consistent indicator view",
      "Implementing indicator calculations that match official UN SDG methodology",
      "Designing the data model to support multi-year comparison across changing city boundaries",
    ],
    results: [
      "Single platform for SDG indicator tracking, budget management, and automated alerts",
      "Year-over-year and cross-period comparison for all 17 goals out of the box",
      "Unified ingestion pipeline eliminates manual data entry for connected sources",
    ],
    tags: [
      { label: "Client Project", colorScheme: "orange" },
      { label: "In Development", colorScheme: "purple" },
    ],
    keywords: [
      "smart city platform",
      "city platform",
      "city SDG platform",
      "UN SDG tracking",
      "sustainable development goals platform",
      "2scl",
      "smart city living",
    ],
    siteUrl: null,
    githubUrl: null,
    featured: true,
  },
    {
    images: [{ src: speeedy, alt: "Speeedy – RSVP Reader Dashboard", isSpecial: false, isCustomStyles: false }],
    videoUrl: "/assets/projects/speeedy.mp4",
    slug: "speeedy",
    title: "Speeedy",
    subtitle: "A High-Performance, Local-First RSVP Reading Platform.",
    description:
      "Speeedy is a distraction-free speed reading PWA that consolidates science-backed RSVP mechanics with a privacy-first, zero-server architecture. It solves the fragmentation of current speed-reading tools by combining Optimal Recognition Point (ORP) centering, accessibility modes (Irlen/Dyslexia), and persistent progress tracking into a single, cohesive experience.",
    problem:
      "Current digital reading experiences are hindered by 'information overload' and physical eye-tracking fatigue (saccades), which accounts for 10% of total reading time waste. Existing RSVP (Rapid Serial Visual Presentation) tools were often fragmented—some focusing on speed, others on privacy, but none offering a holistic environment for long-form consumption and skill-tracking.",
    architecture: [
      "Scientific RSVP Engine: Developed a custom rendering system that aligns every word to its Optimal Recognition Point (ORP). I implemented 'Smart Speed' logic that dynamically adjusts word-timing based on character length and internal punctuation (dashes, quotes, commas) to preserve natural reading cadence at 500+ WPM.",
      "Local-First Architecture: To ensure absolute privacy, I designed a zero-server storage model using IndexedDB. User libraries, reading streaks, and detailed WPM statistics live entirely in the browser, allowing the app to work offline as a PWA without sacrificing persistent profile features.",
      "Accessibility-First Design: Integrated specialized modes for visual stress and neurodiversity, including Irlen Overlays (color tints), OpenDyslexic Support, and Bionic reading anchors. I leveraged the Web Audio API to provide subtle auditory pulses that anchor the reader’s rhythm, particularly helpful for focus.",
      "Internationalization via Intl.Segmenter: Solved the 'fragmented script' problem by moving beyond simple whitespace splitting. Speeedy uses modern browser segmentation APIs to properly tokenize Arabic and CJK scripts, making high-speed reading possible for non-Latin languages.",
      "Zero-Friction Viral Loops: Built a sharing system using URL-safe base64 encoding, allowing bloggers to embed 'One-Click Read' links that pre-load content into the reader without any account creation or signup walls.",
    ],
    challenges: [
      "Implementing 'Smart Speed' logic to adjust word-timing based on character length and internal punctuation to preserve natural reading rhythm",
      "Dynamic multi-language support (Arabic, CJK) via Intl.Segmenter browser API",
      "Robust offline-first architecture with persistent IndexedDB storage in a PWA context",
      "Developing a high-polish, performance-focused UI with Lit and Vite for instant load times",
    ],
    results: [
      "A high-polish, local-first reader that treats speed reading as a persistent skill",
      "Scientific RSVP engine handling 500+ WPM with natural cadence and ORP centering",
      "Successfully combined the performance of a native application with the accessibility of the web",
      "Zero-server architecture ensures absolute privacy and offline accessibility",
    ],
    tags: [
      ProjectTags.PERSONAL,
      { label: "Lit", colorScheme: "cyan" },
      { label: "Vite", colorScheme: "purple" },
      { label: "PWA", colorScheme: "orange" },
      { label: "IndexedDB", colorScheme: "teal" },
    ],
    keywords: [
      "speed reading PWA",
      "RSVP reading platform",
      "local-first web app",
      "Lit framework project",
      "privacy-first reading tool",
      "Speeedy",
    ],
    siteUrl: "https://speeedy.pages.dev/",
    githubUrl: null,
    featured: true,
  },


  {
    images: [
      { src: progres1, alt: "Progres – Student Portal", isSpecial: false, isCustomStyles: false },
      { src: progres0, alt: "Progres – Login", isSpecial: false, isCustomStyles: false },
      { src: progres2, alt: "Progres – Grades View", isSpecial: false, isCustomStyles: false },
      { src: progres3, alt: "Progres – Schedule", isSpecial: false, isCustomStyles: false },
      { src: progres4, alt: "Progres – Admin Data", isSpecial: false, isCustomStyles: false },
      { src: progres5, alt: "Progres – Mobile View", isSpecial: false, isCustomStyles: false },
    ],
    slug: "progres",
    title: "Progres",
    subtitle: "A faster, more reliable alternative frontend for the official Algerian university student portalused by real students.",
    description:
      "Replacement frontend for Algeria's official university student portal. The official site has persistent bugs and slow load times. Progres wraps the same API with a clean interface, better UX, and enhanced privacydeployed at the edge for fast access.",
    problem:
      "Algeria's official student portal (used by hundreds of thousands of university students) is plagued with UI bugs, crashes during exam season, and a confusing interface. Students needed a reliable way to check grades and administrative data without the friction.",
    architecture: [
      "Astro framework for fast, minimal-JS static rendering",
      "Cloudflare Workers/Pages for edge deployment, low latency from North Africa",
      "Direct integration with the official university API. No data stored, no proxy backend",
      "Client-side session handling with privacy-first design",
    ],
    challenges: [
      "The official API is completely undocumentedrequired reverse-engineering from the official app",
      "API is brittle and changes without notice, requiring ongoing maintenance",
      "Handling auth flows that the official portal gets wrong (broken session handling, bad redirects)",
    ],
    results: [
      "Stable, fast alternative used by real students across multiple Algerian universities",
      "Zero data storage. No user data ever leaves the client",
      "Deployed at the edge: pages load significantly faster than the official portal",
    ],
    tags: [ProjectTags.PERSONAL, ProjectTags.ASTRO, ProjectTags.CLOUDFLARE_WORKERS],
    keywords: [
      "student portal frontend",
      "university portal alternative",
      "Astro web app",
      "Cloudflare Workers app",
      "Progres student portal",
    ],
    siteUrl: "https://progres-web.pages.dev/en/login?test=true",
    githubUrl: null,
    featured: true,
  },

  {
    images: [
      { src: Tetris, alt: "Tetris Solver – Board View", isSpecial: false, isCustomStyles: false },
      { src: Tetris2, alt: "Tetris Solver – Simulation", isSpecial: false, isCustomStyles: false },
    ],
    slug: "tetris-solver",
    title: "Tetris Solver",
    subtitle: "Adaptive beam-search algorithm that solves Tetris move sequences 80× faster than a fixed-width baselinewith no loss in win rate.",
    description:
      "Given a board state and incoming piece sequence, the solver finds the exact move sequence to clear a target number of lines before any piece drops. Uses adaptive beam search to balance speed and solution quality.",
    problem:
      "Solving Tetris optimally is NP-hardthe state space explodes exponentially with lookahead depth. A fixed-width beam search wide enough to solve hard games was far too slow on easy ones. The challenge: make it fast on average without failing on hard cases.",
    architecture: [
      "Decoupled engine layer: drop, place, clear, scoreno solver logic in the game simulation",
      "Adaptive (progressive) beam search: tries widths 1 → 5 → 20 → 100, stops the moment a solution is found",
      "Heuristic scoring: lines cleared (+1000/line), column height (−51), holes (−35), bumpiness (−18)",
      "Piece sequences follow the official Tetris 7-bag system; all 7 tetrominoes with valid rotations pre-loaded",
      "Simulation mode with Python multiprocessing to run hundreds of seeds in parallel",
      "Frontend: Flask, HTMX, Alpine.js, D3.js for SVG board rendering",
    ],
    challenges: [
      "State space explosion: with lookahead the number of possible boards grows too fast to search naively",
      "Tuning beam width thresholds: too narrow misses solutions, too wide is slow",
      "Balancing heuristic weights without overfitting to specific board configurations",
    ],
    results: [
      "80× speedup: 100 games in ~2.4s vs ~194s with a fixed width-200 beam, same win rate",
      "Easy games solved instantly at beam width 1; hard games scale up as needed",
      "Parallel simulation mode can evaluate hundreds of seeds concurrently",
    ],
    tags: [
      { label: "Personal Project", colorScheme: "blue" },
      { label: "Python", colorScheme: "yellow" },
    ],
    keywords: [
      "tetris solver",
      "beam search algorithm",
      "python algorithm project",
      "game AI",
      "adaptive beam search",
    ],
    siteUrl: "https://tetris-algo.onrender.com/",
    githubUrl: null,
    featured: true,
  },

  // ─── OTHER PROJECTS ─────────────────────────────────────────────────────────

  {
    images: [
      { src: easyai, alt: "EasyAI – Workflow Builder", isSpecial: false, isCustomStyles: false },
      { src: easyai1, alt: "EasyAI – Dashboard", isSpecial: false, isCustomStyles: false },
      { src: easyai2, alt: "EasyAI – Workflow Editor", isSpecial: false, isCustomStyles: false },
      { src: easyai3, alt: "EasyAI – Results", isSpecial: false, isCustomStyles: false },
      { src: easyai4, alt: "EasyAI – Settings", isSpecial: false, isCustomStyles: false },
      { src: easyai5, alt: "EasyAI – Templates", isSpecial: false, isCustomStyles: false },
    ],
    slug: "EasyAi",
    title: "EasyAI",
    subtitle: "Drag-and-drop AI workflow builder for non-technical users. Next.js, Supabase, OpenAI + ComfyUI.",
    description:
      "Makes AI workflows accessible without writing code. Users can compose OpenAI and ComfyUI pipelines through a visual interface. Built with Next.js, Chakra UI, and Supabase. In active development.",
    tags: [
      { label: "Personal Project", colorScheme: "blue" },
      { label: "In Development", colorScheme: "purple" },
    ],
    keywords: [
      "AI workflow builder",
      "no-code AI platform",
      "OpenAI workflow builder",
      "ComfyUI workflow app",
      "EasyAI",
    ],
    siteUrl: null,
    githubUrl: null,
  },

  {
    images: [
      { src: CafeTheLuckyBoots6, alt: "Cafe The Lucky Boots – Hero", isSpecial: false, isCustomStyles: false },
      { src: CafeTheLuckyBoots2, alt: "Cafe The Lucky Boots – Menu", isSpecial: false, isCustomStyles: false },
      { src: CafeTheLuckyBoots3, alt: "Cafe The Lucky Boots – About", isSpecial: false, isCustomStyles: false },
      { src: CafeTheLuckyBoots4, alt: "Cafe The Lucky Boots – Gallery", isSpecial: false, isCustomStyles: false },
      { src: CafeTheLuckyBoots5, alt: "Cafe The Lucky Boots – Contact", isSpecial: false, isCustomStyles: false },
      { src: CafeTheLuckyBoots1, alt: "Cafe The Lucky Boots – Interior", isSpecial: false, isCustomStyles: false },
      { src: CafeTheLuckyBoots7, alt: "Cafe The Lucky Boots – Mobile", isSpecial: false, isCustomStyles: false },
    ],
    slug: "cafe-the-lucky-boots",
    title: "Cafe The Lucky Boots",
    subtitle: "Bilingual Japanese cafe site (JA/EN) for a Kushiro, Hokkaido cafe. Astro + Tailwind on Cloudflare Workers.",
    description:
      "Client site for a cafe in Kushiro, Hokkaido, Japan. Bilingual (Japanese/English), built with Astro and Tailwind CSS, deployed on Cloudflare Workers for fast load times from Japan.",
    tags: [ProjectTags.CLIENT, ProjectTags.ASTRO],
    keywords: [
      "cafe website",
      "restaurant website development",
      "bilingual business website",
      "Astro website",
      "Kushiro cafe website",
    ],
    siteUrl: "https://japmerican-cafe.sami-bentaleb-dev-d6b.workers.dev/ja",
    githubUrl: null,
    clientSite: true,
  },

  {
    images: [
      { src: personalFitness, alt: "IC Personal Training – Website", isSpecial: false, isCustomStyles: false },
    ],
    slug: "personalFitnessWebsite",
    title: "IC Personal Training",
    subtitle: "Personal trainer marketing site with CMS-driven content, animated sections, and embedded map. Next.js + wispCMS.",
    description:
      "Client site for a personal trainer. Built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Leaflet for the map. Content managed via wispCMS. Includes Umami for privacy-friendly analytics.",
    tags: [ProjectTags.CLIENT, ProjectTags.NEXTJS],
    keywords: [
      "personal trainer website",
      "fitness website development",
      "marketing website",
      "Next.js business website",
      "website building",
    ],
    siteUrl: "https://icpersonaltraining.com/",
    githubUrl: null,
    clientSite: true,
  },

  {
    images: [
      { src: portfolio2, alt: "Architecture Portfolio – Projects Grid", isSpecial: false, isCustomStyles: false },
      { src: portfolio1, alt: "Architecture Portfolio – Hero", isSpecial: false, isCustomStyles: false },
      { src: portfolio3, alt: "Architecture Portfolio – Project Detail", isSpecial: false, isCustomStyles: false },
      { src: portfolio4, alt: "Architecture Portfolio – About", isSpecial: false, isCustomStyles: false },
      { src: portfolio5, alt: "Architecture Portfolio – Mobile", isSpecial: false, isCustomStyles: false },
    ],
    slug: "architecture-portfolio",
    title: "Architecture Portfolio",
    subtitle: "Visual portfolio for an architect: masonry gallery, full-screen image viewer, and motion transitions. Vite + React.",
    description:
      "Custom portfolio site for an architect client. Built with Vite, React, React Router, Tailwind CSS, and Framer Motion. Highlights include a masonry project grid, a full-screen image viewer, and a hidden easter egg.",
    tags: [
      { label: "Client Project", colorScheme: "orange" },
      { label: "React", colorScheme: "cyan" },
    ],
    keywords: [
      "architecture portfolio website",
      "architect portfolio",
      "React portfolio website",
      "visual portfolio design",
      "client portfolio website",
    ],
    siteUrl: "https://portfolio-jacob.pages.dev/",
    githubUrl: null,
    clientSite: true,
  },

  {
    images: [
      { src: Restaurant_template, alt: "Restaurant Template – Home", isSpecial: false, isCustomStyles: false },
      { src: Restaurant_template2, alt: "Restaurant Template – Menu", isSpecial: false, isCustomStyles: false },
    ],
    slug: "restaurantTemplate",
    title: "Restaurant Template",
    subtitle: "Customizable restaurant site template with reservations form, Leaflet map, and animated sections. Next.js + Tailwind.",
    description:
      "Open template for restaurant businesses. Built with Next.js 13, Tailwind CSS, Framer Motion, Leaflet for the map, and react-hook-form with Yup for the reservations form. Designed to be easy to customize for any venue.",
    tags: [
      { label: "Client Project", colorScheme: "orange" },
      { label: "Next.js", colorScheme: "gray" },
    ],
    keywords: [
      "restaurant website template",
      "restaurant website",
      "Next.js template",
      "website template",
      "restaurant website development",
    ],
    siteUrl: "https://restaurant-template-one.vercel.app",
    githubUrl: null,
    clientSite: true,
  },

  {
    images: [
      { src: shadow_foundry, alt: "Shadow Foundry.ai – Website", isSpecial: false, isCustomStyles: false },
    ],
    slug: "shadowFoundryAi",
    title: "Shadow Foundry.ai",
    subtitle: "Marketing site for an AI company. Custom animations, Splide carousel, self-hosted fonts. HTML + SCSS.",
    description:
      "Client marketing site for an AI company. Built with HTML, SCSS, and JavaScript. Features a custom Splide carousel, self-hosted fonts, and polished scroll-driven animations — no framework needed.",
    tags: [
      { label: "Client Project", colorScheme: "orange" },
      { label: "Static Site", colorScheme: "teal" },
    ],
    keywords: [
      "AI company website",
      "marketing website",
      "static site development",
      "landing page development",
      "Shadow Foundry",
    ],
    siteUrl: "https://shadowfoundry-ai.netlify.app/",
    githubUrl: "https://github.com/bentaleb-dev/Shadow-Foundry.ai",
    clientSite: true,
  },

  {
    images: [
      { src: runematch, alt: "RuneMatch – Game Lobby", isSpecial: false, isCustomStyles: false },
      { src: runematch2, alt: "RuneMatch – Game View", isSpecial: false, isCustomStyles: false },
    ],
    slug: "RuneMatch",
    title: "RuneMatch",
    subtitle: "RuneScape-themed casino platform: trade in-game gold for credits, play multiple mini-games. Next.js.",
    description:
      "Client project. A casino platform themed around RuneScape. Players trade OSRS in-game gold for platform credits to play multiple RuneScape-themed games. Built with Next.js.",
    tags: [ProjectTags.CLIENT, ProjectTags.NEXTJS],
    keywords: [
      "casino platform",
      "gaming web app",
      "Next.js platform",
      "RuneScape themed app",
      "RuneMatch",
    ],
    siteUrl: "https://runematch.vercel.app/",
    githubUrl: null,
  },

  {
    images: [
      { src: tracktalk1, alt: "TrackTalk – Home", isSpecial: false, isCustomStyles: false },
      { src: tracktalk2, alt: "TrackTalk – Player", isSpecial: false, isCustomStyles: false },
      { src: tracktalk3, alt: "TrackTalk – Library", isSpecial: false, isCustomStyles: false },
      { src: tracktalk4, alt: "TrackTalk – Playlist", isSpecial: false, isCustomStyles: false },
    ],
    slug: "tracktalk",
    title: "TrackTalk",
    subtitle: "Full-featured music streaming platform with user accounts, playlists, and audio playback. Next.js + Supabase.",
    description:
      "Client project. A music streaming platform. Users can create accounts, build playlists, and stream tracks. Built with Next.js, Supabase, and TailwindCSS.",
    tags: [ProjectTags.CLIENT, ProjectTags.NEXTJS],
    keywords: [
      "music streaming platform",
      "audio streaming app",
      "Next.js music app",
      "Supabase web app",
      "TrackTalk",
    ],
    siteUrl: null,
    githubUrl: null,
  },

  {
    images: [
      { src: eTasc, alt: "E-TASC – Annotation Platform", isSpecial: false, isCustomStyles: false },
    ],
    slug: "eTasc",
    title: "E-TASC",
    subtitle: "NLP annotation and text analysis platform for a research institution. Vanilla JS + Stanford CoreNLP.",
    description:
      "Annotation and text analysis platform built for a research institution. Core functionality written from scratch in Vanilla JavaScript, HTML, and CSS. Word category analysis uses the Stanford CoreNLP library.",
    tags: [
      { label: "Professional", colorScheme: "blue" },
      { label: "NLP", colorScheme: "green" },
    ],
    keywords: [
      "NLP annotation platform",
      "text analysis software",
      "research platform",
      "language processing tool",
      "E-TASC",
    ],
    siteUrl: null,
    githubUrl: null,
  },
];

export default projectsData;
