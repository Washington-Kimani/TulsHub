import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import { Favicon } from "@/app/images/index";
import "./globals.css";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "TulsHub",
  description: "Tools you never knew you needed until now",
  icons: {
    icon: Favicon,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${josefinSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="relative min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
