import * as React from "react";
import { BookOpen, BarChart3, Users, Settings, LogOut, Home } from "@/components/ui/icons";

interface SidebarProps {
  children: React.ReactNode;
  activePath?: string;
}

export function DashboardLayout({ children, activePath = "/teacher/dashboard" }: SidebarProps) {
  const teacherNav = [
    { name: "Хянах самбар", href: "/teacher/dashboard", icon: Home },
    { name: "Миний хичээлүүд", href: "/teacher/lessons", icon: BookOpen },
    { name: "Тайлан, Анализ", href: "/admin/analytics", icon: BarChart3 },
    { name: "Сурагчид", href: "#", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#071314] text-slate-100 flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 bg-slate-950/50 backdrop-blur-xl flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <a href="/" className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <span className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-slate-950" />
            </span>
            EduGen
          </a>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-1">
          {teacherNav.map((item) => (
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
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-colors">
            <Settings className="h-5 w-5" />
            Тохиргоо
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
            <LogOut className="h-5 w-5" />
            Гарах
          </a>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b border-white/10 bg-slate-950/30 backdrop-blur-md flex items-center justify-between px-8">
          <h1 className="text-lg font-medium">Багшийн удирдлага</h1>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border border-emerald-300 shadow-sm" />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8 relative isolate">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(63,210,199,0.05),_transparent_50%)] pointer-events-none" />
          {children}
        </main>
      </div>
    </div>
  );
}
