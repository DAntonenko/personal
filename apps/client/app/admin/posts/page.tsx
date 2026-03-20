import { getPosts } from "@/shared/api/posts";
import { AdminPostsList } from "./AdminPostsList";

export default async function AdminPostsPage() {
  const posts = await getPosts();

  return <AdminPostsList posts={posts} />;
}
