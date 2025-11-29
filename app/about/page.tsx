"use client";

import { HandMetal } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AUTHOR, COMPANIES, TOOLS } from "@/lib/constants";
import { LogoItem } from "@/components/logo-item";
import { Section } from "@/components/section";

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
    <>

      {/* Avatar and Bio Section */}
      <Section as="header">
        <img
            src="https://res.cloudinary.com/georgeyiakoumi/image/upload/f_auto,q_auto/v1741778561/avatar_9ddb26a1cc.jpg"
            alt={AUTHOR.fullName}
            className="size-32 rounded-full mx-auto object-cover"
          />
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-100">
          {AUTHOR.fullName}
        </h1>
        <p className="text-xl md:text-lg text-gray-600 dark:text-gray-400">
          Lead product designer with 10+ years of experience turning messy ideas into clean, usable, well-built products.
        </p>
      </Section>

      {/* Companies Section */}
      <Section>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Had the pleasure of working with
        </h2>
        <div ref={companiesRef} className="w-full grid gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {COMPANIES.map((company) => (
            <LogoItem
              key={company.name}
              name={company.name}
              logo={company.logo}
              ariaLabel={company.ariaLabel}
              className={company.className}
            />
          ))}
        </div>
      </Section>

      {/* Tools and Languages Section */}
      <Section>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
          I know my way around
        </h2>
        <div ref={toolsRef} className="w-full grid gap-8 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
          {TOOLS.map((tool) => (
            <LogoItem
              key={tool.name}
              name={tool.name}
              logo={tool.logo}
              ariaLabel={tool.ariaLabel}
              className={tool.className}
            />
          ))}
        </div>
      </Section>

      {/* Contact CTA Section */}
      <Section>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Ready to bring your ideas to life?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          I'd love to hear about your project and explore how we can work together.
        </p>
        <Button size="lg" href="/contact">
          <HandMetal />
          Get in touch
        </Button>
      </Section>
    </>
  );
}