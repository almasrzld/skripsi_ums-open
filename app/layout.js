import { Sansita } from "next/font/google";
import "./globals.css";
import Provider from "@/components/layout/provider";

const sansita = Sansita({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
});

export const metadata = {
  title: {
    default: "UMS Open",
    template: "%s | UMS Open",
  },
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
      <body className={sansita.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
