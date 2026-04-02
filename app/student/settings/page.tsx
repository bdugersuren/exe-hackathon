"use client";

import { StudentLayout } from "@/components/layout/student-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, User as UserIcon, Lock, Save, CheckCircle } from "@/components/ui/icons";
import { useState, useEffect } from "react";

export default function StudentSettingsPage() {
  const [userName, setUserName] = useState("");
  const [grade, setGrade] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("edugen_user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserName(user.name || "Анар");
        setGrade(user.grade || "9-р анги");
        if (user.avatar) setAvatar(user.avatar);
      } catch (e) {}
    }
  }, []);

  const handleSave = () => {
    setSaving(true);
    setSaveSuccess(false);
    
    setTimeout(() => {
      const userStr = localStorage.getItem("edugen_user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          user.name = userName;
          user.grade = grade;
          if (avatar) user.avatar = avatar;
          else delete user.avatar;
          localStorage.setItem("edugen_user", JSON.stringify(user));
        } catch (e) {}
      }
      
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
    <StudentLayout activePath="/student/settings">
      <div className="max-w-3xl mx-auto space-y-8 mt-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#b05cfd]" /> Тохиргоо
          </h2>
          <p className="text-slate-400">Профайлын мэдээлэл болон сурах зорилгоо тохируулах.</p>
        </div>

        <Card className="bg-slate-900/60 border-slate-800 p-8 space-y-8">
            <div className="flex items-center gap-6 pb-8 border-b border-white/5">
               <div className="w-20 h-20 rounded-full border-2 border-[#b05cfd]/50 bg-gradient-to-br from-[#b05cfd] to-[#00f5ff] flex items-center justify-center text-2xl font-bold text-white shadow-[0_0_20px_rgba(176,92,253,0.3)] overflow-hidden shrink-0">
                  {avatar ? (
                     <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                     userName.charAt(0) || "A"
                  )}
               </div>
               <div>
                  <h3 className="text-xl font-semibold text-white">{userName}</h3>
                  <p className="text-[#b05cfd] text-sm mb-3">Сурагч</p>
                  <div className="flex gap-2">
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
                   <UserIcon className="w-5 h-5 text-slate-400" /> Профайлын мэдээлэл
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                       <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Нэр</label>
                       <input 
                          type="text" 
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="w-full bg-[#110c22]/80 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00f5ff]/50 transition-colors"
                       />
                   </div>
                   <div>
                       <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Анги / Зэрэг</label>
                       <input 
                          type="text" 
                          value={grade}
                          onChange={(e) => setGrade(e.target.value)}
                          className="w-full bg-[#110c22]/80 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00f5ff]/50 transition-colors"
                       />
                   </div>
                </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-white/5">
                <h4 className="text-lg font-medium text-white flex items-center gap-2">
                   <Lock className="w-5 h-5 text-slate-400" /> Аюулгүй байдал
                </h4>
                <div className="grid grid-cols-1 gap-6">
                   <div>
                       <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Шинэ нууц үг</label>
                       <input 
                          type="password" 
                          placeholder="Нууц үг солихгүй бол энэ чигт нь үлдээнэ үү"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-[#110c22]/80 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00f5ff]/50 transition-colors"
                       />
                   </div>
                </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex items-center justify-end">
                <div className="flex gap-4">
                   <Button onClick={handleSave} disabled={saving} className="button-gradient text-white font-bold gap-2 px-8">
                       {saving ? "Хадгалж байна..." : saveSuccess ? <><CheckCircle className="w-4 h-4" /> Хадгалагдлаа</> : <><Save className="w-4 h-4" /> Хадгалах</>}
                   </Button>
                </div>
            </div>
        </Card>
      </div>
    </StudentLayout>
  );
}
