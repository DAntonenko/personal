"use client";

import {useLocale} from "next-intl";
import {useRouter} from "next/navigation";
import { AppLocale } from "@/i18n";

import styles from "./LanguageSwitcher.module.scss";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  function changeLocale(nextLocale: AppLocale) {
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/`;
    router.refresh();
  }

  return (
    <div className={styles.language_switcher}>
      <button
        className={locale === "en" ? styles.language__active : styles.language__inactive}
        disabled={locale === "en"}
        onClick={() => changeLocale("en")}
      >
        EN
      </button>
      /
      <button
        className={locale === "ru" ? styles.language__active : styles.language__inactive}
        disabled={locale === "ru"}
        onClick={() => changeLocale("ru")}
      >
        RU
      </button>
    </div>
  );
}
