"use client";

import React, { useEffect, useMemo, useState, type JSX } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
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
import { userSchema, type UserFormValues } from "@/lib/validation/forms";
import { mapApiErrorsToForm } from "@/lib/forms/map-errors";

export interface UsersManagerSlots {
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

export interface UsersManagerProps extends UsersManagerSlots {
  className?: string;
}

type User = {
  id: string;
  email: string;
  name?: string | null;
  createdAt?: string;
};

export function UsersManager({
  className,
  container = {
    className:
      "mx-auto grid w-full max-w-5xl gap-6 p-0 sm:gap-6 sm:p-6 md:grid-cols-5 md:gap-1 md:p-1 lg:gap-6 lg:p-6",
  },
  formCard = { className: "p-2 sm:p-6 md:col-span-2" },
  listCard = { className: "p-2 sm:p-6 md:col-span-3" },
  leftHeading = { className: "mb-4 text-lg font-semibold" },
  rightHeading = { className: "mb-3 font-medium" },
  form = { className: "space-y-4" },
  submitRow = { className: "flex items-center gap-3" },
  actionsRow = { className: "flex flex-col gap-2 lg:flex-row" },
  table = { className: "" },
}: UsersManagerProps): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);

  const defaultValues = useMemo<UserFormValues>(
    () => ({ email: "", name: "" }),
    [],
  );

  const formMethods = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
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
  const [total, setTotal] = useState<number>(0);

  const fetchUsers = async (opts?: { page?: number; perPage?: number }) => {
    setListLoading(true);
    try {
      const p = opts?.page ?? page;
      const pp = opts?.perPage ?? perPage;
      const params = new URLSearchParams();
      params.set("page", String(p));
      params.set("perPage", String(pp));

      const res = await fetch(`/api/users?${params.toString()}`, {
        cache: "no-store",
      });
      const payload = await res.json().catch(() => null);

      let data: unknown = payload ?? [];
      if (payload && typeof payload === "object" && "success" in payload) {
        data = (payload as { data?: unknown }).data;
      }

      const items = Array.isArray(data)
        ? data
        : data && typeof data === "object" && "items" in data
          ? (data as { items?: unknown }).items
          : [];

      setUsers(Array.isArray(items) ? (items as User[]) : []);

      if (data && typeof data === "object") {
        const d = data as {
          total?: unknown;
          page?: unknown;
          perPage?: unknown;
        };
        if (typeof d.total === "number") setTotal(d.total);
        if (typeof d.page === "number") setPage(d.page);
        if (typeof d.perPage === "number") setPerPage(d.perPage);
      } else if (Array.isArray(items)) {
        setTotal(items.length);
      } else {
        setTotal(0);
      }

      if (opts?.page) setPage(opts.page);
      if (opts?.perPage) setPerPage(opts.perPage);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, perPage]);

  const createUser = async (values: UserFormValues) => {
    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = await res.json().catch(() => null);
      if (!res.ok || !payload?.success) {
        const msg = payload
          ? mapApiErrorsToForm(formMethods, payload)
          : undefined;
        toast.error(msg || payload?.message || "Create failed");
        return;
      }
      reset(defaultValues);
      setSelectedId(null);
      await fetchUsers();
      toast.success("User created");
    } catch {
      toast.error("Create failed");
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (values: UserFormValues) => {
    if (!selectedId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${selectedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email, name: values.name }),
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
      await fetchUsers();
      toast.success("User updated");
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const onEdit = (u: User) => {
    setSelectedId(u.id);
    setValue("email", u.email);
    setValue("name", u.name ?? "");
  };

  const confirmDelete = (id: string) => setPendingDeleteId(id);

  const doDelete = async () => {
    if (!pendingDeleteId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${pendingDeleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("User deleted");
      await fetchUsers();
    } catch {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
      setPendingDeleteId(null);
    }
  };

  const onCancel = () => {
    reset(defaultValues);
    setSelectedId(null);
  };

  return (
    <main className={cn(container.className, className)}>
      <Card className={cn(formCard.className)}>
        <h2 className={cn(leftHeading.className)}>User Manager</h2>

        <Form<UserFormValues> methods={formMethods}>
          <form
            onSubmit={handleSubmit(selectedId ? updateUser : createUser)}
            className={cn(form.className)}
          >
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="user@example.com"
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
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Optional name"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className={cn(submitRow.className)}>
              {!selectedId ? (
                <Button type="submit" disabled={isSubmitting || loading}>
                  Create User
                </Button>
              ) : (
                <>
                  <Button type="submit" disabled={isSubmitting || loading}>
                    Update User
                  </Button>
                  <Button type="button" variant="ghost" onClick={onCancel}>
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </form>
        </Form>
      </Card>

      <Card className={cn(listCard.className)}>
        <h3 className={cn(rightHeading.className)}>Users</h3>
        <Table className={cn(table.className)}>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-[200px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listLoading ? (
              <>
                {[0, 1, 2].map((i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-4 w-48" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      {/* actions cell empty during loading */}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.email}</TableCell>
                    <TableCell>{u.name || ""}</TableCell>
                    <TableCell>
                      <div className={cn(actionsRow.className)}>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onEdit(u)}
                        >
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => confirmDelete(u.id)}
                            >
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete user?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. The user will be
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
                {users.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-muted-foreground">
                      No users yet.
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
                (total > 0 ? page * perPage >= total : users.length === 0)
              }
            >
              Next
            </Button>
          </div>
          <div className="text-muted-foreground text-sm">
            Showing {Math.min((page - 1) * perPage + 1, total || 0)} -{" "}
            {Math.min(page * perPage, total || 0)} of {total}
          </div>
        </div>
      </Card>
    </main>
  );
}

export default UsersManager;
