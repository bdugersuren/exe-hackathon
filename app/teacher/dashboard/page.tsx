"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Sparkles, Edit2, PlayCircle, BarChart3, Users } from "@/components/ui/icons";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function TeacherDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Багш аа");

  useEffect(() => {
    let uid = "";
    const userStr = localStorage.getItem("edugen_user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name) setUserName(user.name);
        if (user.id) uid = user.id;
      } catch (e) {}
    }

    fetch('/api/lesson')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
           const myLessons = data.lessons.filter((l: any) => l.createdById === uid);
           
           // map JSON DB lessons to table format
           const mapped = myLessons.map((l: any) => ({
              id: l.id,
              title: l.title,
              date: new Date(l.createdAt).toLocaleDateString(),
              students: 0, 
              avgScore: `0%` 
           }));
           setLessons(mapped.reverse());
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredLessons = lessons.filter(lesson => 
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout activePath="/teacher/dashboard">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white mb-1">Сайн байна уу, {userName}! 👋</h2>
          <p className="text-slate-400">Өнөөдөр юу сургах вэ? Шинэ контент үүсгэх эсвэл өмнөх үр дүнгээ хараарай.</p>
        </div>
        
        <Link href="/teacher/upload" className="w-full sm:w-auto">
          <Button variant="premium" className="w-full sm:w-auto gap-2 px-6 h-12 text-md">
             <Sparkles className="h-5 w-5" />
             AI-аар хичээл үүсгэх
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-slate-900/40 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Нийт хичээлүүд</CardTitle>
            <BookOpen className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{lessons.length}</div>
            <p className="text-xs text-emerald-400 mt-1">Нийт үүссэн</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/40 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Идэвхтэй сурагчид</CardTitle>
            <Users className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">0</div>
            <p className="text-xs text-emerald-400 mt-1">Одоогоор шинэ сурагч алга</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/40 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Дундаж гүйцэтгэл</CardTitle>
            <BarChart3 className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">0%</div>
            <p className="text-xs text-slate-400 mt-1">Тооцоолоход эрт байна</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/40 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Хэмнэгдсэн цаг</CardTitle>
            <Sparkles className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">42 цаг</div>
            <p className="text-xs text-amber-400 mt-1">AI ашигласнаар</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h3 className="text-xl font-semibold text-white">Сүүлд үүсгэсэн хичээлүүд</h3>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Хичээл хайх..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900/60 border border-slate-700/50 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>
      </div>

      <Card className="overflow-hidden bg-slate-950 border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-400 uppercase bg-slate-900/50 border-b border-slate-800">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium">Хичээлийн нэр</th>
                <th scope="col" className="px-6 py-4 font-medium">Огноо</th>
                <th scope="col" className="px-6 py-4 font-medium">Сурагч</th>
                <th scope="col" className="px-6 py-4 font-medium">Дундаж оноо</th>
                <th scope="col" className="px-6 py-4 font-medium text-right">Үйлдэл</th>
              </tr>
            </thead>
            <tbody>
              {filteredLessons.map((lesson) => (
                <tr key={lesson.id} className="border-b border-slate-800/50 hover:bg-slate-900/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-emerald-500/10 flex items-center justify-center">
                       <BookOpen className="h-4 w-4 text-emerald-400" />
                    </div>
                    {lesson.title}
                  </td>
                  <td className="px-6 py-4 text-slate-400">{lesson.date}</td>
                  <td className="px-6 py-4 text-slate-300">{lesson.students}</td>
                  <td className="px-6 py-4 bg-clip-text">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${parseInt(lesson.avgScore) > 80 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                      {lesson.avgScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link href={`/teacher/lesson/${lesson.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/student/lesson/${lesson.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10">
                        <PlayCircle className="h-4 w-4" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[#00f5ff] animate-pulse">
                    Хичээлүүдийг татаж байна...
                  </td>
                </tr>
              ) : filteredLessons.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    Илэрц олдсонгүй эсвэл хичээл үүсгээгүй байна.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* We need Search and BookOpen in the imports but BookOpen doesn't exist yet maybe? No, it's BookOpen. Oh, I need Search in icons! */}
    </DashboardLayout>
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

function BookOpen(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
