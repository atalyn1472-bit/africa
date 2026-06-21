import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeLanguageProvider } from "@/context/ThemeLanguageContext";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Journey to Africa | Explore the Wonders",
  description: "Discover the breathtaking landscapes, vibrant cultures, and wild beauty of Africa. Premium travel guide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable} font-sans antialiased h-full`}
    >
      <body className="min-h-full flex flex-col bg-bg-main text-text-main transition-colors duration-300">
        <ThemeLanguageProvider>
          {children}
        </ThemeLanguageProvider>
      </body>
    </html>
  );
}
