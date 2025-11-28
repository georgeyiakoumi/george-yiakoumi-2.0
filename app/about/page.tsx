"use client";

import { HandMetal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Item, ItemMedia } from "@/components/ui/item";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AUTHOR } from "@/lib/constants";

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
      <header className="h-screen flex flex-col gap-6 max-w-2xl mx-auto items-center justify-center text-center px-8 md:px-0">
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
      </header>

      {/* Companies Section */}
      <section className="h-screen flex flex-col gap-12 max-w-6xl mx-auto items-center justify-center text-center px-8 md:px-0">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Had the pleasure of working with
        </h2>
        <div ref={companiesRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-items-center">
          {/* Placeholder for company logos */}
          <Item variant="outline" className="size-48 justify-center">
            <ItemMedia>HP</ItemMedia>
          </Item>
          <Item variant="outline" className="size-48 justify-center">
            <ItemMedia>Novartis</ItemMedia>
          </Item>
          <Item variant="outline" className="size-48 justify-center">
            <ItemMedia>Johnson & Johnson</ItemMedia>
          </Item>
          <Item variant="outline" className="size-48 justify-center">
            <ItemMedia>Takeda</ItemMedia>
          </Item>
          <Item variant="outline" className="size-48 justify-center">
            <ItemMedia>Gofundme</ItemMedia>
          </Item>
          <Item variant="outline" className="size-48 justify-center">
            <ItemMedia>Wickes</ItemMedia>
          </Item>
          <Item variant="outline" className="size-48 justify-center">
            <ItemMedia>Ocean</ItemMedia>
          </Item>
          <Item variant="outline" className="size-48 justify-center">
            <ItemMedia>thinkmoney</ItemMedia>
          </Item>
        </div>
      </section>

      {/* Tools and Languages Section */}
      <section className="h-screen flex flex-col gap-12 max-w-6xl mx-auto items-center justify-center text-center px-8 md:px-0">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
          I know my way around
        </h2>
        <div ref={toolsRef} className="grid grid-cols-3 md:grid-cols-6 gap-4 items-center justify-items-center">
          {/* Placeholder for tool/language icons */}
          <Item variant="outline" className="size-24 justify-center">
            <ItemMedia>JS</ItemMedia>
          </Item>
          <Item variant="outline" className="size-24 justify-center">
            <ItemMedia>TS</ItemMedia>
          </Item>
          <Item variant="outline" className="size-24 justify-center">
            <ItemMedia>React</ItemMedia>
          </Item>
          <Item variant="outline" className="size-24 justify-center">
            <ItemMedia>Next</ItemMedia>
          </Item>
          <Item variant="outline" className="size-24 justify-center">
            <ItemMedia>Figma</ItemMedia>
          </Item>
          <Item variant="outline" className="size-24 justify-center">
            <ItemMedia>CSS</ItemMedia>
          </Item>
          <Item variant="outline" className="size-24 justify-center">
            <ItemMedia>Node</ItemMedia>
          </Item>
          <Item variant="outline" className="size-24 justify-center">
            <ItemMedia>Git</ItemMedia>
          </Item>
          <Item variant="outline" className="size-24 justify-center">
            <ItemMedia>PS</ItemMedia>
          </Item>
          <Item variant="outline" className="size-24 justify-center">
            <ItemMedia>AI</ItemMedia>
          </Item>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="h-screen flex flex-col gap-6 max-w-2xl mx-auto items-center justify-center text-center px-8 md:px-0">
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
      </section>
    </div>
  );
}