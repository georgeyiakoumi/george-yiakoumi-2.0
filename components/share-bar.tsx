"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { Copy } from "@/components/animate-ui/icons/copy";
import { Check } from "@/components/animate-ui/icons/check";
import { MessageSquareShare } from "@/components/animate-ui/icons/message-square-share";
import { LinkedinIcon, type LinkedinIconHandle } from "@/components/ui/linkedin";

interface ShareBarProps {
  url?: string;
  type?: "client" | "concept" | "article";
}

export function ShareBar({ url: urlProp, type }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [url, setUrl] = useState(urlProp ?? "");
  const linkedinRef = useRef<LinkedinIconHandle>(null);

  useEffect(() => {
    if (!urlProp) setUrl(window.location.href);
    setCanShare(!!navigator.share && window.matchMedia("(pointer: coarse)").matches);
  }, [urlProp]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    navigator.share({ url });
  };

  const linkedInCopy =
    type === "article" ? "Check out this article" : "Check out this case study";
  const linkedInUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(`${linkedInCopy}\n\n${url}`)}`;

  return (
    <div className="flex items-center justify-center gap-2 mx-auto w-full md:max-w-lg lg:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl px-8 lg:px-0 py-8 mt-16 border-t border-border">
      <AnimateIcon animateOnHover asChild>
        <Button variant="outline" size="sm" onClick={handleCopy} className="cursor-pointer gap-1.5">
          {copied ? <Check /> : <Copy />}
          {copied ? "Copied!" : "Copy link"}
        </Button>
      </AnimateIcon>

      {canShare && (
        <AnimateIcon animateOnHover asChild>
          <Button variant="outline" size="sm" onClick={handleShare} className="cursor-pointer gap-1.5">
            <MessageSquareShare />
            Share
          </Button>
        </AnimateIcon>
      )}

      <Button variant="outline" size="sm" asChild className="cursor-pointer gap-1.5">
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => linkedinRef.current?.startAnimation()}
          onMouseLeave={() => linkedinRef.current?.stopAnimation()}
        >
          <LinkedinIcon ref={linkedinRef} size={16} />
          Share on LinkedIn
        </a>
      </Button>
    </div>
  );
}
