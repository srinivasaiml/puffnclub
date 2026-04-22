import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk, Geist } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreProvider";
import ProductModal from "@/components/ProductModal";
import CartDrawer from "@/components/CartDrawer";
import SearchOverlay from "@/components/SearchOverlay";
import Toast from "@/components/Toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScratchCard from "@/components/ScratchCard";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const bebas = Bebas_Neue({ 
  weight: "400",
  subsets: ["latin"], 
  variable: "--font-bebas" 
});
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space" 
});

export const metadata: Metadata = {
  title: "Puffnclub — Premium Men's T-Shirts",
  description: "Redefining men's basics with premium fabric, modern design, and honest pricing. Born from street culture, built for everyday.",
  icons: {
    icon: "/puffn-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <link rel="icon" href="/puffn-logo.svg" />
      </head>
      <body className={`${bebas.variable} ${spaceGrotesk.variable} font-space antialiased`}>
        <StoreProvider>
          <Preloader />
          <Navbar />
          {children}
          <FloatingWhatsApp />
          <ScratchCard />



          <Footer />
          
          <ProductModal />
          <CartDrawer />
          <SearchOverlay />
          <Toast />
        </StoreProvider>
      </body>
    </html>
  );
}
