import { headers } from "next/headers";

export type CurrentUser = {
  id: string;
  role: "admin" | "user";
  email: string;
} | null;

export async function getCurrentUser(): Promise<CurrentUser> {
  const h = await headers();

  const host = h.get("host");
  const protocol =
    process.env.NODE_ENV === "production"
      ? "https"
      : "http";

  const res = await fetch(
    `${protocol}://${host}/api/auth/me`,
    {
      headers: {
        cookie: h.get("cookie") ?? "",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  return data.user ?? null;
}
