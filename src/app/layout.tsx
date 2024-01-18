import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Vector from "/images/Vectors.png";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "@/hooks/PrivateRoute";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie App",
  description: "Movies list",
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-center" />
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          {children}
        </main>
        <img
            src="/images/Vectors.png"
            alt="background"
            style={{ width: "100vw", position: "fixed", bottom: "0", zIndex: '-1' }}
          />
      </body>
    </html>
  );
};
export default RootLayout;
