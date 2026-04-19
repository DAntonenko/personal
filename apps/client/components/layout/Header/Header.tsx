"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/UI/LanguageSwitcher/LanguageSwitcher";

import styles from "./Header.module.scss";

export function Header() {

  const t = useTranslations("Header");
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <nav className={styles.header_nav}>
        <a
          href="/"
          className={pathname === "/" ? styles.header_nav_link__active : styles.header_nav_link__inactive}
        >
          {t("homepage")}
        </a>
        <hr className={styles.header_nav_divider} />
        <a
          href="/blog"
          // className={pathname === "/blog" ? styles.header_nav_link__active : styles.header_nav_link__inactive}
          className={styles.header_nav_link__disabled}
        >
          {t("blog")}
        </a>
      </nav>
      <LanguageSwitcher />
    </header>
  );
}
