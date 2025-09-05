
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "./context/SocketContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Quiz Rush⚡",
  description: "Real time quiz web app",
  icons : {
    icon : "/logo.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        <SocketProvider>
        <Header/>
        {children}
        <Toaster position="top-right" />
        </SocketProvider>  
        </AuthProvider>
      </body>
    </html>
  );
}
