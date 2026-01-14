"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CurtainTransition from "@/components/PageTransition";
import Navbar2nd from "@/components/shared/Navbar/Navbar2nd";
import Footer from "@/components/shared/Footer/Footer";
import { ToastContainer } from "react-toastify";
import ReduxProvider from "@/lib/ReduxProvider";

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
    <ReduxProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="w-full mx-auto ">
            {/* <Navbar /> */}
            <Navbar2nd />
            {children}
            <ToastContainer />
            <CurtainTransition />
            <Footer />
          </div>
        </body>
      </html>
    </ReduxProvider>
  );
}
