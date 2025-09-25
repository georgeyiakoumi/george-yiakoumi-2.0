import { Mulish } from "next/font/google";
import "./globals.css";
import { Linkedin, Github, User, Briefcase, Mail } from "lucide-react";
import Link from "next/link";
import ScrollBlurEffect from "./components/ScrollBlurEffect";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

const mulish = Mulish({
  subsets: ["latin"],
});

export const metadata = {
  title: "George Yiakoumi",
  description: "Portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${mulish.className} h-screen overflow-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <nav className="fixed box-border flex items-start p-4 md:p-4 left-4 bottom-4 sm:left-8 md:left-16 sm:bottom-auto sm:top-8 md:top-16 z-10">
          <NavigationMenu className="" orientation="horizontal">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/about">
                    <User className="w-4 h-4" />
                    <span>About</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/portfolio">
                    <Briefcase className="w-4 h-4" />
                    <span>Portfolio</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/contact">
                    <Mail className="w-4 h-4" />
                    <span>Contact</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a
                    href="https://linkedin.com/in/georgeyiakoumi"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a
                    href="https://github.com/georgeyiakoumi"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="fixed box-border flex items-center justify-center p-4 md:p-0 right-4 bottom-4 md:right-16 md:bottom-auto md:top-16 z-10">
          <ModeToggle />
        </div>

        <main className="h-full overflow-hidden relative">
          <ScrollBlurEffect>
            {children}
          </ScrollBlurEffect>
        </main>

        <footer className="fixed top-4 left-4 md:bottom-16 md:top-auto md:right-16 md:left-auto  box-border flex flex-col gap-4 items-start md:items-end z-10 p-4">
          <img
            src="/logo.svg"
            alt="George Yiakoumi Logo"
            className="w-10 h-10 dark:invert dark:brightness-0 dark:contrast-100"
          />
        </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}