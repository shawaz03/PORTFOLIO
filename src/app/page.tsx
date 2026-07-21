import Hero from "@/app/(sections)/Hero";
import About from "@/app/(sections)/About";
import TechStack from "@/app/(sections)/TechStack";
import Projects from "@/app/(sections)/Projects";
import Certificates from "@/app/(sections)/Certificates";
import Contact from "@/app/(sections)/Contact";
import Footer from "@/app/(sections)/Footer";

export default function Home() {
  return (
    <div className="flex flex-col w-full flex-1">
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Certificates />
      <Contact />
      <Footer />
    </div>
  );
}
