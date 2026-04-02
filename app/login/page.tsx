"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, ArrowRight, BookOpen } from "@/components/ui/icons";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"teacher" | "student">("teacher");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const payload = mode === "login" 
         ? { email, password } 
         : { name, email, password, role };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      
      if (data.success) {
         localStorage.setItem("edugen_user", JSON.stringify(data.user));
         if (data.user.role === "teacher") {
            router.push("/teacher/dashboard");
         } else {
            router.push("/student/dashboard");
         }
      } else {
         setError(data.error || "Алдаа гарлаа");
      }
    } catch (err) {
      setError("Холболтын алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const setDemoCredentials = (role: "teacher" | "student") => {
     setEmail(`${role}@edugen.ai`);
     setPassword("password123");
  };

  return (
    <div className="min-h-screen bg-[#070914] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
       {/* Background Glows */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#b05cfd]/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00f5ff]/10 blur-[120px] rounded-full pointer-events-none" />

      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors z-20">
         <ArrowRight className="w-4 h-4 rotate-180" /> Нүүр хуудас
      </Link>

      <div className="glow-card w-full max-w-md p-8 md:p-10 relative z-10 border-t-[#00f5ff]/40 bg-[#0b0a1a]/80">
         <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#b05cfd] to-[#00f5ff] flex items-center justify-center shadow-[0_0_30px_rgba(176,92,253,0.4)]">
               <Sparkles className="w-8 h-8 text-white" />
            </div>
         </div>
         
         <h1 className="text-2xl font-bold text-center mb-2 glow-text-cyan">Тавтай морилно уу</h1>
         <p className="text-sm text-slate-400 text-center mb-6">EduGen AI систем болон ирээдүйтэй холбогдох</p>

         <div className="flex bg-[#110c22]/80 p-1 rounded-xl mb-6 border border-white/5">
            <button 
               onClick={() => { setMode("login"); setError(""); }}
               className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === "login" ? "bg-[#00f5ff]/20 text-[#00f5ff] shadow-[0_0_10px_rgba(0,245,255,0.2)]" : "text-slate-400 hover:text-white"}`}
            >
               Нэвтрэх
            </button>
            <button 
               onClick={() => { setMode("register"); setError(""); }}
               className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === "register" ? "bg-[#b05cfd]/20 text-[#b05cfd] shadow-[0_0_10px_rgba(176,92,253,0.2)]" : "text-slate-400 hover:text-white"}`}
            >
               Бүртгүүлэх
            </button>
         </div>

         {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
               {error}
            </div>
         )}

         <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
            <div>
               <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Нэр</label>
               <input 
                 type="text" 
                 required={mode === "register"}
                 value={name}
                 onChange={e => setName(e.target.value)}
                 className="w-full bg-[#110c22]/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#00f5ff]/50 focus:ring-1 focus:ring-[#00f5ff]/50 transition-all"
                 placeholder="Таны нэр"
               />
            </div>
            )}
            <div>
               <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Имэйл хаяг</label>
               <input 
                 type="email" 
                 required
                 value={email}
                 onChange={e => setEmail(e.target.value)}
                 className="w-full bg-[#110c22]/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#00f5ff]/50 focus:ring-1 focus:ring-[#00f5ff]/50 transition-all"
                 placeholder={mode === "login" ? "Нэвтрэх имэйл" : "Бүртгүүлэх имэйл"}
               />
            </div>
            <div>
               <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Нууц үг</label>
                  {mode === "login" && <a href="#" className="text-xs text-[#b05cfd] hover:text-[#00f5ff] transition-colors">Сэргээх?</a>}
               </div>
               <input 
                 type="password" 
                 required
                 value={password}
                 onChange={e => setPassword(e.target.value)}
                 className="w-full bg-[#110c22]/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#b05cfd]/50 focus:ring-1 focus:ring-[#b05cfd]/50 transition-all"
                 placeholder="••••••••••"
               />
            </div>
            {mode === "register" && (
            <div>
               <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Системд төлөөлөх дүр</label>
               <div className="flex gap-4">
                  <button type="button" onClick={() => setRole("teacher")} className={`flex-1 py-3 text-sm font-semibold rounded-xl border transition-all ${role === "teacher" ? "border-[#00f5ff] bg-[#00f5ff]/10 text-[#00f5ff]" : "border-slate-700 bg-[#110c22]/50 text-slate-400"}`}>Багш</button>
                  <button type="button" onClick={() => setRole("student")} className={`flex-1 py-3 text-sm font-semibold rounded-xl border transition-all ${role === "student" ? "border-[#b05cfd] bg-[#b05cfd]/10 text-[#b05cfd]" : "border-slate-700 bg-[#110c22]/50 text-slate-400"}`}>Сурагч</button>
               </div>
            </div>
            )}

            <button 
               type="submit" 
               disabled={loading || !email || !password || (mode === "register" && !name)}
               className="w-full py-3.5 rounded-xl button-gradient mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 font-bold"
            >
               {loading ? "Түр хүлээнэ үү..." : mode === "login" ? "Нэвтрэх" : "Бүртгэл үүсгэх"} <ArrowRight className="w-4 h-4" />
            </button>
         </form>

         {/* Hackathon Demo Magic Buttons */}
         <div className="mt-10 pt-6 border-t border-white/10">
            <p className="text-xs text-center text-slate-500 mb-4">Демо эрхээр нэвтрэх (Хакатон)</p>
            <div className="flex gap-4">
               <button onClick={() => setDemoCredentials('teacher')} className="flex-1 py-2 text-xs font-medium rounded-lg bg-[#b05cfd]/10 text-[#b05cfd] border border-[#b05cfd]/30 hover:bg-[#b05cfd]/20 transition-colors">
                  Багшийн эрх
               </button>
               <button onClick={() => setDemoCredentials('student')} className="flex-1 py-2 text-xs font-medium rounded-lg bg-[#00f5ff]/10 text-[#00f5ff] border border-[#00f5ff]/30 hover:bg-[#00f5ff]/20 transition-colors">
                  Сурагчийн эрх
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
