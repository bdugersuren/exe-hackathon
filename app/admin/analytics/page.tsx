"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart3, Users, BookOpen, ArrowRight } from "@/components/ui/icons";

const performanceData = [
  { label: "Даваа", value: 65 },
  { label: "Мягмар", value: 72 },
  { label: "Лхагва", value: 68 },
  { label: "Пүрэв", value: 85 },
  { label: "Баасан", value: 78 },
  { label: "Бямба", value: 92 },
  { label: "Ням", value: 88 },
];

const topics = [
  { name: "Үржүүлэх хүрд", score: 45, students: 12 },
  { name: "Газарзүйн бүс", score: 55, students: 8 },
  { name: "Англи хэл - Үйл үг", score: 60, students: 5 },
];

export default function AnalyticsDashboard() {
  return (
    <DashboardLayout activePath="/admin/analytics">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-white mb-1 flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-emerald-400" />
          Сургуулийн Анализ & Тайлан
        </h2>
        <p className="text-slate-400">Өгөгдөлд суурилсан шийдвэр гаргаж, сургалтын чанарыг сайжруулаарай.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Нийт сурагчид</p>
                <p className="text-3xl font-bold text-white mt-1">1,248</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
            <p className="text-xs text-emerald-400 mt-4">+12% өсөлт (Сард)</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Хичээл үзэлт</p>
                <p className="text-3xl font-bold text-white mt-1">45.2k</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-indigo-500/10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-indigo-400" />
              </div>
            </div>
            <p className="text-xs text-indigo-400 mt-4">+5.4k (7 хоногт)</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Дундаж оноо</p>
                <p className="text-3xl font-bold text-white mt-1">78</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-amber-400" />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4">-2% (Сард)</p>
          </CardContent>
        </Card>

        <Card className="bg-rose-950/20 border-rose-900/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-rose-400">Эрсдэлтэй сурагч</p>
                <p className="text-3xl font-bold text-rose-300 mt-1">24</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-rose-500/10 flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-rose-400" />
              </div>
            </div>
            <p className="text-xs text-rose-400 mt-4">Яаралтай арга хэмжээ авах!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 bg-slate-900/40 border-slate-800">
          <CardHeader>
            <CardTitle>Долоо хоногийн идэвх (CSS Chart)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2 border-b border-slate-800 pb-4">
              {performanceData.map((data, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                  <div 
                    className="w-full max-w-[40px] bg-emerald-500/80 rounded-t-sm transition-all group-hover:bg-emerald-400 relative"
                    style={{ height: `${data.value}%` }}
                  >
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-medium text-white opacity-0 group-hover:opacity-100 bg-slate-800 px-2 py-1 rounded">
                      {data.value}%
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">{data.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/40 border-slate-800">
          <CardHeader>
            <CardTitle>Хамгийн хүндрэлтэй сэдвүүд</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {topics.map((topic, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-white">{topic.name}</span>
                  <span className="text-rose-400 font-bold">{topic.score}% дундаж</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500" style={{ width: `${topic.score}%` }} />
                </div>
                <p className="text-xs text-slate-400">{topic.students} сурагч хоцрогдолтой</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
