import type { Metadata } from "next";
import localFont from "next/font/local";
import { CustomProvider } from "rsuite";
import "./styles/globals.css";
import "rsuite/dist/rsuite-no-reset.min.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-900`}
      >
        <div className="w-screen h-screen bg-black absolute text-white z-30 flex items-center justify-center xl:hidden">
          Prezentacja jest niedostępna na ekrany tej wielkości. Skorzystaj z
          większego ekranu!
        </div>
        <CustomProvider>{children}</CustomProvider>
      </body>
    </html>
  );
}
