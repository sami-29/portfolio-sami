import type { Metadata } from "next";
import { buildMetadata } from "../../utils/buildMetadata";
import ProjectsContent from "./ProjectsContent";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "Explore full-stack web development projects by Sami Bentaleb, including smart city platforms, pharmacy automation software, dashboards, internal tools, and business websites.",
  path: "/projects",
  keywords: [
    "web projects",
    "full-stack projects",
    "smart city platform",
    "SDG platform",
    "pharmacy automation",
    "dashboard development",
    "web app development",
  ],
});

export default function Projects() {
  return <ProjectsContent />;
}
