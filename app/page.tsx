import { Hero } from "@/components/hero/Hero";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Experience />
      <Skills />
    </>
  );
}
