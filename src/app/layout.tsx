import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/dashboard/main-nav";
import { NextAuthProvider } from "@/providers/authProvider";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <>
        <div className="border-b">
          <NextAuthProvider>
              <MainNav className="mx-6" />
              
           
          </NextAuthProvider>
          </div>
            

          
        </>
        {children}
      </body>
    </html>
  );
}



