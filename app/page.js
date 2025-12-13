import dynamicImport from "next/dynamic";
import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";

// Load Skills component only on client-side to prevent SSR issues with react-fast-marquee
const Skills = dynamicImport(() => import("./components/homepage/skills"), {
  ssr: false,
  loading: () => (
    <div className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <div className="w-full my-12 h-32 flex items-center justify-center text-gray-400">
        <div className="animate-pulse">Loading skills...</div>
      </div>
    </div>
  ),
});

// Force dynamic rendering to prevent SSR issues during static export
export const dynamic = 'force-dynamic';


async function getData() {
  const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json();

  const filtered = data.filter((item) => item?.cover_image).sort(() => Math.random() - 0.5);

  return filtered;
};

export default async function Home() {
  const blogs = await getData();

  return (
    <>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <ContactSection />
    </>
  )
};