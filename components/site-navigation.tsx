"use client";

import { usePathname } from "next/navigation";
import { User, Briefcase, Mail, Github, Linkedin } from "lucide-react";
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

  return (
    <NavigationMenu orientation="vertical" className="fixed box-border items-start left-1/2 -translate-x-1/2 md:left-8 lg:left-16 md:translate-x-0 bottom-8 md:top-8 lg:top-16 z-10">
      <NavigationMenuList className="md:gap-0">
        <NavigationMenuItem>
          <NavigationMenuLink asChild active={pathname === NAV_LINKS.about.href}>
            <Link href={NAV_LINKS.about.href} aria-label={NAV_LINKS.about.ariaLabel}>
              <User />
              <span>{NAV_LINKS.about.label}</span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild active={pathname === NAV_LINKS.portfolio.href}>
            <Link href={NAV_LINKS.portfolio.href} aria-label={NAV_LINKS.portfolio.ariaLabel}>
              <Briefcase />
              <span>{NAV_LINKS.portfolio.label}</span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild active={pathname === NAV_LINKS.contact.href}>
            <Link href={NAV_LINKS.contact.href} aria-label={NAV_LINKS.contact.ariaLabel}>
              <Mail />
              <span>{NAV_LINKS.contact.label}</span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a href={SOCIAL_LINKS.linkedin.url} target="_blank" rel="noopener noreferrer" aria-label={SOCIAL_LINKS.linkedin.ariaLabel}>
              <Linkedin />
              <span>{SOCIAL_LINKS.linkedin.label}</span>
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a href={SOCIAL_LINKS.github.url} target="_blank" rel="noopener noreferrer" aria-label={SOCIAL_LINKS.github.ariaLabel}>
              <Github />
              <span>{SOCIAL_LINKS.github.label}</span>
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
