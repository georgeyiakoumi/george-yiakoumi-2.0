import { Inter } from "next/font/google";
import "./globals.css";
import { Linkedin, Github } from "lucide-react";
import Link from "next/link";
import ScrollBlurEffect from "./components/ScrollBlurEffect";

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
        <nav className="fixed box-border flex flex-col items-start p-4 left-16 top-16 border-t-4 border-l-4 border-gray-200 bg-white z-10">
          <div className="box-border flex items-start px-4 py-3 relative rounded-lg w-full">
            <Link href="/about" className="font-normal leading-6 text-base text-gray-900 whitespace-nowrap">
              About
            </Link>
          </div>
          <div className="box-border flex items-start px-4 py-3 relative rounded-lg w-full">
            <Link href="/portfolio" className="font-normal leading-6 text-base text-gray-600 whitespace-nowrap hover:text-gray-900 transition-colors">
              Portfolio
            </Link>
          </div>
          <div className="box-border flex items-start px-4 py-3 relative rounded-lg w-full">
            <Link href="/contact" className="font-normal leading-6 text-base text-gray-600 whitespace-nowrap hover:text-gray-900 transition-colors">
              Contact
            </Link>
          </div>
          <div className="box-border flex gap-3 items-start px-4 py-3 relative w-full">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative shrink-0 w-6 h-6"
            >
              <Linkedin className="w-full h-full text-gray-600 hover:text-gray-900 transition-colors" />
            </a>
            <a
              href="mailto:contact@georgeyiakoumi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative shrink-0 w-6 h-6"
            >
              <Github className="w-full h-full text-gray-600 hover:text-gray-900 transition-colors" />
            </a>
          </div>
        </nav>

        <main className="h-full overflow-hidden relative">
          <ScrollBlurEffect>
            {children}
          </ScrollBlurEffect>
        </main>

        <footer className="fixed bottom-16 box-border flex flex-col gap-4 items-end p-4 right-16 border-b-4 border-r-4 border-gray-200 bg-white z-10">
          <div className="relative shrink-0 w-16 h-16">
            <svg
              className="w-full h-full"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="32" cy="32" r="24" fill="currentColor" className="text-gray-900" />
              <circle cx="32" cy="32" r="12" fill="white" />
            </svg>
          </div>
          <div className="font-normal leading-5 text-sm text-gray-600 whitespace-nowrap">
            ©2025 George Yiakoumi
          </div>
        </footer>
      </body>
    </html>
  );
}