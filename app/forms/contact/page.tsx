import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContactSuccess() {
  return (
    <Section>
      <header className="flex flex-col gap-6 text-center max-w-lg mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-100">
          Message sent!
        </h1>
        <p className="text-xl md:text-lg text-gray-600 dark:text-gray-400">
          Thanks for reaching out. I&apos;ll get back to you soon!
        </p>
        <div className="mt-4">
          <Link href="/contact">
            <Button size="lg">
              Send another message
            </Button>
          </Link>
        </div>
      </header>
    </Section>
  );
}
