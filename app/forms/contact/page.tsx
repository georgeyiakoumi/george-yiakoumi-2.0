import { Section } from "@/components/section";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { CheckCheck } from "@/components/animate-ui/icons/check-check";

export default function ContactSuccess() {
  return (
    <Section>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="default">
            <AnimateIcon animateOnHover animateOnView>
              <CheckCheck />
            </AnimateIcon>
          </EmptyMedia>
          <EmptyTitle>
            Message received
          </EmptyTitle>
          <EmptyDescription>
            Thanks for reaching out. I'll get back to you soon!
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </Section>
  );
}
