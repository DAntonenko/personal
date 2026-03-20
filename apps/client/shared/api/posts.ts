import type { Post } from "@apps/contracts";

const API_URL = process.env.API_BASE_URL!;

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${API_URL}/api/posts`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load posts");
  }

  return res.json();
}
