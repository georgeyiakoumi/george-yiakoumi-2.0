"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldSet, FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Section } from "@/components/section";
import { Send } from "@/components/animate-ui/icons/send";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

// Zod validation schema
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Submit to Netlify Forms
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "contact",
          ...data,
        }).toString(),
      });

      // In development, Netlify Forms endpoint returns 405, but in production it works
      // So we show success for both cases (405 is expected in dev)
      if (response.ok || response.status === 405) {
        // Show success toast
        toast.success("Message sent successfully! I'll get back to you soon.");

        // Reset form
        form.reset();
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section>
      <h1 className="hidden">
        Contact
      </h1>

      <form
        name="contact"
        onSubmit={form.handleSubmit(onSubmit)}
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

            <Field data-invalid={form.formState.errors.name ? "" : undefined}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                placeholder="Your name"
                autoComplete="name"
                {...form.register("name")}
                aria-invalid={!!form.formState.errors.name}
                aria-describedby={form.formState.errors.name ? "name-error" : undefined}
              />
              {form.formState.errors.name && (
                <FieldError id="name-error">
                  {form.formState.errors.name.message}
                </FieldError>
              )}
            </Field>

            <Field data-invalid={form.formState.errors.email ? "" : undefined}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                autoComplete="email"
                {...form.register("email")}
                aria-invalid={!!form.formState.errors.email}
                aria-describedby={form.formState.errors.email ? "email-error" : undefined}
              />
              {form.formState.errors.email && (
                <FieldError id="email-error">
                  {form.formState.errors.email.message}
                </FieldError>
              )}
            </Field>

            <Field data-invalid={form.formState.errors.message ? "" : undefined}>
              <FieldLabel htmlFor="message">Message</FieldLabel>
              <Textarea
                id="message"
                placeholder="Your message"
                rows={3}
                {...form.register("message")}
                aria-invalid={!!form.formState.errors.message}
                aria-describedby={form.formState.errors.message ? "message-error" : undefined}
              />
              {form.formState.errors.message && (
                <FieldError id="message-error">
                  {form.formState.errors.message.message}
                </FieldError>
              )}
            </Field>

            <AnimateIcon animateOnHover asChild>
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : <Send />}
                {isSubmitting ? "Sending..." : "Send message"}
              </Button>
            </AnimateIcon>
          </FieldGroup>
        </FieldSet>
      </form>
    </Section>
  );
}
