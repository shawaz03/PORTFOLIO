"use client";

import React from "react";
import PageLoader from "@/components/ui/PageLoader";
import ScrollReveal from "@/components/ui/ScrollReveal";

import Hero from "@/app/(sections)/Hero";
import About from "@/app/(sections)/About";
import TechStack from "@/app/(sections)/TechStack";
import Projects from "@/app/(sections)/Projects";
import Certificates from "@/app/(sections)/Certificates";
import Contact from "@/app/(sections)/Contact";
import Footer from "@/app/(sections)/Footer";

export default function Home() {
  return (
    <>
      <h1 className="sr-only">Shawaz Portfolio - Full-Stack Developer & Interactive Web Engineer</h1>
      <PageLoader />
      <div className="flex flex-col w-full flex-1">
        <Hero />

        <ScrollReveal variant="fade-up" duration={0.7} amount={0.15}>
          <About />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" duration={0.7} amount={0.15}>
          <TechStack />
        </ScrollReveal>

        <ScrollReveal variant="scale-up" duration={0.7} amount={0.15}>
          <Projects />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" duration={0.7} amount={0.15}>
          <Certificates />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" duration={0.7} amount={0.15}>
          <Contact />
        </ScrollReveal>

        <Footer />
      </div>
    </>
  );
}
