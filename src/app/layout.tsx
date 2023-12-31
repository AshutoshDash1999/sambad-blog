"use client";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Sambad",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <MantineProvider>
          <Notifications
            position="top-right"
            zIndex={2077}
            limit={5}
            autoClose={4000}
          />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
