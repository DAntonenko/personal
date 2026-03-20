import { getCurrentUser } from "@/shared/auth/getCurrentUser";
import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "@/components/UI/LanguageSwitcher/LanguageSwitcher";

export async function Header() {

  const user = await getCurrentUser();

  const t = await getTranslations("Header");

  return (
    <header>
      <LanguageSwitcher />
      <nav>
        <ul>
          <li><a href="/">{t("homepage")}</a></li>
          <li><a href="/client_page">{t("clientPage")}</a></li>
          <li><a href="/blog">{t("blog")}</a></li>
          {!user && <li><a href="/login">{t("login")}</a></li>}
          {user && <li><a href="/admin">{t("admin")}</a></li>}
          {user && <li><a href="/admin/posts">{t("editPost")}</a></li>}
        </ul>
      </nav>
      {user &&
        <form method="POST" action="/api/auth/logout">
        <button type="submit">{t("logout")}</button>
        </form>
      }
    </header>
  );
}
