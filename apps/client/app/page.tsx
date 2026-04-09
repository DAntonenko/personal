import Image from "next/image";
import styles from "./page.module.scss";

import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {

  const locale = await getLocale();
  const t = await getTranslations("HomePage");

  return (
    <main className={styles.main}>
      <div className={styles.image_container}>
        <Image
          src="/images/content/portrait_lg.jpg"
          alt="Dmitri Antonenko"
          width={564}
          height={540}
          priority
        />
      </div>
      <section className={`${styles.content} ${locale === "ru" ? styles.content__ru : null}`}>
        <h1 className={`${styles.name} ${locale === "ru" ? styles.name__ru : null}`}>
          {t("name")}
        </h1>
        <div className={styles.role}>
          <h2 className={`${styles.role_title} ${locale === "ru" ? styles.role_title__ru : null}`}>
            {t("role")}
          </h2>
          <p
            className={`${styles.role_title} ${ styles.role_title__shadow} ${locale === "ru" ? styles.role_title__ru : null}`}
          >
            {t("role")}
          </p>
        </div>
        <p className={styles.description}>
          {t("focused")}
          <span className="highlighted">{t("frontend")}</span>
          {t("design")}
        </p>
        <p className={styles.experience}><span className="highlighted">{t("8_years")}</span>{t("in_the_commercial")}</p>
        <p className={styles.techstack}>{t("techstack")}: React, TypeScript, Next.js, Figma, Node.js<br/><span className="highlighted">{t("and_more")}</span></p>
        <div className={styles.links}>
          <a
            className={styles.link}
            href="https://linkedin.com/in/d-antonenko"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className={styles.icon}
              src="/icons/linkedin.svg"
              alt="LinkedIn"
            />
            linkedin.com/in/d-antonenko
          </a>

          <a
            className={styles.link}
            href="https://www.behance.net/dmitriantonenko"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className={styles.icon}
              src="/icons/behance.svg"
              alt="Behance"
            />
            behance.net/dmitriantonenko
          </a>

          <a
            className={styles.link}
            href="mailto:dmitriy.antonenko.dev@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className={styles.icon}
              src="/icons/email.svg"
              alt="Email"
            />
            dmitriy.antonenko.dev@gmail.com
          </a>
        </div>
      </section>
    </main>
  );
}
