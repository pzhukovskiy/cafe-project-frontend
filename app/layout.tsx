import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/header/page";
import Footer from "../components/footer/page";

export const metadata: Metadata = {
  title: "Батискаф",
  description: "Веб сайт для ресторана Батискаф",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
