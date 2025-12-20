import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldSet, FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Section } from "@/components/section";

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

      <form
        name="contact"
        method="POST"
        action="/forms/contact.html"
        data-netlify="true"
        netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="contact" />

        <FieldSet className="w-full sm:w-lg">
          <FieldGroup>
            {/* Honeypot field for spam protection */}
            <p className="hidden">
              <label>
                Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
              </label>
            </p>

            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input id="name" name="name" placeholder="Your name" required />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
            </Field>

            <Field>
              <FieldLabel htmlFor="message">Message</FieldLabel>
              <Textarea id="message" name="message" placeholder="Your message" rows={6} required />
            </Field>

            <Button type="submit" size="lg">
              Send message
            </Button>
          </FieldGroup>
        </FieldSet>
      </form>
    </Section>
  );
}
