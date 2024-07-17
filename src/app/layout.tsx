import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils"
import { Providers } from "@/providers/Providers";
import Appbar from "@/components/Appbar";
import { AI } from "@/actions/chat";
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Llama Lounge",
  description: "An AI chatbot to chat with the documentation of llama-index and langchainjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
          <AI>
            <Providers>
              <Appbar/>
              {children}
            </Providers>
          </AI>
        </body>
    </html>
  );
}
