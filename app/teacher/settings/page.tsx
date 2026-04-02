"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, User as UserIcon, Lock, Save, CheckCircle } from "@/components/ui/icons";
import { useState, useEffect } from "react";

export default function TeacherSettingsPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("edugen_user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserName(user.name || "Багш аа");
        setEmail(user.email || "teacher@demo.com");
        if (user.avatar) setAvatar(user.avatar);
      } catch (e) {}
    }
  }, []);

  const handleSave = () => {
    setSaving(true);
    setSaveSuccess(false);
    
    // Simulate API call and storage save
    setTimeout(() => {
      const userStr = localStorage.getItem("edugen_user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          user.name = userName;
          user.email = email;
          if (avatar) user.avatar = avatar;
          else delete user.avatar;
          localStorage.setItem("edugen_user", JSON.stringify(user));
        } catch (e) {}
      }
      
      // Dispatch storage event manually so other tabs/components can update
      window.dispatchEvent(new Event("storage"));
      
      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 800);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
        if (event.target?.result) setAvatar(event.target.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <DashboardLayout activePath="/teacher/settings">
      <div className="max-w-3xl mx-auto space-y-8 mt-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#00f5ff]" /> Ерөнхий Тохиргоо
          </h2>
          <p className="text-slate-400">Өөрийн хувийн мэдээлэл болон нууцлалын тохиргоогоо удирдах.</p>
        </div>

        <Card className="bg-slate-900/60 border-slate-800 p-8 space-y-8">
            <div className="flex items-center gap-6 pb-8 border-b border-white/5">
               <div className="w-20 h-20 rounded-full border-2 border-[#00f5ff]/50 bg-gradient-to-br from-[#00f5ff] to-[#b05cfd] flex items-center justify-center text-2xl font-bold text-white shadow-[0_0_20px_rgba(0,245,255,0.3)] overflow-hidden shrink-0">
                  {avatar ? (
                     <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                     userName.charAt(0) || "T"
                  )}
               </div>
               <div>
                  <h3 className="text-xl font-semibold text-white">{userName}</h3>
                  <p className="text-emerald-400 text-sm">Багш эрхтэй</p>
                  <div className="flex gap-2 mt-3">
                     <div className="relative">
                       <input 
                         type="file" 
                         accept="image/*"
                         onChange={handleAvatarChange}
                         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                       />
                       <Button variant="outline" className="h-8 text-xs bg-white/5 border-white/10 hover:bg-white/10 pointer-events-none">Зураг солих</Button>
                     </div>
                     {avatar && (
                        <Button variant="ghost" onClick={() => setAvatar(null)} className="h-8 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10">Устгах</Button>
                     )}
                  </div>
               </div>
            </div>

            <div className="space-y-6">
                <h4 className="text-lg font-medium text-white flex items-center gap-2">
                   <UserIcon className="w-5 h-5 text-slate-400" /> Хувийн мэдээлэл
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                       <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Бүтэн нэр</label>
                       <input 
                          type="text" 
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="w-full bg-[#110c22]/80 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00f5ff]/50 transition-colors"
                       />
                   </div>
                   <div>
                       <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Имэйл хаяг</label>
                       <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-[#110c22]/80 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00f5ff]/50 transition-colors"
                       />
                   </div>
                </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-white/5">
                <h4 className="text-lg font-medium text-white flex items-center gap-2">
                   <Lock className="w-5 h-5 text-slate-400" /> Нууцлал & Аюулгүй байдал
                </h4>
                <div className="grid grid-cols-1 gap-6">
                   <div>
                       <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Шинэ нууц үг сольж баталгаажуулах</label>
                       <input 
                          type="password" 
                          placeholder="Хэрэв нууц үгээ солихгүй бол хоосон үлдээнэ үү"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-[#110c22]/80 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00f5ff]/50 transition-colors"
                       />
                   </div>
                </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                <p className="text-xs text-slate-500">
                    Сүүлд нэвтэрсэн төхөөрөмж: Одоогийн веб хөтөч
                </p>
                <div className="flex gap-4">
                   <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">Хаях</Button>
                   <Button onClick={handleSave} disabled={saving} className="bg-[#b05cfd] hover:bg-purple-600 text-white gap-2 px-8">
                       {saving ? "Хадгалж байна..." : saveSuccess ? <><CheckCircle className="w-4 h-4" /> Хадгалагдлаа</> : <><Save className="w-4 h-4" /> Хадгалах</>}
                   </Button>
                </div>
            </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
