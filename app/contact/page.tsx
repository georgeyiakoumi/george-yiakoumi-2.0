"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { FieldSet, FieldGroup, Field, FieldLabel } from "@/components/ui/field";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;

    const handleLoad = () => {
      if (isSubmitting) {
        toast.success("Message sent!", {
          description: "Thanks for reaching out. I'll get back to you soon!",
        });
        setIsSubmitting(false);
        formRef.current?.reset();
      }
    };

    iframe?.addEventListener('load', handleLoad);
    return () => iframe?.removeEventListener('load', handleLoad);
  }, [isSubmitting]);

  function handleSubmit() {
    setIsSubmitting(true);
  }

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

      {/* Hidden iframe to capture form submission without page redirect */}
      <iframe
        ref={iframeRef}
        name="hidden-iframe"
        style={{ display: 'none' }}
        title="Form submission"
      />

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
          ref={formRef}
          name="contact"
          method="POST"
          target="hidden-iframe"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
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
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                  disabled={isSubmitting}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  disabled={isSubmitting}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="message">Message</FieldLabel>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message"
                  rows={6}
                  required
                  disabled={isSubmitting}
                />
              </Field>

              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Spinner />
                    Sending...
                  </>
                ) : (
                  "Send message"
                )}
              </Button>
            </FieldGroup>
          </FieldSet>
        </form>
      </Section>
    </>
  );
}
