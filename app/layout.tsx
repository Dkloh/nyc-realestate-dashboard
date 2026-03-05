import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NYC Real Estate Dashboard",
  description: "NYC real estate market insights powered by NYC Open Data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}