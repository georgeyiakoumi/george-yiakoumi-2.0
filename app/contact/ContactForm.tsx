"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { FieldSet, FieldGroup, Field, FieldLabel } from "@/components/ui/field";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit() {
    // Don't prevent default - let the form submit naturally to Netlify
    setIsSubmitting(true);

    // Show optimistic success toast
    toast.success("Message sent!", {
      description: "Thanks for reaching out. I'll get back to you soon!",
    });
  }

  return (
    <>
      {/* Hidden iframe to capture form submission without page redirect */}
      <iframe
        name="hidden-iframe"
        style={{ display: 'none' }}
        title="Form submission"
      />

      <form
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
    </>
  );
}
