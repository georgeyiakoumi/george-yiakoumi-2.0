"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";
import { User } from "@/components/animate-ui/icons/user";
import { GalleryHorizontalEnd } from "@/components/animate-ui/icons/gallery-vertical-end";
import { MessageCircleMore } from "@/components/animate-ui/icons/message-circle-more";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { GithubIcon, type GithubIconHandle } from "@/components/ui/github";
import { LinkedinIcon, type LinkedinIconHandle } from "@/components/ui/linkedin";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";

export function SiteNavigation() {
  const pathname = usePathname();
  const linkedinIconRef = useRef<LinkedinIconHandle>(null);
  const githubIconRef = useRef<GithubIconHandle>(null);

  return (
    <NavigationMenu orientation="vertical" className="bg-background rounded-full overflow-hidden md:overflow-visible md:rounded-md fixed box-border items-start left-1/2 -translate-x-1/2 md:left-8 lg:left-16 md:translate-x-0 bottom-8 md:bottom-auto md:top-8 lg:top-16 z-10">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild active={pathname === NAV_LINKS.about.href}>
            <AnimateIcon animateOnHover asChild>
              <Link href={NAV_LINKS.about.href} aria-label={NAV_LINKS.about.ariaLabel}>
                <User />
                <span>{NAV_LINKS.about.label}</span>
              </Link>
            </AnimateIcon>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild active={pathname === NAV_LINKS.projects.href}>
            <AnimateIcon animateOnHover asChild>
              <Link href={NAV_LINKS.projects.href} aria-label={NAV_LINKS.projects.ariaLabel}>
                <GalleryHorizontalEnd />
                <span>{NAV_LINKS.projects.label}</span>
              </Link>
            </AnimateIcon>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild active={pathname === NAV_LINKS.contact.href}>
            <AnimateIcon animateOnHover asChild>
              <Link href={NAV_LINKS.contact.href} aria-label={NAV_LINKS.contact.ariaLabel}>
                <MessageCircleMore />
                <span>{NAV_LINKS.contact.label}</span>
              </Link>
            </AnimateIcon>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a
              href={SOCIAL_LINKS.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SOCIAL_LINKS.linkedin.ariaLabel}
              onMouseEnter={() => linkedinIconRef.current?.startAnimation()}
              onMouseLeave={() => linkedinIconRef.current?.stopAnimation()}
            >
              <LinkedinIcon ref={linkedinIconRef} />
              <span>{SOCIAL_LINKS.linkedin.label}</span>
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a
              href={SOCIAL_LINKS.github.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SOCIAL_LINKS.github.ariaLabel}
              onMouseEnter={() => githubIconRef.current?.startAnimation()}
              onMouseLeave={() => githubIconRef.current?.stopAnimation()}
            >
              <GithubIcon ref={githubIconRef} />
              <span>{SOCIAL_LINKS.github.label}</span>
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
