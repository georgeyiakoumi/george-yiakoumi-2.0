"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export function SubmitButton() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleClick() {
    setIsSubmitting(true);
    toast.success("Sending message...", {
      description: "Your message is being sent.",
    });
  }

  return (
    <Button type="submit" size="lg" disabled={isSubmitting} onClick={handleClick}>
      {isSubmitting ? (
        <>
          <Spinner />
          Sending...
        </>
      ) : (
        "Send message"
      )}
    </Button>
  );
}
