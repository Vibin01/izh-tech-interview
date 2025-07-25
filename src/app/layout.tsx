import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "izh-tech interview",
  description: "izh-tech interview task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
