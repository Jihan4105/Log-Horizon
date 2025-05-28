import type { Metadata } from "next";
import "./globals.css";
import { shadowsIntoLightTwo } from "@/lib/font";

export const metadata: Metadata = {
  title:  {
    template: "%s | Log Horizon",
    default: "Log Horizon",
  },
  description: "Next.js aplication blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${shadowsIntoLightTwo.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
