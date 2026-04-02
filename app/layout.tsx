import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "EduGen AI | AI-д суурилсан интерактив, adaptive learning платформ",
  description:
    "Багшийн оруулсан материалыг AI ашиглан интерактив хичээл, тест, даалгавар болгон хувиргаж, сурагч бүрт тохирсон сургалтыг бий болгоно.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="mn"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
