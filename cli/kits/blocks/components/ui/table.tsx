import * as React from "react";
import { cn } from "@/lib/utils";

export function Table({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="relative w-full overflow-auto">
      <table
        className={cn(
          "w-full caption-bottom text-sm",
          // Optional fg override
          "text-[var(--table-fg)]",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export function TableHeader(
  props: React.HTMLAttributes<HTMLTableSectionElement>,
) {
  return (
    <thead
      className={cn(
        "[&_tr]:border-b",
        // Variable hooks for border color and head text
        "text-[var(--table-head-fg)] [&_tr]:border-[var(--table-border)]",
      )}
      {...props}
    />
  );
}

export function TableBody(
  props: React.HTMLAttributes<HTMLTableSectionElement>,
) {
  return (
    <tbody
      className={cn(
        "[&_tr:last-child]:border-0",
        "[&_tr]:border-[var(--table-border)]",
      )}
      {...props}
    />
  );
}

export function TableRow(props: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "hover:bg-muted/50 border-b transition-colors",
        "border-[var(--table-border)] hover:bg-[var(--table-row-hover-bg)]",
      )}
      {...props}
    />
  );
}

export function TableHead(props: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "text-muted-foreground h-10 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0",
        "text-[var(--table-head-fg)]",
      )}
      {...props}
    />
  );
}

export function TableCell(props: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn(
        "p-4 align-middle [&:has([role=checkbox])]:pr-0",
        "text-[var(--table-fg)]",
      )}
      {...props}
    />
  );
}

export function TableCaption(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <caption
      className={cn(
        "text-muted-foreground mt-4 text-sm",
        "text-[var(--table-muted-fg)]",
      )}
      {...props}
    />
  );
}
