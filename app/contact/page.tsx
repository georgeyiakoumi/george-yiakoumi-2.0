import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldSet, FieldDescription, FieldGroup, Field, FieldLabel } from "@/components/ui/field";

export default function Contact() {
  return (
    <div className="h-screen flex items-center justify-center">
      
        <FieldSet className="max-w-2xl mx-auto px-6 w-full">
          <FieldGroup>

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
              <Textarea id="message" name="message" placeholder="Let me know what you'd like to discuss or work on together" rows={6} required />
            </Field>

            <Button type="submit" size="lg">
              Send Message
            </Button>

          </FieldGroup>
        </FieldSet>
      
    </div>
  );
}
