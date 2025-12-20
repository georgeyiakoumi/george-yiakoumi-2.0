import { Section } from "@/components/section";
import { ContactForm } from "./ContactForm";

export default function Contact() {
  return (
    <>
      {/* Hidden form for Netlify Forms detection during build */}
      <form name="contact" data-netlify="true" netlify-honeypot="bot-field" hidden>
        <input type="hidden" name="form-name" value="contact" />
        <input type="text" name="name" />
        <input type="email" name="email" />
        <textarea name="message"></textarea>
        <input type="text" name="bot-field" />
      </form>

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
    </>
  );
}
