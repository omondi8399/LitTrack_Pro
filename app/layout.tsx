import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Book Amplify - Book Management System",
  description: "A modern book inventory management system for organizing and tracking your book collection",
  keywords: ["book management", "library", "reading", "books", "inventory"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <Toaster position="top-center" />
      <body 
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white dark:bg-gray-950`}
      >
        <header className="border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2">
              <Image 
                src="/2.png" 
                alt="Book Amplify Logo" 
                width={40} 
                height={40} 
                
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Book Amplify
              </span>
            </div>
          </div>
        </header>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}