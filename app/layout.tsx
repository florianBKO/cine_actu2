import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/layout/Navbar/Nav";
import Footer from "./components/layout/Footer";
import BtnTopPage from "./components/ui/BtnTopPage";
import { AuthProvider } from '@/contexts/AuthContext';
import { AlertProvider } from '@/contexts/Alert';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cine Actu",
  description: "Cine Actu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >

      <AuthProvider>
      <AlertProvider>

        <Nav/>  
        {children} </AlertProvider>
       
       <BtnTopPage/>
      
        <Footer/>
        </AuthProvider>
       

      </body>
    </html>
  );
}
