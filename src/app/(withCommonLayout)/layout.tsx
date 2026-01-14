"use client";

import { Montserrat } from "next/font/google";
import "../../app/globals.css";
import CurtainTransition from "@/components/PageTransition";
import { Toaster } from "react-hot-toast";

// 👉 Montserrat font import
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-montserrat antialiased`}>
        {children}
        <CurtainTransition />
      </body>
    </html>
  );
}
