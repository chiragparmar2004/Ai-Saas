"use client";

import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FreeCounter } from "./free-counter";
const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
      color: "text-sky-500"
    },
    {
      label: 'Conversation',
      icon: MessageSquare,
      href: '/conversation',
      color: "text-violet-500",
    },
    {
      label: 'Image Generation',
      icon: ImageIcon,
      color: "text-pink-700",
      href: '/image',
    },
    {
      label: 'Video Generation',
      icon: VideoIcon,
      color: "text-orange-700",
      href: '/video',
    },
    {
      label: 'Music Generation',
      icon: Music,
      color: "text-emerald-500",
      href: '/music',
    },
    {
      label: 'Code Generation',
      icon: Code,
      color: "text-green-700",
      href: '/code',
    },
    {
      label: 'Settings',
      icon: Settings,
      href: '/settings',
    },
  ];

interface SidebarProps{
  apiLimitCount:number;
};
const Sidebar = ({apiLimitCount=0}:SidebarProps) => {

    const pathname=usePathname();
       //Code to solve hydration error
    // -------------------------------
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    if (!isMounted) {
      return null;
    }
  //-----------------------------------
  return (
    <div className="space-y-6 py-2 flex flex-col h-full bg-[#111827] text-white gap-3">
      <div className="px-3 py-6 flex flex-col">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image fill src="/logo.png" alt="Logo" />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            Genius
          </h1>
        </Link>
        <div className="space-y-`">
          {routes.map((route) => (
            <Link href={route.href} key={route.href} className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-white/10 rounded-lg transition-all duration-50",
            pathname=== route.href ? "text-white bg-white/10":"text-zinc-400"
          )}>
               <div className="flex items-center">
               <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
       <div>
       <FreeCounter apiLimitCount={apiLimitCount} isPro={false}/>

       </div>
    </div>
  );
};

export default Sidebar;
