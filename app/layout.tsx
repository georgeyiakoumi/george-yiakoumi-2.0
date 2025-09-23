import { Inter } from "next/font/google";
import "./globals.css";
import { Linkedin, Github } from "lucide-react";
import Link from "next/link";
import ScrollBlurEffect from "./components/ScrollBlurEffect";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

const inter = Inter({
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
    <html lang="en">
      <body className={`${inter.className} bg-white h-screen overflow-hidden`}>
        <nav className="fixed box-border flex flex-col items-start p-4 left-16 top-16 border-t-4 border-l-4 border-gray-500/50 z-10">
          <NavigationMenu orientation="vertical" className="flex-col items-start">
            <NavigationMenuList className="flex-col gap-0">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/about" className="font-normal leading-6 text-base text-gray-900 whitespace-nowrap px-4 py-3 rounded-lg w-full block">
                    About
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/portfolio" className="font-normal leading-6 text-base text-gray-600 whitespace-nowrap hover:text-gray-900 transition-colors px-4 py-3 rounded-lg w-full block">
                    Portfolio
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/contact" className="font-normal leading-6 text-base text-gray-600 whitespace-nowrap hover:text-gray-900 transition-colors px-4 py-3 rounded-lg w-full block">
                    Contact
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <div className="flex gap-3 items-start px-4 py-3 w-full">
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-6 h-6"
                    >
                      <Linkedin className="w-full h-full text-gray-600 hover:text-gray-900 transition-colors" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href="mailto:contact@georgeyiakoumi.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-6 h-6"
                    >
                      <Github className="w-full h-full text-gray-600 hover:text-gray-900 transition-colors" />
                    </a>
                  </Button>
                </div>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <main className="h-full overflow-hidden relative">
          <ScrollBlurEffect>
            {children}
          </ScrollBlurEffect>
        </main>

        <footer className="fixed bottom-16 box-border flex flex-col gap-4 items-end right-16 border-b-4 border-r-4 border-gray-500/50 z-10 p-4">
          <img src="/logo.svg" alt="George Yiakoumi Logo" className="w-16 h-16" />
          <small className="font-normal leading-5 text-sm text-gray-600 whitespace-nowrap">
            ©2025 George Yiakoumi
          </small>
        </footer>
      </body>
    </html>
  );
}