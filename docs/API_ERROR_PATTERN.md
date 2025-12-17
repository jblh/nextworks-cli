API-route pattern for structured field errors (recommended)

Purpose

For client forms using react-hook-form (RHF) you often need structured field-level errors returned from the server so they can be applied to individual inputs. Server Actions (Next.js) are great for redirect flows and server-only logic, but they don't have a standard, built-in way to return structured JSON errors consumable by RHF. The pragmatic, fast approach for the MVP is:

- If you need structured field errors that should be mapped into RHF, implement an API route that returns ApiResult (jsonOk/jsonFail/jsonFromZod/jsonFromPrisma).
- On the client, fetch that API route, parse the JSON and call mapApiErrorsToForm(formMethods, payload). That helper will set field-level errors and return a global message if present.

Server (API route) example (pattern)

```ts app/api/examples/validate/route.ts
import { z } from "zod";
import { jsonOk, jsonFromZod, jsonFromPrisma } from "@/lib/server/result";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const created = await prisma.post.create({
      data: { title: data.title, content: data.content },
    });
    return jsonOk(created, { status: 201, message: "Post created" });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return jsonFromZod(err, { status: 400, message: "Validation failed" });
    }
    // Map common Prisma unique errors to field errors
    if ((err as any)?.code === "P2002") return jsonFromPrisma(err);
    return jsonFail("Server error");
  }
}
```

Client snippet (map server errors into RHF)

```tsx app/components/examples/create-post-client.tsx
"use client";
import { useForm } from "react-hook-form";
import { mapApiErrorsToForm } from "@/lib/forms/map-errors";

export default function CreatePostClient() {
  const methods = useForm({ defaultValues: { title: "", content: "" } });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (values: any) => {
    const res = await fetch("/api/examples/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const payload = await res.json().catch(() => null);

    if (!payload || !payload.success) {
      const global = mapApiErrorsToForm(methods, payload);
      // Show a toast or inline global error if `global` is set
      return;
    }

    reset();
    // success UI
  };

  return (
    // form that uses methods and render fields
    <form onSubmit={handleSubmit(onSubmit)} />
  );
}
```

Why not server actions for mapped field errors?

- Server actions are powerful and great for redirect/POST-redirect patterns where you don't need to map errors to specific fields on the client.
- If you need field-level errors mapped into a client form, an API route returning a consistent ApiResult shape is the fastest, most interoperable approach.

Where to look in the repo

- Real example of client-side mapping: app/examples/demo/create-post-form.tsx — it POSTS to /api/posts and uses mapApiErrorsToForm
- ApiResult helpers: lib/server/result.ts
- Error mapping helper: lib/forms/map-errors.ts

Quick copy/paste snippet (mapApiErrorsToForm usage)

```ts
import { mapApiErrorsToForm } from "@/lib/forms/map-errors";

// `methods` is the UseFormReturn returned from useForm()
const payload = await res.json().catch(() => null);
if (!res.ok || !payload?.success) {
  const global = mapApiErrorsToForm(methods, payload);
  // if `global` is set, show toast.error(global) or display a form-level message
}
```

ApiResult JSON shape

The repo uses a small, consistent ApiResult envelope for API routes that need to return structured field errors. Minimal shape:

```json
{
  "success": boolean,
  "data": any | null,
  "message?:": string,
  "errors?:": { "fieldName"?: string } | null,
  "code?:": string | number
}
```

- success: true for OK responses, false for validation/server errors.
- data: payload on success (or null).
- message: an optional human-readable global message.
- errors: optional map of field -> message for per-field errors that map into react-hook-form.
- code: optional machine-readable error code.

Signup / form integration example

In your signup (or any) client form that uses react-hook-form, call mapApiErrorsToForm when the API returns an error. This helper sets per-field errors and returns a global message you can show in a toast or top-level alert.

```ts
// inside your client onSubmit handler (methods is the UseFormReturn from useForm)
const res = await fetch("/api/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(values),
});
const payload = await res.json().catch(() => null);
if (!res.ok || !payload?.success) {
  // mapApiErrorsToForm sets field errors on `methods` and returns a global message (if any)
  const global = mapApiErrorsToForm(methods, payload);
  // show global message or payload.message
  showToastError(global || payload?.message || "Signup failed");
  return;
}

// success path
```

Mapping Prisma unique violations

When a Prisma unique constraint (P2002) occurs on the server, jsonFromPrisma will translate that into an ApiResult.errors object (e.g. { email: "Email already in use" }). The client mapApiErrorsToForm will then attach that message to the appropriate field.

Recommendation (MVP)

For now, prefer API routes + ApiResult for any flow that needs structured form errors. Keep server actions for redirect-only flows or when you don't need structured client-side error mapping.
