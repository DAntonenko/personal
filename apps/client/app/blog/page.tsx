import { getPosts } from "@/shared/api/posts";
import {getTranslations} from "next-intl/server";
import styles from "./page.module.scss";

export default async function Blog() {
  const posts = await getPosts();

  const t = await getTranslations("Blog");

  return (
    <main className={styles.blog_page}>
      <h1 className={styles.main_title}>{t("title")}</h1>

      {posts.length === 0 && 
      <div className={styles.no_posts}>
        <img
          className={styles.lightbulb_icon}
          src="/icons/lightbulb-off.svg"
          alt="lightbulb"
        />
        <p className={styles.no_posts_message}>{t("no_posts")}</p>
        <p className={styles.come_back}>{t("come_back")}</p>
      </div>}

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <p>{post.id}</p>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small>
              {new Date(post.createdAt).toLocaleDateString('en-EN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
            </small>
          </li>
        ))}
      </ul>
    </main>
  );
}
