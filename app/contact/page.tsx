import { Section } from "@/components/section";
import { ContactForm } from "./ContactForm";

export default function Contact() {
  return (
    <Section>
      <header className="flex flex-col gap-6 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-100">
          Contact
        </h1>
        <p className="text-xl md:text-lg text-gray-600 dark:text-gray-400">
          Leave your deetz and a message and I&apos;ll get back to ya.
        </p>
      </header>

      <ContactForm />
    </Section>
  );
}
