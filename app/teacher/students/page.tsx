"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Sparkles, BrainCircuit, ArrowRight, MessageSquare } from "@/components/ui/icons";
import { useState, useEffect } from "react";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";

export default function TeacherStudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [overview, setOverview] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [generatingFeedback, setGeneratingFeedback] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/teacher/students");
      const data = await res.json();
      if (data.success) {
        setStudents(data.students);
        setOverview(data.overview);
      }
    } catch (e) {}
    finally {
      setLoading(false);
    }
  };

  const generateAIFeedback = async (student: any) => {
    setGeneratingFeedback(true);
    setAiFeedback(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { isAi: false, text: `Би багш байна. Миний сурагч ${student.name} (${student.level} түвшнийх) ${student.avgScore}% оноотой байна. Түүнд зориулсан урам зориг өгөх, цаашид анхаарах зүйлсийг нь тусгасан найрсаг зөвлөмж бичиж өгөөч. (Монгол хэлээр)` }
          ],
          userProfile: { name: "Багш" }
        })
      });
      const data = await res.json();
      if (data.success) {
        setAiFeedback(data.text);
      }
    } catch (e) {}
    finally {
      setGeneratingFeedback(false);
    }
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = levelFilter === "all" || s.level === levelFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout activePath="/teacher/students">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
            <Users className="w-6 h-6 text-[#00f5ff]" /> Сурагчдын удирдлага
          </h2>
          <p className="text-slate-400 text-sm">Бүх сурагчдын явц болон AI-ийн гаргасан дүнг эндээс хянана уу.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button onClick={fetchStudents} variant="outline" className="border-white/10 hover:bg-white/5 h-10 px-4 gap-2">
              <TrendingUp className="w-4 h-4" /> Шинэчлэх
           </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-20">
          <Loader2 className="w-12 h-12 text-[#b05cfd] animate-spin mb-4" />
          <p className="text-slate-400">Өгөгдлийг нэгтгэж байна...</p>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-500 overflow-hidden">
          {/* Summary Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-[#110c22] border-white/5 p-6 flex flex-col items-center justify-center text-center glow-card">
              <div className="w-12 h-12 rounded-xl bg-[#00f5ff]/10 text-[#00f5ff] flex items-center justify-center mb-3">
                <Users className="w-6 h-6" />
              </div>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Нийт сурагч</p>
              <h3 className="text-3xl font-black text-white">{overview?.totalStudents || 0}</h3>
            </Card>

            <Card className="bg-[#110c22] border-white/5 p-6 flex flex-col items-center justify-center text-center glow-card">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                <GraduationCap className="w-6 h-6" />
              </div>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Дундаж оноо</p>
              <h3 className="text-3xl font-black text-white">{overview?.classAvgScore || 0}%</h3>
            </Card>

            <Card className="bg-[#110c22] border-white/5 p-6 flex flex-col items-center justify-center text-center glow-card">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Түвшин (Дунд)</p>
              <h3 className="text-3xl font-black text-white">{overview?.levelDistribution?.Intermediate || 0}</h3>
            </Card>

            <Card className="bg-[#110c22] border-white/5 p-6 flex flex-col items-center justify-center text-center glow-card border-l-4 border-l-[#b05cfd]">
              <div className="w-12 h-12 rounded-xl bg-[#b05cfd]/10 text-[#b05cfd] flex items-center justify-center mb-3">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Идэвхтэй сурагчид</p>
              <h3 className="text-3xl font-black text-white">92%</h3>
            </Card>
          </div>

          {/* AI Insights Card */}
          <Card className="bg-[#110c22] border-[#b05cfd]/30 p-6 flex flex-col relative overflow-hidden shadow-[0_0_50px_rgba(176,92,253,0.05)]">
             <div className="absolute top-0 right-0 p-4 opacity-5"><Sparkles className="w-24 h-24" /></div>
             <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-[#b05cfd]" />
                <h3 className="font-bold text-white">AI Ангийн Дүгнэлт (Insights)</h3>
             </div>
             <div className="p-4 bg-[#b05cfd]/5 rounded-2xl border border-[#b05cfd]/10 text-slate-300 text-sm leading-relaxed italic">
                "{overview?.classInsight || "Дүгнэлт бэлтгэгдэх хангалттай өгөгдөл цуглаагүй байна."}"
             </div>
          </Card>

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96 group">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#00f5ff] transition-colors" />
               <input 
                  type="text" 
                  placeholder="Сурагчийн нэр эсвэл имэйлээр хайх..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 bg-slate-900/50 border border-white/5 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00f5ff]/40 focus:ring-1 focus:ring-[#00f5ff]/40 transition-all"
               />
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
               <div className="flex items-center gap-2 px-3 py-2 bg-slate-900/50 border border-white/5 rounded-xl">
                  <Filter className="w-4 h-4 text-slate-500" />
                  <select 
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    className="bg-transparent text-sm text-slate-300 focus:outline-none cursor-pointer"
                  >
                     <option value="all">Бүх түвшин</option>
                     <option value="Beginner">Анхан</option>
                     <option value="Intermediate">Дунд</option>
                     <option value="Advanced">Ахисан</option>
                  </select>
               </div>
            </div>
          </div>

          {/* Student Table */}
          <Card className="bg-[#110c22] border-white/5 overflow-hidden">
             <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full text-left border-collapse min-w-[600px]">
                   <thead>
                      <tr className="border-b border-white/5 bg-white/5">
                         <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Сурагч</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Түвшин</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Оноо (0-100)</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Үзсэн хичээл</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Алдаа</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Үйлдэл</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                      {filteredStudents.length === 0 ? (
                         <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-slate-500 italic">Сурагч олдсонгүй.</td>
                         </tr>
                      ) : (
                        filteredStudents.map((student) => (
                           <tr key={student.id} className="hover:bg-white/5 transition-colors cursor-pointer group" onClick={() => setSelectedStudent(student)}>
                              <td className="px-6 py-4">
                                 <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold border border-white/10 group-hover:border-[#00f5ff]/30 transition-all">
                                       {student.name.charAt(0)}
                                    </div>
                                    <div>
                                       <div className="text-sm font-bold text-white transition-colors group-hover:text-[#00f5ff]">{student.name}</div>
                                       <div className="text-[10px] text-slate-500 uppercase tracking-tight">{student.email}</div>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-4">
                                 <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                    student.level === 'Advanced' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                    student.level === 'Intermediate' ? 'bg-[#00f5ff]/10 text-[#00f5ff] border border-[#00f5ff]/20' :
                                    'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                                 }`}>
                                    {student.level === 'Advanced' ? 'Ахисан' : student.level === 'Intermediate' ? 'Дунд' : 'Анхан'}
                                 </span>
                              </td>
                              <td className="px-6 py-4 text-center">
                                 <div className="flex flex-col items-center gap-1">
                                    <span className="text-sm font-bold text-white">{student.avgScore}%</span>
                                    <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                                       <div className={`h-full transition-all ${
                                          student.avgScore > 80 ? 'bg-emerald-500' : student.avgScore > 40 ? 'bg-[#00f5ff]' : 'bg-rose-500'
                                       }`} style={{ width: `${student.avgScore}%` }} />
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-4 text-center text-sm text-slate-300 font-mono">{student.lessonsCompleted}</td>
                              <td className="px-6 py-4 text-center">
                                 <span className={`text-sm font-mono ${student.mistakesCount > 5 ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
                                    {student.mistakesCount}
                                 </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <Button variant="ghost" size="sm" className="text-slate-500 hover:text-white hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight className="w-4 h-4" />
                                 </Button>
                              </td>
                           </tr>
                        ))
                      )}
                   </tbody>
                </table>
             </div>
          </Card>
        </div>
      )}

      {/* Student Details Modal */}
      {selectedStudent && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setSelectedStudent(null)} />
            <Card className="relative w-full max-w-2xl bg-[#0b0a1a] border border-[#b05cfd]/20 overflow-hidden shadow-[0_0_100px_rgba(176,92,253,0.1)] flex flex-col max-h-[90vh]">
               <div className="p-6 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-[#b05cfd]/5 to-transparent">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-[#b05cfd]/20 flex items-center justify-center text-xl font-bold text-[#b05cfd]">
                        {selectedStudent.name.charAt(0)}
                     </div>
                     <div>
                        <h3 className="text-xl font-bold text-white">{selectedStudent.name}</h3>
                        <p className="text-sm text-slate-400">{selectedStudent.email}</p>
                     </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedStudent(null)} className="text-slate-500 hover:text-white">
                     <X className="w-6 h-6" />
                  </Button>
               </div>
               <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4">
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                        <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Оноо</p>
                        <p className="text-2xl font-black text-[#00f5ff]">{selectedStudent.avgScore}%</p>
                     </div>
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                        <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Дууссан</p>
                        <p className="text-2xl font-black text-white">{selectedStudent.lessonsCompleted}</p>
                     </div>
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                        <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Алдаа</p>
                        <p className="text-2xl font-black text-rose-500">{selectedStudent.mistakesCount}</p>
                     </div>
                  </div>

                  {/* Recent Mistakes */}
                  <div>
                     <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-500" /> Сүүлийн алдаанууд
                     </h4>
                     {selectedStudent.recentMistakes.length === 0 ? (
                        <p className="text-xs text-slate-500 italic p-4 bg-white/5 rounded-xl">Алдаа бүртгэгдээгүй байна.</p>
                     ) : (
                        <div className="space-y-2">
                           {selectedStudent.recentMistakes.map((m: any, i: number) => (
                              <div key={i} className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl text-xs">
                                 <p className="text-slate-300 font-medium line-clamp-1 mb-1">{m.question}</p>
                                 <div className="flex gap-4">
                                    <span className="text-rose-400">Таны: {m.wrongAnswer}</span>
                                    <span className="text-emerald-400">Зөв: {m.correctAnswer}</span>
                                 </div>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>

                  {/* AI Feedback Session */}
                  <div className="space-y-4 pt-4 border-t border-white/5">
                     <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                           <BrainCircuit className="w-4 h-4 text-[#b05cfd]" /> AI Хувийн зөвлөмж
                        </h4>
                        <Button 
                           onClick={() => generateAIFeedback(selectedStudent)}
                           disabled={generatingFeedback}
                           className="h-8 px-4 text-[10px] button-gradient rounded-full font-bold"
                        >
                           {generatingFeedback ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <Sparkles className="w-3 h-3 mr-2" />}
                           Зөвлөмж бичүүлэх
                        </Button>
                     </div>
                     {aiFeedback ? (
                        <div className="p-5 bg-[#b05cfd]/5 border border-[#b05cfd]/20 rounded-2xl animate-in fade-in slide-in-from-bottom-2 duration-500">
                           <MarkdownRenderer content={aiFeedback} />
                           <div className="mt-4 flex justify-end">
                              <Button variant="ghost" size="sm" className="text-xs text-slate-500 gap-2 hover:bg-white/5">
                                 <Mail className="w-4 h-4" /> Хуулах & Илгээх
                              </Button>
                           </div>
                        </div>
                     ) : (
                        <div className="p-8 border border-dashed border-white/10 rounded-2xl text-center flex flex-col items-center justify-center opacity-40">
                           <MessageSquare className="w-10 h-10 text-slate-600 mb-3" />
                           <p className="text-[10px] text-slate-500 max-w-[200px]">
                              Дээрх товчийг дарж сурагчийн прогресс дээр үндэслэн AI-аар хувийн зөвлөмж бичүүлнэ үү.
                           </p>
                        </div>
                     )}
                  </div>
               </div>
               <div className="p-6 border-t border-white/5 bg-slate-900/40">
                  <Button onClick={() => setSelectedStudent(null)} className="w-full bg-slate-800 hover:bg-slate-700 h-11 rounded-xl font-bold">Хаах</Button>
               </div>
            </Card>
         </div>
      )}
    </DashboardLayout>
  );
}

function Loader2(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function AlertCircle(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}

function GraduationCap(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M6 13v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6" />
    </svg>
  );
}

function Search(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function Filter(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function Mail(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function X(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
