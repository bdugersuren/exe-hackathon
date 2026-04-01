"use client";

import { StudentLayout } from "@/components/layout/student-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen as BookIcon, PlayCircle as PlayIcon, Sparkles as SparkleIcon, ArrowRight } from "@/components/ui/icons";
import Link from "next/link";

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
  return (
    <StudentLayout activePath="/student/dashboard">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-white mb-1">Сайн уу, Анар! 🌟</h2>
        <p className="text-slate-400">Өнөөдөр суралцахад бэлэн үү? Таны дараагийн даалгаврууд хүлээж байна.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="bg-emerald-950/30 border-emerald-900 overflow-hidden relative">
          <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
          <CardHeader className="pb-2">
            <CardTitle className="text-amber-400 text-xs font-semibold uppercase tracking-wider">Яг одоо судлах</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">Биологи: Эсийн бүтэц</h3>
              <p className="text-sm text-slate-300 mt-1">Шинжлэх ухааны шинэ хичээл</p>
            </div>
            
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[0%]" />
            </div>
            
            <Link href="/student/lesson/1">
              <Button variant="premium" className="w-full gap-2">
                <PlayIcon className="h-4 w-4" /> Эхлэх
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/40 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-indigo-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
              <TrendingUpIcon className="h-4 w-4" /> Таны ахиц
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-extrabold text-white">4</span>
              <span className="text-slate-400 pb-1">хичээл</span>
            </div>
            <p className="text-sm text-slate-300">Энэ долоо хоногт судалсан</p>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <SparkleIcon className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-400 font-medium">120 үзүүлэлт (XP)</span>
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
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-medium text-white">Физик: Хүч</h4>
                  <p className="text-xs text-rose-400 mt-0.5">Өмнөх тестэд 40% авсан</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-medium text-white">Математик: Бутархай</h4>
                  <p className="text-xs text-amber-400 mt-0.5">Хоцрогдолтой байж мэднэ</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Бүх хичээлүүд</h3>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { id: 2, title: "Түүх - Их Монгол Улс", progress: 100, score: "90%" },
            { id: 3, title: "Газарзүй - Дэлхийн бүтцүүд", progress: 60, score: "-" },
            { id: 4, title: "Англи хэл - Present Tense", progress: 0, score: "-" },
          ].map(lesson => (
            <div key={lesson.id} className="bg-slate-900/30 border border-slate-800 rounded-xl p-4 flex gap-4 hover:bg-slate-900/50 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                <BookIcon className="h-6 w-6 text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white truncate">{lesson.title}</h4>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                  <span>{lesson.progress}% дууссан</span>
                  {lesson.score !== "-" && <span className="text-emerald-400 font-medium">Оноо: {lesson.score}</span>}
                </div>
                <div className="mt-1 w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 transition-all" style={{ width: `${lesson.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
}
