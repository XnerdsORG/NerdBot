import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const orbitron = Inter({ 
  subsets: ["latin"],
  variable: '--font-orbitron',
});

export const metadata = {
  title: "Xnerds Chat",
  description: "Chat with Xnerds AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${orbitron.variable} font-sans`}>{children}</body>
    </html>
  );
}
