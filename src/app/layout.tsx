import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./component/header";
import Footer from "./component/footer";
import SecondFooter from "./component/secondFooter";
<link rel="icon" href="/favicon.ico" sizes="any" />


const inter = Inter({ subsets: ["latin"] ,  weight: ['400','500', '700'],});

export const metadata: Metadata = {
  title: "Event Horizon",
  description: "Developed By Abdul Wasay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ `${inter.className} flex flex-col` }>
        <Header></Header>
        {children}
        <Footer></Footer>
        <SecondFooter></SecondFooter>
      </body>
    </html>
  );
}
