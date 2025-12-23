"use client";

import React, { useEffect, useMemo, useState, type JSX } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Form } from "@/components/ui/form/form";
import { FormField } from "@/components/ui/form/form-field";
import { FormItem } from "@/components/ui/form/form-item";
import { FormLabel } from "@/components/ui/form/form-label";
import { FormMessage } from "@/components/ui/form/form-message";
import { FormControl } from "@/components/ui/form/form-control";
import { postSchema } from "@/lib/validation/forms";
import { mapApiErrorsToForm } from "@/lib/forms/map-errors";

export interface PostsManagerSlots {
  container?: { className?: string };
  formCard?: { className?: string };
  listCard?: { className?: string };
  leftHeading?: { className?: string };
  rightHeading?: { className?: string };
  form?: { className?: string };
  submitRow?: { className?: string };
  actionsRow?: { className?: string };
  table?: { className?: string };
}

export interface PostsManagerProps extends PostsManagerSlots {
  className?: string;
}

type Post = {
  id: string;
  title: string;
  content?: string | null;
  authorId: string;
  author?: { name?: string | null; email: string } | null;
  published?: boolean | null;
};

export function PostsManager({
  className,
  container = {
    className:
      "mx-auto grid w-full max-w-5xl gap-6 p-6 grid-cols-1 lg:[grid-template-columns:2fr_3.6fr]",
  },
  formCard = { className: "p-6" },
  listCard = { className: "p-6" },
  leftHeading = { className: "mb-4 text-lg font-semibold" },
  rightHeading = { className: "mb-3 font-medium" },
  form = { className: "space-y-4" },
  submitRow = { className: "flex items-center gap-3" },
  actionsRow = { className: "flex flex-col gap-2 lg:flex-row" },
  table = { className: "" },
}: PostsManagerProps): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);

  // Relaxed schema for this admin form: authorId is optional; the API defaults to the session user id if omitted.
  const postFormSchema = postSchema.extend({
    authorId: postSchema.shape.authorId.optional().or(z.literal("")),
    published: postSchema.shape.published?.optional(),
  });
  type AdminPostFormValues = z.infer<typeof postFormSchema>;

  const defaultValues = useMemo<AdminPostFormValues>(
    () => ({ title: "", content: "", authorId: "", published: false }),
    [],
  );

  const { data: session } = useSession();
  const sessionUserId = (session?.user as { id?: string } | undefined)?.id;
  const sessionIsAdmin =
    (session?.user as { role?: string } | undefined)?.role === "admin";

  const formMethods = useForm<AdminPostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = formMethods;

  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(8);
  const [q, setQ] = useState<string>("");
  const [sort, setSort] = useState<string>("createdAt_desc");
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [publishFilter, setPublishFilter] = useState<
    "all" | "published" | "draft"
  >("all");
    const [rowLoading, setRowLoading] = useState<Record<string, boolean>>({});


  const [total, setTotal] = useState<number>(0);

  const fetchPosts = async (opts?: { page?: number; perPage?: number }) => {
    setListLoading(true);
    try {
      const p = opts?.page ?? page;
      const pp = opts?.perPage ?? perPage;
      const params = new URLSearchParams();
      params.set("page", String(p));
      params.set("perPage", String(pp));
      if (q) params.set("q", q);
      if (sort) params.set("sort", sort);
      // keep explicit sort field and dir for clarity
      params.set("sortField", sortField);
      params.set("sortDir", sortDir);
      // published filter: all | published | draft
      if (publishFilter && publishFilter !== "all") {
        params.set("published", publishFilter);
      }

      const res = await fetch(`/api/posts?${params.toString()}`, {
        cache: "no-store",
      });
      const payload = await res.json().catch(() => null);
      const data =
        payload && typeof payload === "object" && "success" in payload
          ? (payload.data ?? [])
          : (payload ?? []);

      // Handle paginated shape { items, total, page, perPage }
      if (data && typeof data === "object" && "items" in data) {
        const d = data as { items: unknown; total?: unknown; page?: unknown; perPage?: unknown };
        setPosts(Array.isArray(d.items) ? (d.items as Post[]) : []);
        setTotal(typeof d.total === "number" ? d.total : 0);
        if (typeof d.page === "number") setPage(d.page);
        if (typeof d.perPage === "number") setPerPage(d.perPage);
      } else if (Array.isArray(data)) {
        setPosts(data as Post[]);
        setTotal(data.length);
      } else {
        setPosts([]);
        setTotal(0);
      }

      // If caller passed explicit page/perPage, update state
      if (opts?.page) setPage(opts.page);
      if (opts?.perPage) setPerPage(opts.perPage);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, perPage, q, sort, publishFilter]);

  const createPost = async (values: AdminPostFormValues) => {
    setLoading(true);
    try {
      // Do not send authorId when the user is not an admin; server will infer from session
      const payloadBody = sessionIsAdmin
        ? values
        : {
            title: values.title,
            content: values.content,
          };

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadBody),
      });
      const payload = await res.json().catch(() => null);
      if (!res.ok || !payload?.success) {
        const msg = payload
          ? mapApiErrorsToForm(formMethods, payload)
          : undefined;
        toast.error(
          msg || payload?.message || "Author ID not found or create failed",
        );
        return;
      }
      reset(defaultValues);
      await fetchPosts();
      toast.success("Post created");
    } catch {
      toast.error("Author ID not found or create failed");
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (values: AdminPostFormValues) => {
    if (!selectedId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${selectedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: values.title,
          content: values.content,
          published: values.published,
        }),
      });
      const payload = await res.json().catch(() => null);
      if (!res.ok || !payload?.success) {
        const msg = payload
          ? mapApiErrorsToForm(formMethods, payload)
          : undefined;
        toast.error(msg || payload?.message || "Update failed");
        return;
      }
      reset(defaultValues);
      setSelectedId(null);
      await fetchPosts();
      toast.success("Post updated");
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id: string) => setPendingDeleteId(id);

  const doDelete = async () => {
    if (!pendingDeleteId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${pendingDeleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      await fetchPosts();
      toast.success("Post deleted");
    } catch {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
      setPendingDeleteId(null);
    }
  };

  const onSelect = (p: Post) => {
    setSelectedId(p.id);
    setValue("title", p.title);
    setValue("content", p.content ?? "");
    setValue("authorId", p.authorId);
    setValue("published", (p.published as boolean) ?? false);
  };

  // Toggle published state for a post (inline from the list)
  const togglePublish = async (
    id: string,
    newVal: boolean,
    authorId?: string,
  ) => {
    // Only allow if current user is admin or the author
    const canToggle = sessionIsAdmin || sessionUserId === authorId;
    if (!canToggle) {
      toast.error("Forbidden");
      return;
    }

            // show row-level loading state
    setRowLoading((r) => ({ ...r, [id]: true }));




    // Do NOT optimistically remove or flip the row state; show spinner and refetch after success
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: newVal }),
      });
      const payload = await res.json().catch(() => null);
      if (!res.ok || !payload?.success) {
        throw new Error(payload?.message || "Failed to update");
      }

      // After successful update, refetch current page to get canonical state
      await fetchPosts();

      toast.success("Updated");
    } catch {
      toast.error("Failed to update published");
        } finally {
      setRowLoading((r) => {

        const copy = { ...r };
        delete copy[id];
        return copy;
      });
    }
  };

  const renderTwoLinePreview = (text?: string | null): JSX.Element | string => {
    if (!text) return "";
    const words = text.split(/\s+/).filter(Boolean);
    const maxPerLine = 5;
    const maxLines = 2;
    const maxWords = maxPerLine * maxLines; // 10 words
    if (words.length <= maxWords) {
      // If it fits, split into up to two lines for nicer layout
      if (words.length <= maxPerLine) return words.join(" ");
      const first = words.slice(0, maxPerLine).join(" ");
      const second = words.slice(maxPerLine).join(" ");
      return (
        <>
          {first}
          <br />
          {second}
        </>
      );
    }
    const first = words.slice(0, maxPerLine).join(" ");
    const second = words.slice(maxPerLine, maxWords).join(" ");
    return (
      <>
        {first}
        <br />
        {second}…
      </>
    );
  };

  return (
    <main className={cn(container.className, className)}>
      <Card className={cn(formCard.className)}>
        <h2 className={cn(leftHeading.className)}>Post Manager</h2>

        <Form<AdminPostFormValues> methods={formMethods}>
          <form
            onSubmit={handleSubmit(selectedId ? updatePost : createPost)}
            className={cn(form.className)}
          >
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Post title"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="content"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Post content (optional)"
                      autoComplete="off"
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="authorId"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>
                    Author ID (optional; defaults to your user)
                  </FormLabel>
                  <FormControl>
                    {sessionIsAdmin ? (
                      <Input
                        placeholder="Author ID"
                        autoComplete="off"
                        {...field}
                      />
                    ) : (
                      <Input
                        placeholder="Author ID"
                        autoComplete="off"
                        value={sessionUserId ?? ""}
                        disabled
                        onChange={() => {}}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4">
                  <FormLabel className="mr-2 mb-0">Published</FormLabel>
                  <FormControl>
                    <Switch
                      checked={!!field.value}
                      onChange={(e) =>
                        field.onChange((e.target as HTMLInputElement).checked)
                      }
                      className="ml-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className={cn(submitRow.className)}>
              {!selectedId ? (
                <Button type="submit" disabled={isSubmitting || loading}>
                  Create Post
                </Button>
              ) : (
                <>
                  <Button type="submit" disabled={isSubmitting || loading}>
                    Update Post
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      reset(defaultValues);
                      setSelectedId(null);
                    }}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </form>
        </Form>
      </Card>

      <Card className={cn(listCard.className)}>
        <h3 className={cn(rightHeading.className)}>All Posts</h3>

        <div className="mb-3">
          {/* Search on its own line to avoid overflowing controls in narrow cards */}
          <div className="mb-2">
            <Input
              placeholder="Search title..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <select
                value={publishFilter}
                onChange={(e) => {
                  setPublishFilter(
                    e.target.value as "all" | "published" | "draft",
                  );
                  setPage(1);
                }}
                className="rounded-md border px-2 py-1"
              >
                <option value="all">All</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
              </select>

              <button
                type="button"
                onClick={() => {
                  // toggle sort by createdAt
                  if (sortField === "createdAt") {
                    const nd = sortDir === "desc" ? "asc" : "desc";
                    setSortDir(nd);
                    setSort(`createdAt${nd === "desc" ? "_desc" : ""}`);
                  } else {
                    setSortField("createdAt");
                    setSortDir("desc");
                    setSort("createdAt_desc");
                  }
                  setPage(1);
                }}
                className="inline-flex h-9 items-center gap-2 rounded-md border px-3"
              >
                <span>Newest</span>
                <span
                  className={`w-4 text-center text-sm leading-none ${sortField === "createdAt" ? "opacity-100" : "opacity-0"}`}
                >
                  {sortDir === "desc" ? "▼" : "▲"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  // toggle sort by title
                  if (sortField === "title") {
                    const nd = sortDir === "desc" ? "asc" : "desc";
                    setSortDir(nd);
                    setSort(`title${nd === "desc" ? "_desc" : ""}`);
                  } else {
                    setSortField("title");
                    setSortDir("asc");
                    setSort("title");
                  }
                  setPage(1);
                }}
                className="inline-flex h-9 items-center gap-2 rounded-md border px-3"
              >
                <span>Title</span>
                <span
                  className={`w-4 text-center text-sm leading-none ${sortField === "title" ? "opacity-100" : "opacity-0"}`}
                >
                  {sortDir === "asc" ? "▲" : "▼"}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">
                Showing {Math.min((page - 1) * perPage + 1, total || 0)} -{" "}
                {Math.min(page * perPage, total || 0)} of {total}
              </span>
            </div>
          </div>
        </div>

        <Table className={cn(table.className)}>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[240px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listLoading ? (
              <>
                {[0, 1, 2].map((i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-4 w-56" />
                    </TableCell>
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                  </TableRow>
                ))}
              </>
            ) : (
              <>
                {posts.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.title}</TableCell>
                    <TableCell>{p.author?.name || p.authorId}</TableCell>
                    <TableCell className="max-w-[320px] align-top break-words">
                      <div className="max-w-[320px] overflow-hidden text-ellipsis">
                        {renderTwoLinePreview(p.content)}
                      </div>
                    </TableCell>
                    <TableCell className="align-middle">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={!!p.published}
                          onChange={(e) =>
                            togglePublish(
                              p.id,
                              (e.target as HTMLInputElement).checked,
                              p.authorId,
                            )
                          }
                          isLoading={!!rowLoading[p.id]}
                          disabled={
                            !!rowLoading[p.id] ||
                            listLoading ||
                            !(sessionIsAdmin || sessionUserId === p.authorId)
                          }
                        />
                        <span
                          className={
                            p.published
                              ? "text-green-600"
                              : "text-muted-foreground"
                          }
                        >
                          {p.published ? "Published" : "Draft"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={cn(actionsRow.className)}>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onSelect(p)}
                        >
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => confirmDelete(p.id)}
                            >
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete post?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. The post will be
                                removed permanently.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel
                                onClick={() => setPendingDeleteId(null)}
                              >
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction onClick={doDelete}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {posts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-muted-foreground">
                      No posts yet.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1 || listLoading}
            >
              Prev
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setPage((p) => p + 1)}
              disabled={
                listLoading ||
                (total > 0 ? page * perPage >= total : posts.length === 0)
              }
            >
              Next
            </Button>
          </div>
          <div className="text-muted-foreground text-sm">Page {page}</div>
        </div>
      </Card>
    </main>
  );
}

export default PostsManager;
