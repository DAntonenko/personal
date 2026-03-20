"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function login(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    throw new Error("Invalid form data");
  }

  const h = await headers();

  const host = h.get("host");
  const protocol = process.env.NODE_ENV === "production"
    ? "https"
    : "http";

  const res = await fetch(`${protocol}://${host}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  redirect("/admin");
}
