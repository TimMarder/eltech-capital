import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ELTECH Capital | Multifamily Real Estate Investments",
  description: "We simplify the investment process to help you build wealth through real estate. View our portfolio of multifamily properties.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon-v2.png?v=2" type="image/png" />
        <link rel="shortcut icon" href="/favicon-v2.png?v=2" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon-v2.png?v=2" />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
