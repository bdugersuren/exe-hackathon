"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { BookOpen, BarChart3, Users, Settings, LogOut, Home, PlayCircle } from "@/components/ui/icons";

interface SidebarProps {
  children: React.ReactNode;
  activePath?: string;
}

export function DashboardLayout({ children, activePath = "/teacher/dashboard" }: SidebarProps) {
  const router = useRouter();
  const [toast, setToast] = React.useState("");

  const [userProfile, setUserProfile] = React.useState<any>(null);

  React.useEffect(() => {
    const loadUser = () => {
      const userStr = localStorage.getItem("edugen_user");
      if (!userStr) {
        router.push("/login");
      } else {
        try {
          const user = JSON.parse(userStr);
          if (user.role !== "teacher") {
            router.push("/student/dashboard");
          } else {
            setUserProfile(user);
          }
        } catch (e) {}
      }
    };

    loadUser();
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, [router]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "#soon") {
      e.preventDefault();
      setToast("Тун удахгүй нээгдэнэ!");
      setTimeout(() => setToast(""), 3000);
    }
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("edugen_user");
    router.push("/login");
  };

  const teacherNav = [
    { name: "Самбар", href: "/teacher/dashboard", icon: BarChart3 },
    { name: "Хичээлүүд", href: "/teacher/upload", icon: BookOpen },
    { name: "Сурагчид", href: "/teacher/students", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#070914] text-slate-100 flex font-sans selection:bg-[#b05cfd]/30">
      {/* Sidebar */}
      <div className="w-64 border-r border-[#b05cfd]/20 bg-[#0b0a1a]/80 glow-card rounded-none flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-[#00f5ff]/20">
          <a href="/" className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#b05cfd] to-[#00f5ff] flex items-center justify-center shadow-[0_0_15px_rgba(0,245,255,0.4)]">
              <BookOpen className="h-5 w-5 text-white" />
            </span>
            <span className="glow-text-cyan">EduGen</span>
          </a>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-1">
          {teacherNav.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                activePath === item.href
                  ? "bg-[#00f5ff]/10 text-[#00f5ff] font-medium border border-[#00f5ff]/30 shadow-[0_0_10px_rgba(0,245,255,0.1)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </a>
          ))}
        </div>
        
        <div className="p-4 border-t border-white/10 space-y-1">
          <a href="/teacher/settings" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activePath === "/teacher/settings" ? "bg-white/10 text-white font-medium" : "text-slate-400 hover:text-slate-100 hover:bg-white/5"}`}>
            <Settings className="h-5 w-5" />
            Тохиргоо
          </a>
          <a href="#" onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
            <LogOut className="h-5 w-5" />
            Гарах
          </a>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#b05cfd]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00f5ff]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <header className="h-16 border-b border-[#00f5ff]/10 bg-[#070914]/80 backdrop-blur-md flex items-center justify-between px-8 z-10">
          <h1 className="text-lg font-medium glow-text-purple">Багшийн удирдлага</h1>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full border border-[#00f5ff]/50 shadow-[0_0_15px_rgba(0,245,255,0.3)] shadow-sm bg-gradient-to-br from-[#00f5ff] to-[#b05cfd] overflow-hidden flex items-center justify-center text-xs font-bold text-white">
              {userProfile?.avatar ? (
                 <img src={userProfile.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                 userProfile?.name?.charAt(0) || "T"
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8 relative z-10">
          {children}
        </main>

        {toast && (
          <div className="absolute bottom-10 right-10 bg-[#00f5ff]/20 border border-[#00f5ff]/50 text-[#00f5ff] px-6 py-3 rounded-xl backdrop-blur-md shadow-[0_0_20px_rgba(0,245,255,0.3)] animate-[rise_0.3s_ease-out] z-50">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}
