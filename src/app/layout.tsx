import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Taxi Academy - CRM & Eligibility Platform",
  description: "Smart Taxi Solutions - Private Hire Licence CRM & Eligibility Management Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable + " font-sans antialiased"}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}