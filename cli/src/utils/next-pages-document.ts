import fs from "fs-extra";

export function buildDefaultPagesDocument(): string {
  // Minimal _document.tsx for Pages Router with suppressHydrationWarning.
  // We intentionally do not inject <body className=...> here; font classes are handled in _app.tsx.
  return `import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html suppressHydrationWarning>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
`;
}

export async function patchPagesDocumentFile(documentPath: string): Promise<
  "patched" | "already" | "unsupported"
> {
  const content = await fs.readFile(documentPath, "utf-8");

  // If this file doesn't even use Next's Html component, we can't safely patch.
  if (!content.includes("<Html") && !content.includes("<html")) {
    return "unsupported";
  }

  if (content.includes("suppressHydrationWarning")) {
    return "already";
  }

  // Patch <Html ...> or <html ...> opening tag.
  const nextContent = content.replace(
    /<(Html|html)([^>]*)>/,
    (match: string, tag: string, attrs: string) => {
      if (attrs.includes("suppressHydrationWarning")) return match;
      return `<${tag}${attrs} suppressHydrationWarning>`;
    },
  );

  if (nextContent === content) {
    return "unsupported";
  }

  await fs.writeFile(documentPath, nextContent);
  return "patched";
}
