import type { Metadata } from "next";
import { Montserrat, Source_Code_Pro } from "next/font/google";
import { getCurrentUser } from "@/shared/auth/getCurrentUser";
import { AuthProvider } from "@/shared/auth/auth-context";

// internationalization
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";

import { Header } from "@/components/layout/Header/Header";

import "the-new-css-reset/css/reset.css";
import "./globals.css";
import "./layout.css";

const sans = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

const mono = Source_Code_Pro({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  const t = await getTranslations({
    locale,
    namespace: "Metadata"
  });

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return {
    title: t("title"),

    description: t("description"),

    openGraph: {
      title: t("title"),
      description: t("description"),

      url: baseUrl,
      siteName: t("siteName"),

      type: "website",

      locale: locale === "en" ? "en_US" : "ru_RU",

      images: [
        {
          url: `${baseUrl}/og.png`,
          width: 1200,
          height: 630,
          alt: t("title")
        }
      ]
    }
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await getCurrentUser();

  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${sans.variable} ${mono.variable}`}>
      <AuthProvider user={user}>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <body className="body">
            <Header />
            GU!
            {children}
          </body>
        </NextIntlClientProvider>
      </AuthProvider>
    </html>
  );
}
