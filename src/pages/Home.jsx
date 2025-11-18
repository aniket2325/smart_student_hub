import React from "react";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Process from "../components/home/Process";
import CTA from "../components/home/CTA";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <WhyChooseUs />
      <Process />
      <CTA />
    </div>
  );
}