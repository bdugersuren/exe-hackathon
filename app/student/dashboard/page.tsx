"use client";

import { StudentLayout } from "@/components/layout/student-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen as BookIcon, PlayCircle as PlayIcon, Sparkles as SparkleIcon, ArrowRight } from "@/components/ui/icons";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function AlertCircleIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}

function TrendingUpIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

export default function StudentDashboard() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Анар");
  const [userLevel, setUserLevel] = useState("");
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Бүгд");
  const categories = ["Бүгд", "Математик", "Нийгэм", "Монгол хэл", "Бусад"];

  const [stats, setStats] = useState({ xp: 0, streak: 0, lessonsCompleted: 0 });

  useEffect(() => {
    const userStr = localStorage.getItem("edugen_user");
    let uid = "";
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name) setUserName(user.name);
        if (user.level) setUserLevel(user.level);
        if (user.id) uid = user.id;
        
        if (!user.onboardingCompleted) {
          router.push("/student/onboarding");
          return;
        }
      } catch (e) {}
    }

    Promise.all([
      fetch('/api/lesson').then(res => res.json()),
      uid ? fetch(`/api/progress?userId=${uid}`).then(res => res.json()) : Promise.resolve({ success: false })
    ]).then(([lessonData, progressData]) => {
      
      if (progressData.success && progressData.stats) {
          setStats(progressData.stats);
      }

      if (lessonData.success) {
         const progMap = new Map();
         if (progressData.success) {
            progressData.progress.forEach((p: any) => progMap.set(p.lessonId, p.progressPercent));
         }

         const mapped = lessonData.lessons.map((l: any) => ({
            id: l.id,
            title: l.title,
            subject: l.subject,
            progress: progMap.get(l.id) || 0,
         }));
         setLessons(mapped.reverse());
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const inProgress = lessons.filter(l => l.progress > 0 && l.progress < 100);
  const notStarted = lessons.filter(l => l.progress === 0);
  const completed = lessons.filter(l => l.progress === 100);

  const currentLesson = inProgress[0] || notStarted[0] || lessons[0];

  const revisionTopics = [];
  for (const l of [...inProgress, ...notStarted, ...completed]) {
     if (currentLesson && l.id === currentLesson.id) continue;
     if (revisionTopics.length < 2) {
        revisionTopics.push(l);
     }
  }

  return (
    <StudentLayout activePath="/student/dashboard">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-white mb-1">Сайн уу, {userName}! 🌟</h2>
        <div className="flex items-center gap-3">
          <p className="text-slate-400">Өнөөдөр суралцахад бэлэн үү? Таны дараагийн даалгаврууд хүлээж байна.</p>
          {userLevel && (
            <span className="px-2 py-0.5 rounded bg-[#b05cfd]/20 text-[#b05cfd] text-[10px] font-bold uppercase tracking-wider border border-[#b05cfd]/30">
               {userLevel === 'Beginner' ? 'Анхан' : userLevel === 'Intermediate' ? 'Дунд' : 'Ахисан'}
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {currentLesson ? (
        <Card className="bg-emerald-950/30 border-emerald-900 overflow-hidden relative">
          <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
          <CardHeader className="pb-2">
            <CardTitle className="text-amber-400 text-xs font-semibold uppercase tracking-wider">Яг одоо судлах</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white leading-tight line-clamp-1">{currentLesson.title}</h3>
              <p className="text-sm text-slate-300 mt-1">{currentLesson.subject}</p>
            </div>
            
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${currentLesson.progress}%` }} />
            </div>
            
            <Link href={`/student/lesson/${currentLesson.id}`}>
              <Button variant="premium" className="w-full gap-2">
                <PlayIcon className="h-4 w-4" /> {currentLesson.progress > 0 ? "Үргэлжлүүлэх" : "Эхлэх"}
              </Button>
            </Link>
          </CardContent>
        </Card>
        ) : (
           <Card className="bg-emerald-950/30 border-emerald-900 flex items-center justify-center p-6"><span className="text-emerald-500/50">Хичээл олдсонгүй</span></Card>
        )}

        <Card className="bg-slate-900/40 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-indigo-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
              <TrendingUpIcon className="h-4 w-4" /> Таны ахиц
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-extrabold text-white">{stats.lessonsCompleted}</span>
              <span className="text-slate-400 pb-1">хичээл</span>
            </div>
            <p className="text-sm text-slate-300">Нийт бүрэн дуусгасан</p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm justify-between">
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <SparkleIcon className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400 font-medium">{stats.xp} туршлага</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#110c22] px-2 py-1 rounded-md border border-white/5 shadow-inner whitespace-nowrap">
                <span className="text-amber-500 text-lg">🔥</span>
                <span className="text-amber-500 font-semibold">{stats.streak} өдөр</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/40 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-rose-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
              <AlertCircleIcon className="h-4 w-4" /> Давтах сэдэв
            </CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-3">
              {revisionTopics.length > 0 ? revisionTopics.map((topic, i) => (
                <Link key={topic.id} href={`/student/lesson/${topic.id}`} className="block">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between items-center hover:bg-slate-900 transition-colors mt-2 group">
                    <div className="pr-2">
                      <h4 className="text-sm font-medium text-white line-clamp-1">{topic.title}</h4>
                      <p className={`text-xs mt-0.5 ${topic.progress === 100 ? 'text-emerald-400' : topic.progress > 0 ? 'text-rose-400' : 'text-amber-400'}`}>
                         {topic.progress === 100 ? 'Дахин давтах' : topic.progress > 0 ? `Явц: ${topic.progress}% - Дуусгахад ойрхон байна` : 'Хараахан эхлээгүй'}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-slate-400 pointer-events-none group-hover:text-white group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </Link>
              )) : (
                 <p className="text-slate-500 text-sm mt-4 text-center">Одоогоор давтах сэдэв алга байна.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
           <h3 className="text-lg font-semibold text-white">Бүх хичээлүүд</h3>
           <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
              {categories.map(c => (
                 <button 
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === c ? 'bg-[#00f5ff]/20 text-[#00f5ff] border border-[#00f5ff]/50' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-transparent'}`}
                 >
                    {c}
                 </button>
              ))}
           </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
                <div className="text-[#00f5ff] animate-pulse col-span-3">Хичээлүүд уншиж байна...</div>
            ) : lessons.length === 0 ? (
                <div className="text-slate-400 col-span-3">Одоогоор идэвхтэй хичээл алга байна.</div>
            ) : (
                lessons
                  .filter(l => selectedCategory === "Бүгд" || l.subject === selectedCategory || (selectedCategory === "Бусад" && !["Математик", "Нийгэм", "Монгол хэл"].includes(l.subject)))
                  .map((lesson) => (
                  <Card key={lesson.id} className="bg-slate-900/40 border-slate-800 hover:border-emerald-500/50 transition-colors">
                    <CardContent className="p-6 h-full flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-medium">
                            {lesson.subject}
                          </div>
                        </div>
                        <h3 className="font-bold text-white mb-6 line-clamp-2 min-h-[3rem]">{lesson.title}</h3>
                      </div>
                      
                      <div>
                        <div className="mb-6">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-400">Явц</span>
                            <span className="text-white font-medium">{lesson.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-2">
                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${lesson.progress}%` }}></div>
                          </div>
                        </div>

                        <Link href={`/student/lesson/${lesson.id}`} className="block mt-2">
                          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2 py-6">
                            <PlayIcon className="h-4 w-4" />
                            {lesson.progress > 0 ? 'Үргэлжлүүлэх' : 'Эхлэх'}
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
        </div>
      </div>
    </StudentLayout>
  );
}
