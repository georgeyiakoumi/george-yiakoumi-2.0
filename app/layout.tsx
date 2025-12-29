import { Mulish } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { SiteNavigation } from "@/components/site-navigation";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/sonner";

// Import safelist to ensure Tailwind scans it for dynamic Strapi classes
import "@/lib/tailwind-safelist";

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
      <body className={`${mulish.className} h-dvh overflow-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SiteNavigation />
          
          <ModeToggle />
          
          <main className="h-dvh overflow-y-auto relative">
            {/* Top fade */}
            <div className="fixed top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-background/0 pointer-events-none z-[1]" />

            {/* Bottom fade */}
            <div className="fixed bottom-0 left-0 w-full pointer-events-none z-[1] flex flex-col">
              <div className="h-24 bg-gradient-to-t from-background to-background/0"/>
              <div className="md:hidden h-24 bg-background"/>
            </div>

            {children}
          </main>

          <SiteFooter />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}