"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { codeToHtml } from "shiki";
import { Typography } from "@/components/ui/typography";
import type { CodeBlockType } from "@/lib/strapi-queries";

interface CodeBlockProps {
  block: CodeBlockType;
}

export function CodeBlock({ block }: CodeBlockProps) {
  const [html, setHtml] = useState<string>("");
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const theme = resolvedTheme === "dark" ? "github-dark" : "github-light";

    codeToHtml(block.code, {
      lang: block.language || "typescript",
      theme,
    }).then(setHtml);
  }, [block.code, block.language, resolvedTheme]);

  return (
    <figure className="flex flex-col gap-2 items-center w-full my-8 mx-auto md:max-w-lg lg:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl px-8 lg:px-0">
      {block.filename && (
        <div className={`w-full rounded-t-lg border border-b-0 border-border bg-muted px-4 py-2 text-xs text-muted-foreground font-mono ${html ? "" : "mb-0"}`}>
          {block.filename}
        </div>
      )}
      <div
        className={`w-full [&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-relaxed [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-border ${block.filename ? "[&_pre]:rounded-t-none [&_pre]:border-t-0 -mt-2" : ""}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {block.caption && (
        <Typography variant="muted" className="text-center max-w-2xl">
          {block.caption}
        </Typography>
      )}
    </figure>
  );
}
