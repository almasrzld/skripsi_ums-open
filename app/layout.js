import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/layout/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "UMS Open",
  description: "UMS Open",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
