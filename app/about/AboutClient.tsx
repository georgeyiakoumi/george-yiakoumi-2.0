"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HandMetal } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Item, ItemMedia } from "@/components/ui/item";
import { getStrapiMediaURL } from "@/lib/strapi";
import type { AboutPageData } from "@/lib/strapi-queries";

gsap.registerPlugin(ScrollTrigger);

interface AboutClientProps {
  data: AboutPageData;
}

export default function AboutClient({ data }: AboutClientProps) {
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

    scroller.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      scroller.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const avatarUrl = getStrapiMediaURL(
    data.attributes.avatar?.data?.attributes.url
  );

  return (
    <div className="w-full">
      {/* Avatar and Bio Section */}
      <header className="h-screen flex flex-col gap-6 max-w-2xl mx-auto items-center justify-center text-center px-5 md:px-0">
        {avatarUrl && (
          <Image
            src={avatarUrl}
            alt={
              data.attributes.avatar?.data?.attributes.alternativeText ||
              data.attributes.title
            }
            width={128}
            height={128}
            className="size-32 rounded-full mx-auto object-cover"
            priority
          />
        )}
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-100">
          {data.attributes.title}
        </h1>
        <p className="text-xl md:text-lg text-gray-600 dark:text-gray-400">
          {data.attributes.description}
        </p>
      </header>

      {/* Companies Section */}
      {data.attributes.experience && data.attributes.experience.length > 0 && (
        <section className="h-screen flex flex-col gap-6 max-w-6xl mx-auto items-center justify-center text-center px-5 md:px-0">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Had the pleasure of working with
          </h2>
          <div
            ref={companiesRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center justify-items-center"
          >
            {data.attributes.experience.map((exp) => {
              const logoUrl = getStrapiMediaURL(
                exp.logo?.data?.attributes.url
              );

              return (
                <Item key={exp.id} className="company-item">
                  <ItemMedia>
                    {logoUrl ? (
                      <Image
                        src={logoUrl}
                        alt={exp.company}
                        width={120}
                        height={80}
                        className="object-contain"
                      />
                    ) : (
                      exp.company
                    )}
                  </ItemMedia>
                </Item>
              );
            })}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {data.attributes.skills && data.attributes.skills.length > 0 && (
        <section className="h-screen flex flex-col gap-6 max-w-6xl mx-auto items-center justify-center text-center px-5 md:px-0">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
            I know my way around
          </h2>
          <div
            ref={toolsRef}
            className="grid grid-cols-3 md:grid-cols-6 gap-2 items-center justify-items-center"
          >
            {data.attributes.skills.map((skill) => (
              <Item key={skill.id} className="tool-item">
                <ItemMedia>{skill.name}</ItemMedia>
              </Item>
            ))}
          </div>
        </section>
      )}

      {/* Contact CTA Section */}
      <section className="h-screen flex flex-col gap-6 max-w-2xl mx-auto items-center justify-center text-center px-5 md:px-0">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Let's chat
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Ready to bring your ideas to life? I'd love to hear about your
          project and explore how we can work together.
        </p>
        <Button size="lg" href="/contact">
          <HandMetal />
          Get in touch
        </Button>
      </section>
    </div>
  );
}
