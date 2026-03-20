import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getCurrentUser } from "@/shared/auth/getCurrentUser";
import { AuthProvider } from "@/shared/auth/auth-context";

// internationalization
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";

import { Header } from "@/components/layout/Header/Header";

import "the-new-css-reset/css/reset.css";
import "./globals.css";
import "./layout.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang={locale} className={geistSans.className}>
      <AuthProvider user={user}>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <body className={`${geistSans.variable} ${geistMono.variable} body`}>
            <Header />
            GU!
            {children}
          </body>
        </NextIntlClientProvider>
      </AuthProvider>
    </html>
  );
}
