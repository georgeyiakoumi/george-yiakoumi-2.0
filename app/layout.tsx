import { Mulish } from "next/font/google";
import "./globals.css";
import ScrollBlurEffect from "@/components/ScrollBlurEffect";
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
      <body className={`${mulish.className} h-screen overflow-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SiteNavigation />
          
          <ModeToggle />
          
          <main className="h-full overflow-hidden relative">
            <ScrollBlurEffect>
              {children}
            </ScrollBlurEffect>
          </main>

          <SiteFooter />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}