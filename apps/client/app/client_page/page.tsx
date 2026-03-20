"use client";

import type { Post } from "@apps/contracts";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/shared/auth/auth-context";

import {useLocale} from "next-intl";
import {useTranslations} from "next-intl";

export default function ClientPage() {
  const user = useCurrentUser();

  const [count, setCount] = useState<number>(0);
  
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If env variable needed in client component - it must begin strictly with NEXT_PUBLIC_...
    // Example:
    // const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
    const controller = new AbortController();

    const load = async (): Promise<void> => {
      try {
        const res = await fetch("/api/posts", {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const json: Post[] = await res.json();
        setPosts(json);
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") {
          return;
        }

        setError((e as Error).message);
      }
    };

    load();

    return () => {
      controller.abort();
    };
  }, []);

  const locale = useLocale();
  const t = useTranslations("ClientPage");

  return (
    <main>
      <h1>Client Component</h1>
      <h2>{t('title')}</h2>
      {user ? <p>Welcome, {user.role}!</p> : <p>You are not logged in</p>}
      <p>Current locale: {locale}</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>Increment</button>

      {!error &&posts.length === 0 && <p>No posts yet</p>}
      {error && <p>{error}</p>}

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small>{new Date(post.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </main>
  );
}
