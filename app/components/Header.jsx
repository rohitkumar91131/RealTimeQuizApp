"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserCircle } from "lucide-react";

export default function Header() {
    const links = [
        {
            href : "/" , name : "Home",
        },
        {
            href : "/leaderboard" , name : "Leaderboard",
        }
        ,
        {
            href : "/about" , name : "About",
        }
    ]
    const pathName = usePathname();
    console.log(pathName)
    return (
      <header className="fixed top-0 w-[100dvw] h-[50px] sm:h-[64px] flex items-center justify-between px-6 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-purple-600">QuizRush ⚡</h1>
        <nav className="space-x-6 hidden md:flex">
          {
            links.length>0 && links.map((link , index)=>(
                <Link href={link?.href} className={`hover:text-purple-600 ${pathName === link?.href ? "text-red-500" : ""}`} key={index}>{link?.name}</Link>
            ))
          }
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/auth" className="px-3 py-1 bg-purple-100 text-purple-600 rounded-xl hover:bg-purple-200">Signup/Login</Link>
          <UserCircle className="w-7 h-7 text-gray-700" />
        </div>
        
        
      </header>
    );
  }