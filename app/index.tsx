import Link from "next/link";
// Import our custom icons since we removed lucide-react earlier due to npm issues
import { Sparkles as SparkleIcon, Upload as UploadIcon, BookOpen, BarChart3, Users, MessageSquare } from "@/components/ui/icons";

function Bot(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
}

// Basic icons to supplement missing ones
function Brain(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>
}

function Monitor(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
}

function Cap(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21.42 10.922a2 2 0 0 0-.019-3.838L12.83 4.34a2 2 0 0 0-1.66 0L2.6 7.08a2 2 0 0 0 0 3.84l9.36 4.34a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070914] text-white selection:bg-[#b05cfd]/30 font-sans overflow-x-hidden">
      {/* Dynamic Backgrounds matching the image */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00f5ff]/10 blur-[120px] rounded-full animate-pulse-glow" />
         <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#b05cfd]/10 blur-[150px] rounded-full" />
         <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-[#ff2a85]/5 blur-[120px] rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[#b05cfd] to-[#00f5ff] flex items-center justify-center shadow-[0_0_15px_rgba(176,92,253,0.5)]">
            <SparkleIcon className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">EduGen AI</span>
        </div>
        
        <div className="hidden md:flex gap-8 text-sm text-slate-300 font-medium">
          <Link href="#features" className="hover:text-white transition-colors">Багшийн тал</Link>
          <Link href="#how-it-works" className="hover:text-white transition-colors">Боловсруулсан</Link>
          <Link href="#features" className="hover:text-white transition-colors">Шийдлүүд</Link>
        </div>

        <Link href="/login" className="px-6 py-2.5 rounded-full bg-white/10 border border-white/20 text-sm font-semibold hover:bg-white/20 transition-all shadow-[0_0_10px_rgba(255,255,255,0.05)]">
          Нэвтрэх / Демо 
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-[rise_0.8s_ease-out]">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-2xl">
              Хичээлээ хиймэл <br />
              оюун ухаанаар <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#b05cfd]">дараагийн түвшинд</span> гарга
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-lg leading-relaxed">
              EduGen AI нь багшийн материалыг интерактив хичээл болгон хувиргаж, сурагч бүрт тохирсон сургалтын туршлагыг бий болгоно.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/teacher/dashboard" className="px-8 py-3.5 rounded-full button-gradient text-center shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:shadow-[0_0_30px_rgba(0,245,255,0.5)]">
                Үнэгүй туршиж үзэх
              </Link>
              <Link href="/student/dashboard" className="px-8 py-3.5 rounded-full button-outline text-center">
                Демо үзэх
              </Link>
            </div>
          </div>
          
          <div className="relative w-full h-[500px] animate-[float_6s_ease-in-out_infinite]">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00f5ff]/20 to-[#b05cfd]/20 rounded-2xl blur-3xl" />
            
            {/* Mock Dashboard UI floating */}
            <div className="absolute top-10 right-0 w-[450px] h-[300px] glow-card overflow-hidden bg-[#0c1226]/90 border-[#b05cfd]/30">
               <div className="h-10 border-b border-white/5 bg-white/5 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  <div className="ml-4 w-48 h-4 rounded bg-white/10"></div>
               </div>
               <div className="p-4 flex gap-4">
                 <div className="w-1/4 space-y-2">
                    <div className="h-6 w-full rounded bg-white/5 text-[10px] flex items-center px-2 text-[#00f5ff]">Dashboard</div>
                    <div className="h-6 w-full rounded bg-white/5"></div>
                    <div className="h-6 w-full rounded bg-white/5"></div>
                    <div className="h-6 w-full rounded inline-flex items-center gap-1 border border-[#b05cfd]/50 bg-[#b05cfd]/10 mt-4 px-2 text-[#b05cfd] text-[10px]"><SparkleIcon className="w-3 h-3"/> AI Analyze</div>
                 </div>
                 <div className="flex-1 space-y-4">
                    <div className="flex gap-2">
                       <div className="flex-1 h-20 rounded-xl bg-gradient-to-br from-[#00f5ff]/10 to-transparent border border-[#00f5ff]/20"></div>
                       <div className="flex-1 h-20 rounded-xl bg-gradient-to-br from-[#b05cfd]/10 to-transparent border border-[#b05cfd]/20"></div>
                    </div>
                    {/* Mock chart */}
                    <div className="h-32 rounded-xl bg-white/5 flex items-end justify-around px-4 pb-2 pt-8 gap-2 border border-white/5">
                      <div className="w-6 bg-[#00f5ff]/80 h-[40%] rounded-t-sm"></div>
                      <div className="w-6 bg-[#b05cfd]/80 h-[60%] rounded-t-sm"></div>
                      <div className="w-6 bg-[#00f5ff]/80 h-[80%] rounded-t-sm"></div>
                      <div className="w-6 bg-[#b05cfd]/80 h-[50%] rounded-t-sm"></div>
                      <div className="w-6 bg-[#00f5ff]/80 h-[90%] rounded-t-sm text-[8px] text-center pt-1">92%</div>
                    </div>
                 </div>
               </div>
            </div>

            {/* AI Chat Popup Floating over dashboard */}
            <div className="absolute -bottom-10 left-10 w-[240px] glow-card bg-[#0b0a1a] border-[#00f5ff]/40 shadow-[0_10px_40px_rgba(0,245,255,0.15)] p-4 transform -rotate-2">
               <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00f5ff] to-blue-500 flex items-center justify-center shadow-[0_0_10px_rgba(0,245,255,0.4)]">
                     <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">AI Assistant</h3>
                    <p className="text-[9px] text-emerald-400">Typing...</p>
                  </div>
               </div>
               <div className="space-y-2 text-[10px]">
                 <div className="bg-white/5 p-2 rounded-lg rounded-tl-none border border-white/10 text-slate-300">
                   Хичээлийн агуулгыг интерактив хэлбэрт оруулж дууслаа!
                 </div>
                 <div className="bg-[#b05cfd]/20 p-2 rounded-lg rounded-br-none border border-[#b05cfd]/30 text-right ml-6 text-white">
                   Гайхалтай, өөр ямар боломж байгаа вэ?
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative z-10 py-24 px-6 bg-gradient-to-b from-transparent to-[#0a0518]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 glow-text-cyan">Хэрхэн ажилладаг вэ?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glow-card p-8 flex flex-col items-start border-t border-t-[#00f5ff]/30 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f5ff]/10 blur-3xl group-hover:bg-[#00f5ff]/20 transition-all" />
               <div className="w-14 h-14 rounded-2xl bg-[#00f5ff]/10 border border-[#00f5ff]/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,245,255,0.2)]">
                  <UploadIcon className="w-7 h-7 text-[#00f5ff]" />
               </div>
               <h3 className="text-xl font-bold text-white mb-3">Материал нэмэх</h3>
               <p className="text-sm text-slate-400 leading-relaxed">
                 Материал нь багшийн материалыг интерактив хичээл болгон хувиргана.
               </p>
            </div>

            <div className="glow-card p-8 flex flex-col items-start border-t border-t-[#b05cfd]/30 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#b05cfd]/10 blur-3xl group-hover:bg-[#b05cfd]/20 transition-all" />
               <div className="w-14 h-14 rounded-2xl bg-[#b05cfd]/10 border border-[#b05cfd]/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(176,92,253,0.2)]">
                  <Brain className="w-7 h-7 text-[#b05cfd]" />
               </div>
               <h3 className="text-xl font-bold text-white mb-3">Хиймэл оюуны хичээл үүсгэх</h3>
               <p className="text-sm text-slate-400 leading-relaxed">
                 Хиймэл оюуны хичээл үүсгэгч, хиймэл оюуны хичээл үүсгэх.
               </p>
            </div>

            <div className="glow-card p-8 flex flex-col items-start border-t border-t-[#ff2a85]/30 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff2a85]/10 blur-3xl group-hover:bg-[#ff2a85]/20 transition-all" />
               <div className="w-14 h-14 rounded-2xl bg-[#ff2a85]/10 border border-[#ff2a85]/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(255,42,133,0.2)]">
                  <Cap className="w-7 h-7 text-[#ff2a85]" />
               </div>
               <h3 className="text-xl font-bold text-white mb-3">Сурагч суралцах</h3>
               <p className="text-sm text-slate-400 leading-relaxed">
                 Сурагч суралцах явцдаа сонирхолтой хэлбэрээр хурдан суралцах боломж.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 glow-text-purple">Гол онцлогууд</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glow-card p-6 flex gap-6 items-center hover:bg-white/5 cursor-default">
              <div className="w-16 h-16 rounded-xl shrink-0 bg-[#b05cfd]/10 border border-[#b05cfd]/30 flex items-center justify-center">
                <SparkleIcon className="w-8 h-8 text-[#b05cfd]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Хиймэл оюуны хичээл үүсгэгч</h3>
                <p className="text-sm text-slate-400">AI нь материалыг шууд интерактив хэлбэрт оруулна.</p>
              </div>
            </div>

            <div className="glow-card p-6 flex gap-6 items-center hover:bg-white/5 cursor-default">
              <div className="w-16 h-16 rounded-xl shrink-0 bg-[#00f5ff]/10 border border-[#00f5ff]/30 flex items-center justify-center">
                <Brain className="w-8 h-8 text-[#00f5ff]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Дасан зохицох сургалт</h3>
                <p className="text-sm text-slate-400">Хүүхдийн хариултаас хамаарч хичээлийн хүнд/хөнгөн нь өөрчлөгдөнө.</p>
              </div>
            </div>

            <div className="glow-card p-6 flex gap-6 items-center hover:bg-white/5 cursor-default">
              <div className="w-16 h-16 rounded-xl shrink-0 bg-[#00f5ff]/10 border border-[#00f5ff]/30 flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-[#00f5ff]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Хиймэл оюуны туслах</h3>
                <p className="text-sm text-slate-400">Ойлгоогүй зүйлээ AI-аас 24/7 цагийн турш асуух боломжтой.</p>
              </div>
            </div>

            <div className="glow-card p-6 flex gap-6 items-center hover:bg-white/5 cursor-default">
              <div className="w-16 h-16 rounded-xl shrink-0 bg-[#b05cfd]/10 border border-[#b05cfd]/30 flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-[#b05cfd]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Шинжилгээ</h3>
                <p className="text-sm text-slate-400">Анги нийтээрээ хаана их алдаж байгаа болон хичээлийн үр дүнг хянах.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info section with bullet points */}
      <section className="relative z-10 py-24 px-6 bg-gradient-to-t from-[#0a0518] to-transparent">
        <div className="max-w-4xl mx-auto space-y-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-10 text-white">Яагаад EduGen AI гэж?</h2>
          
          <div className="space-y-8">
             <div className="flex gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-[#00f5ff] shadow-[0_0_10px_#00f5ff] shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-[#00f5ff] mb-2">Багш нарын цагийг хэмнэх</h3>
                  <p className="text-slate-300">Багш нарын цагийг хэмнэх, интерактив хичээл болгон хувиргаж, сурагч бүрт тохирсон сургалтыг бий болгоно.</p>
                </div>
             </div>
             
             <div className="flex gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-[#b05cfd] shadow-[0_0_10px_#b05cfd] shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-[#b05cfd] mb-2">Сурагч бүрт тохирсон сургалт</h3>
                  <p className="text-slate-300">Сурагч бүрт тохирсон сургалт, ухаалаг систем бие даан шалгадаг.</p>
                </div>
             </div>

             <div className="flex gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-[#00f5ff] shadow-[0_0_10px_#00f5ff] shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-[#00f5ff] mb-2">Ойлголтыг сайжруулах</h3>
                  <p className="text-slate-300">AI туслахын хүчээр хүүхэд ойлгохгүй хоцрохгүй.</p>
                </div>
             </div>

             <div className="flex gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-[#b05cfd] shadow-[0_0_10px_#b05cfd] shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-[#b05cfd] mb-2">Өгөгдөлд суурилсан шийдвэр гаргах</h3>
                  <p className="text-slate-300">Дүнгийн баталгаатай үнэлгээ, статистикийг багшид гаргаж өгнө.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="relative z-10 py-24 px-6 pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="glow-card p-12 md:p-20 text-center border-t border-t-[#00f5ff]/30 border-b border-b-[#b05cfd]/30 bg-gradient-to-br from-white/5 to-[#0a0518]">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-10 drop-shadow-xl">Өнөөдөр эхлээрэй</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login" className="px-10 py-4 rounded-full button-gradient text-lg shadow-[0_0_30px_rgba(0,245,255,0.4)] hover:shadow-[0_0_50px_rgba(0,245,255,0.6)]">
                Эхлэх
              </Link>
              <Link href="mailto:contact@edugen.ai" className="px-10 py-4 rounded-full button-outline text-lg">
                Сургуульд бүртгүүлэх
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-[#030612] px-6 py-8 text-sm text-slate-500 flex flex-col md:flex-row items-center justify-between mx-auto">
        <div className="max-w-7xl w-full mx-auto flex justify-between items-center">
          <p>© 2026 EduGen AI. Бүх эрх хамгаалагдсан.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white transition-colors">Бидний тухай</Link>
            <Link href="/" className="hover:text-white transition-colors">Холбоо барих</Link>
            <Link href="/" className="hover:text-white transition-colors">Нууцлал</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
