import * as React from "react";
import { BookOpen, LogOut, Home, MessageSquare, Sparkles } from "@/components/ui/icons";

interface SidebarProps {
  children: React.ReactNode;
  activePath?: string;
}

export function StudentLayout({ children, activePath = "/student/dashboard" }: SidebarProps) {
  const studentNav = [
    { name: "Мэдээллийн хуудас", href: "/student/dashboard", icon: Home },
    { name: "Миний хичээлүүд", href: "#", icon: BookOpen },
    { name: "AI Туслах", href: "#", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-[#071314] text-slate-100 flex pb-16 md:pb-0">
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex w-64 border-r border-white/10 bg-slate-950/50 backdrop-blur-xl flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <a href="/" className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <span className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-slate-950" />
            </span>
            EduGen
          </a>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-1">
          {studentNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activePath === item.href
                  ? "bg-emerald-500/10 text-emerald-400 font-medium"
                  : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </a>
          ))}
        </div>
        
        <div className="p-4 border-t border-white/10 space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
            <LogOut className="h-5 w-5" />
            Гарах
          </a>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b border-white/10 bg-slate-950/30 backdrop-blur-md flex items-center justify-between px-6 md:px-8">
          <div className="flex items-center gap-2 md:hidden">
            <span className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-slate-950" />
            </span>
            <h1 className="text-lg font-bold">EduGen</h1>
          </div>
          <h1 className="text-lg font-medium hidden md:block">Сурагчийн хэсэг</h1>
          
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 text-sm font-bold flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 border border-indigo-300 shadow-sm">
              А
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative isolate">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.05),_transparent_50%)] pointer-events-none" />
          {children}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-950 border-t border-white/10 flex items-center justify-around z-50">
        {studentNav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 ${
              activePath === item.href ? "text-emerald-400" : "text-slate-500"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px]">{item.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
