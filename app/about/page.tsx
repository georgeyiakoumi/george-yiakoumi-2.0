"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const companiesRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = document.querySelector(".h-full.overflow-y-auto");

    if (!scroller) {
      console.log("No scroller found");
      return;
    }

    gsap.set(".company-item, .tool-item", { opacity: 0, y: 30 });

    const handleScroll = () => {
      if (companiesRef.current) {
        const rect = companiesRef.current.getBoundingClientRect();
        const scrollerRect = scroller.getBoundingClientRect();
        const relativeTop = rect.top - scrollerRect.top;

        if (relativeTop < scrollerRect.height * 0.7) {
          const items = companiesRef.current.querySelectorAll(".company-item");
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          });
        } else if (relativeTop > scrollerRect.height * 0.7) {
          const items = companiesRef.current.querySelectorAll(".company-item");
          gsap.set(items, {
            opacity: 0,
            y: 30,
          });
        }
      }

      if (toolsRef.current) {
        const rect = toolsRef.current.getBoundingClientRect();
        const scrollerRect = scroller.getBoundingClientRect();
        const relativeTop = rect.top - scrollerRect.top;

        if (relativeTop < scrollerRect.height * 0.7) {
          const items = toolsRef.current.querySelectorAll(".tool-item");
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
          });
        } else if (relativeTop > scrollerRect.height * 0.7) {
          const items = toolsRef.current.querySelectorAll(".tool-item");
          gsap.set(items, {
            opacity: 0,
            y: 30,
          });
        }
      }
    };

    scroller.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      scroller.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className="w-full">
      {/* Avatar and Bio Section */}
      <section className="h-screen flex items-center justify-center bg-transparent">
        <div className="text-center max-w-2xl mx-auto px-6">
          <div className="mb-8">
            <img
              src="https://res.cloudinary.com/georgeyiakoumi/image/upload/f_auto,q_auto/v1741778561/avatar_9ddb26a1cc.jpg"
              alt="George Yiakoumi"
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            George Yiakoumi
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Lead product designer with 10+ years of experience turning messy ideas into clean, usable, well-built products.
          </p>
        </div>
      </section>

      {/* Companies Section */}
      <section className="h-screen flex items-center justify-center bg-transparent">
        <div className="text-center max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-12">
            Had the pleasure of working with
          </h2>
          <div ref={companiesRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {/* Placeholder for company logos */}
            <div className="company-item w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">Logo 1</span>
            </div>
            <div className="company-item w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">Logo 2</span>
            </div>
            <div className="company-item w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">Logo 3</span>
            </div>
            <div className="company-item w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">Logo 4</span>
            </div>
            <div className="company-item w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">Logo 5</span>
            </div>
            <div className="company-item w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">Logo 6</span>
            </div>
            <div className="company-item w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">Logo 7</span>
            </div>
            <div className="company-item w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">Logo 8</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tools and Languages Section */}
      <section className="h-screen flex items-center justify-center bg-transparent">
        <div className="text-center max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-12">
            Tools and languages
          </h2>
          <div ref={toolsRef} className="grid grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center">
            {/* Placeholder for tool/language icons */}
            <div className="tool-item w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">JS</span>
            </div>
            <div className="tool-item w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">TS</span>
            </div>
            <div className="tool-item w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">React</span>
            </div>
            <div className="tool-item w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">Next</span>
            </div>
            <div className="tool-item w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">Figma</span>
            </div>
            <div className="tool-item w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">CSS</span>
            </div>
            <div className="tool-item w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">Node</span>
            </div>
            <div className="tool-item w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">Git</span>
            </div>
            <div className="tool-item w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">AWS</span>
            </div>
            <div className="tool-item w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">Docker</span>
            </div>
            <div className="tool-item w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">PS</span>
            </div>
            <div className="tool-item w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">AI</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="h-screen flex items-center justify-center bg-transparent">
        <div className="text-center max-w-2xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Let's chat
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
            Ready to bring your ideas to life? I'd love to hear about your project
            and explore how we can work together.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/contact" className="flex items-center gap-2">
              Get in touch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}