import type { Project } from "./types";
export const projects: Project[] = [
  {
    name: "Kitty — VS Code Theme",
    blurb: "A production VS Code theme with full lifecycle ownership: publishing, versioning, user support, and accessibility-driven iterations for thousands of developers.",
    tags: ["Node.js", "VS Code API"],
    links: [
      { label: "Marketplace", href: "https://marketplace.visualstudio.com/items?itemName=SakethKanchi.kitty-vscode-theme" },
    ],
    highlight: "10,000+ downloads · ~5★",
  },
  {
    name: "Parley — Discord Meeting Bot",
    blurb: "Self-hosted Discord bot that records voice channels, transcribes locally via a Python faster-whisper sidecar, and generates structured AI notes with pluggable LLM summarizers (Gemini, OpenAI, Ollama). Per-speaker capture, FTS5 searchable history, concurrent multi-channel recording.",
    tags: ["Node.js", "Python", "discord.js", "SQLite", "FastAPI"],
    links: [
      { label: "GitHub", href: "https://github.com/SakethKanchi/parley" },
      { label: "Site", href: "https://sakethkanchi.github.io/parley-landing/" },
    ],
    highlight: "Open source",
  },
];
