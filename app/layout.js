import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Michias' Blog Site",
  icon: '/favicon.ico',
  description: "Welcome ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="outside">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
}
