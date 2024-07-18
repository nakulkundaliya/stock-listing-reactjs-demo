"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/app/provider/AuthProvider";
import Header from "@/app/components/Header";
import { Provider } from "react-redux";
import store from "./store";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Provider store={store}>
            <Header />
            {children}
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
