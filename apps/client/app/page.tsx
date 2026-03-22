import Image from "next/image";
import styles from "./page.module.scss";

import { getCurrentUser } from "@/shared/auth/getCurrentUser";
import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {

  const user = await getCurrentUser();

  const locale = await getLocale();
  const t = await getTranslations("HomePage");

  return (
    <main className={styles.main}>
      <Image
        className={styles.main_image}
        src="/images/content/portrait_lg.jpg"
        alt="Dmitri Antonenko"
        width={516}
        height={500}
        priority
      />
      <section className={styles.main_content}>
        <h1 className={styles.main_title}>{t("role").toUpperCase()}</h1>
        <p>{t("description")}</p>
        <p>{t("experience")}</p>
        <p>{t("techstack")}: {t("technologies")}</p>
      </section>
    </main>
  );
}
