import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Meeple Mind",
  description: "Board Game Refreheser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
