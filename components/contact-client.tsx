"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldSet, FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Section } from "@/components/section";
import { Typography } from "@/components/ui/typography";
import { Send } from "@/components/animate-ui/icons/send";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export function ContactClient() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });

      router.push("/forms/contact");
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <Section>
      <Typography variant="h1" align="center">
        Contact
      </Typography>

      <form
        name="contact"
        onSubmit={handleSubmit}
        data-netlify="true"
        netlify-honeypot="bot-field"
        className="w-full sm:w-lg"
      >
        <input type="hidden" name="form-name" value="contact" />

        <FieldSet className="w-full sm:w-lg">
          <FieldGroup>
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
              <Textarea id="message" name="message" placeholder="Your message" rows={3} required />
            </Field>

            <AnimateIcon animateOnHover asChild>
              <Button type="submit" size="lg">
                <Send />
                Send message
              </Button>
            </AnimateIcon>
          </FieldGroup>
        </FieldSet>
      </form>
    </Section>
  );
}
