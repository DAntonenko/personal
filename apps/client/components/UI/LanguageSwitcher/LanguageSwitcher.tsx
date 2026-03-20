"use client";

import {useLocale} from "next-intl";
import {useRouter} from "next/navigation";
import { AppLocale } from "@/i18n";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  function changeLocale(nextLocale: AppLocale) {
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/`;
    router.refresh();
  }

  return (
    <div>
      <button
        disabled={locale === "en"}
        onClick={() => changeLocale("en")}
      >
        EN
      </button>

      <button
        disabled={locale === "ru"}
        onClick={() => changeLocale("ru")}
      >
        RU
      </button>
    </div>
  );
}
