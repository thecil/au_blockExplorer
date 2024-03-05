import React from "react";

import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import Providers from "@/components/Providers";
import Header from "@/components/header/Index";
import Footer from "@/components/Footer";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          <main className="min-h-screen p-4">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
