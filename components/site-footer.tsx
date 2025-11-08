import { AUTHOR } from "@/lib/constants";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed top-4 left-4 md:bottom-4 md:top-auto md:right-4 md:bottom-4 lg:bottom-12 lg:right-12 md:left-auto box-border flex flex-col gap-4 items-start lg:items-end z-10 p-4">
      <img
        src="/logo.svg"
        alt={`${AUTHOR.fullName} Logo`}
        title={`© ${currentYear} ${AUTHOR.fullName}`}
        className="size-10 dark:invert dark:brightness-0 dark:contrast-100"
      />
    </footer>
  );
}
