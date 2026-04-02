"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { BookOpen, LogOut, Home, MessageSquare, Sparkles, BarChart3 } from "@/components/ui/icons";

interface SidebarProps {
  children: React.ReactNode;
  activePath?: string;
}

export function StudentLayout({ children, activePath = "/student/dashboard" }: SidebarProps) {
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
          if (user.role !== "student") {
            router.push("/teacher/dashboard");
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

  const studentNav = [
    { name: "Самбар", href: "/student/dashboard", icon: Home },
    { name: "Миний явц", href: "/student/progress", icon: BarChart3 },
    { name: "Алдаа засах", href: "/student/mistakes", icon: Sparkles },
    { name: "AI Туслах", href: "/student/ai-assistant", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-[#070914] text-slate-100 flex flex-col md:flex-row pb-16 md:pb-0 font-sans selection:bg-[#00f5ff]/30 overflow-hidden">
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex w-64 border-r border-[#00f5ff]/20 bg-[#0b0a1a]/80 glow-card rounded-none flex-col">
        <div className="h-16 flex items-center px-6 border-b border-[#b05cfd]/20">
          <a href="/" className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#b05cfd] to-[#00f5ff] flex items-center justify-center shadow-[0_0_15px_rgba(176,92,253,0.4)]">
              <Sparkles className="h-5 w-5 text-white" />
            </span>
            <span className="glow-text-purple">EduGen</span>
          </a>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-1">
          {studentNav.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                activePath === item.href
                  ? "bg-[#b05cfd]/10 text-[#b05cfd] font-medium border border-[#b05cfd]/30 shadow-[0_0_10px_rgba(176,92,253,0.1)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </a>
          ))}
        </div>
        
        <div className="p-4 border-t border-white/10 space-y-1">
          <a href="#" onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
            <LogOut className="h-5 w-5" />
            Гарах
          </a>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-[#00f5ff]/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[10%] w-[50%] h-[50%] bg-[#ff2a85]/5 blur-[150px] rounded-full pointer-events-none" />

        <header className="h-16 border-b border-[#b05cfd]/10 bg-[#070914]/80 backdrop-blur-md flex items-center justify-between px-6 md:px-8 z-10">
          <div className="flex items-center gap-2 md:hidden">
            <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#b05cfd] to-[#00f5ff] flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </span>
            <h1 className="text-lg font-bold glow-text-cyan">EduGen</h1>
          </div>
          <h1 className="text-lg font-medium hidden md:block glow-text-cyan">Сурагчийн хэсэг</h1>
          
          <div className="flex items-center gap-4">
            <a href="/student/settings" className="hover:opacity-80 transition-opacity">
              <div className="h-8 w-8 text-xs font-bold flex items-center justify-center rounded-full bg-gradient-to-br from-[#00f5ff] to-[#b05cfd] border border-[#00f5ff]/50 shadow-[0_0_15px_rgba(0,245,255,0.3)] shadow-sm overflow-hidden text-white">
                {userProfile?.avatar ? (
                   <img src={userProfile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                   userProfile?.name?.charAt(0) || "A"
                )}
              </div>
            </a>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10">
          {children}
        </main>

        {toast && (
          <div className="absolute top-20 right-10 bg-[#b05cfd]/20 border border-[#b05cfd]/50 text-[#b05cfd] px-6 py-3 rounded-xl backdrop-blur-md shadow-[0_0_20px_rgba(176,92,253,0.3)] animate-[rise_0.3s_ease-out] z-50">
            {toast}
          </div>
        )}
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0b0a1a]/90 backdrop-blur-md border-t border-[#00f5ff]/20 flex items-center justify-around z-50">
        {studentNav.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={(e) => handleLinkClick(e, item.href)}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 ${
              activePath === item.href ? "text-[#00f5ff] drop-shadow-[0_0_5px_rgba(0,245,255,0.8)]" : "text-slate-500"
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
