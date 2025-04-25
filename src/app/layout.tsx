"use client";

import { store } from "@/store";
import { Geist, Geist_Mono } from "next/font/google";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import PagesWrapper from "./pagesWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider store={store}>
          <PagesWrapper>{children}</PagesWrapper>
        </ReduxProvider>

        <ToastContainer position="top-right" autoClose={5000} />
      </body>
    </html>
  );
}
