import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "../../components/SessionWrapper";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MyEComMars",
  description: "Your Beloved Shopping Destination",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper><html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className={inter.className}>{children}<Analytics /></body>
    </html></SessionWrapper>
    
  );
}
