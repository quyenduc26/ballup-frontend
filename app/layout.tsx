import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Suspense } from "react";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import Header from "@/components/Header";
import { BookingHistory } from "@/components/booking/bookingHistory";
import { UserProvider } from "@/context/UserContext";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          " bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <UserProvider>
          <Suspense>
            <Header />
            <Providers
              themeProps={{ attribute: "class", defaultTheme: "dark" }}
            >
              <div className="flex flex-col">
                <main>{children}</main>
              </div>
            </Providers>
            <Footer />
            <BookingHistory />
          </Suspense>
        </UserProvider>
      </body>
    </html>
  );
}
