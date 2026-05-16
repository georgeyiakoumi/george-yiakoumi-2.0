import React from "react";
import type { SnapshotItem } from "@/lib/strapi-queries";
import { Typography } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";

interface SnapshotBlockProps {
  items: SnapshotItem[];
  toolsContent?: React.ReactNode;
}

/**
 * Parse snapshot value text for inline tags like {{me}}.
 * Returns the original string if no tags are found.
 */
function parseSnapshotValue(value: string): React.ReactNode {
  const ME_REGEX = /\{\{me\}\}/gi;
  if (!ME_REGEX.test(value)) return value;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let matchIndex = 0;

  const regex = new RegExp(ME_REGEX.source, 'gi');
  let match: RegExpExecArray | null;

  while ((match = regex.exec(value)) !== null) {
    if (match.index > lastIndex) {
      parts.push(value.slice(lastIndex, match.index));
    }
    parts.push(
      <Badge key={`me-${matchIndex}`} variant="secondary" className="text-xs">
        <span aria-hidden="true">&#x1F64B;</span> me
      </Badge>
    );
    lastIndex = match.index + match[0].length;
    matchIndex++;
  }

  if (lastIndex < value.length) {
    parts.push(value.slice(lastIndex));
  }

  return <>{parts}</>;
}

export function SnapshotBlock({ items: rawItems, toolsContent }: SnapshotBlockProps) {
  const items = rawItems.filter(
    (item) => item.label?.trim() && item.value?.trim()
  );

  if (items.length === 0) return null;

  return (
    <div className="mx-auto w-full md:max-w-lg lg:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl px-8 lg:px-0 mb-16">
      <div className="md:max-w-md lg:max-w-xl xl:max-w-2xl mx-auto">
        <Typography
          variant="overline"
          as="span"
          className="mb-4 block text-xs font-bold uppercase tracking-widest text-foreground/80"
        >
          Snapshot
        </Typography>
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
          {items.map((item) => (
            <div key={item.id} className="col-span-2 grid grid-cols-subgrid items-baseline">
              <dt className="text-sm font-semibold text-foreground">
                {item.label}
              </dt>
              <dd className="text-sm text-muted-foreground">
                {parseSnapshotValue(item.value)}
              </dd>
            </div>
          ))}
          {toolsContent && (
            <div className="col-span-2 grid grid-cols-subgrid">
              <dt className="text-sm font-semibold text-foreground pt-0.5">
                Tools
              </dt>
              <dd>
                <div className="flex flex-wrap gap-2">
                  {toolsContent}
                </div>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
