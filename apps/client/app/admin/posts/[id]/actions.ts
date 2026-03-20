"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function updatePost(id: string, formData: FormData) {
  const title = formData.get("title");
  const content = formData.get("content");

  if (!title || !content) {
    throw new Error("Invalid payload");
  }

  const h = await headers();

  const host = h.get("host");
  const protocol =
    process.env.NODE_ENV === "production" ? "https" : "http";

  const res = await fetch(
    `${protocol}://${host}/api/posts/${id}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        cookie: h.get("cookie") ?? "",
      },
      body: JSON.stringify({
        title,
        content,
      }),
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Update failed");
  }

  redirect("/admin");
}

export async function deletePost(id: string) {
  const h = await headers();

  const host = h.get("host");
  const protocol =
    process.env.NODE_ENV === "production" ? "https" : "http";

  const res = await fetch(
    `${protocol}://${host}/api/posts/${id}`,
    {
      method: "DELETE",
      headers: {
        cookie: h.get("cookie") ?? "",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete post");
  }

  redirect("/admin/posts");
}
