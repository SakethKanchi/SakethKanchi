import type { Profile } from "./types";
export const profile: Profile = {
  name: "Saketh Kanchi",
  role: "Full-Stack Engineer",
  tagline: "I build AI-powered products that ship: RAG systems, LLM agents, and internal tools.",
  bio: "Full-Stack Engineer specializing in AI-powered applications and intelligent automation. I build features across React, Node.js, and Python, with hands-on experience architecting RAG systems, LLM integrations, agentic workflows, and developer tools. Shipped a developer tool with 10,000+ users and led automation teams building AI-driven data pipelines on cloud infrastructure.",
  email: "sakethkanchi3@gmail.com",
  phone: "201-552-8414",
  location: "Jersey City, NJ",
  socials: [
    { label: "GitHub", href: "https://github.com/SakethKanchi" },
    { label: "LinkedIn", href: "https://linkedin.com/in/saketh-kanchi/" },
  ],
  resumePath: "/resume.pdf",
  openToWork: true,
  stat: { value: "10k+", label: "users shipped" },
};
