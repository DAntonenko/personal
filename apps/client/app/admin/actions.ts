"use server";

import { headers } from "next/headers";
import { getCurrentUser } from "@/shared/auth/getCurrentUser";

export async function createPost(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthenticated");
  }

  if (user.role !== "admin") {
    throw new Error("Forbidden");
  }

  const title = formData.get("title");
  const content = formData.get("content");

  const h = await headers();

  const host = h.get("host");
  const protocol =
    process.env.NODE_ENV === "production"
      ? "https"
      : "http";

  await fetch(`${protocol}://${host}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie: h.get("cookie") ?? "",
    },
    body: JSON.stringify({
      title,
      content,
    }),
  });
}
