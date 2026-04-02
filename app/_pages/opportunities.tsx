import Image from "next/image";

export default function OpportunitiesPage() {
  return (
    <div>
      {/* Background Effects */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-700/20 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none z-0" />
      <div className="fixed top-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-700/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none z-0" />
      
      {/* Navbar */}
      <nav className="fixed w-full z-50 top-0 transition-all duration-300 pt-4 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 flex justify-between items-center shadow-lg">
            <a href="/" className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-80 transition-opacity">
              EduGen AI
            </a>
            <div className="hidden md:flex space-x-8 text-sm font-medium">
              <a href="/" className="text-gray-300 hover:text-white transition-colors duration-200">Нүүр</a>
              <a href="/opportunities" className="text-white font-semibold relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-400 after:to-purple-500 after:rounded-full">Боломжууд</a>
              <a href="/pricing" className="text-gray-300 hover:text-white transition-colors duration-200">Үнэ</a>
              <a href="/aboutus" className="text-gray-300 hover:text-white transition-colors duration-200">Бидний тухай</a>
            </div>
            <a href="/login" className="hidden md:inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all duration-300 text-sm font-semibold text-white">
              Нэвтрэх
            </a>
            <button className="md:hidden text-gray-300 hover:text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col relative z-10 pt-32">
        {/* Hero Section */}
        <section className="pt-12 pb-16 px-6 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Боловсролд үзүүлэх <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">нөлөө ба ирээдүй</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            EduGen AI нь багшийн ажлыг хөнгөвчилж, сурагч бүрийн оролцоог нэмэгдүүлснээр урт хугацааны өөрчлөлтийг авчирна.
          </p>
        </section>

        {/* Impact Section */}
        <section className="py-12 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white">Бидний шийдлийн үр нөлөө</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
                <p className="text-2xl font-semibold text-blue-400 mb-2">↑ Суралцах үр дүн</p>
                <p className="text-gray-400 text-sm">Дата-д суурилсан ахиц, гүнзгий ойлголт</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
                <p className="text-2xl font-semibold text-purple-400 mb-2">↓ Багшийн ачаалал</p>
                <p className="text-gray-400 text-sm">Автоматжуулсан хичээл, шалгалтын материал</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
                <p className="text-2xl font-semibold text-indigo-400 mb-2">↔ Тэгш боломж</p>
                <p className="text-gray-400 text-sm">Сурагч бүрт тохирсон суралцах замнал</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
                <p className="text-2xl font-semibold text-emerald-400 mb-2">🚀 K12 өргөн хэрэглээ</p>
                <p className="text-gray-400 text-sm">Бүх ЕБС-д нэвтэрч, тэлэх боломж</p>
              </div>
            </div>
          </div>
        </section>

        {/* Future Work Section */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white">Ирээдүйн хөгжүүлэлт</h2>
              <p className="text-lg text-gray-400 mt-3">Хэрэглэгчийн хэрэгцээ, сургалтын орчны онцлогт тохируулан тасралтгүй өргөжүүлнэ.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                    <h4 className="font-semibold text-white">V2: Платформыг өргөтгөх</h4>
                    <ul className="mt-2 space-y-1 text-gray-400 text-sm">
                        <li>- Speech recognition (ярианы хичээл)</li>
                        <li>- Нээлттэй асуултыг автоматаар дүгнэх</li>
                        <li>- Эцэг эхийн хяналтын самбар</li>
                        <li>- Gamification (badge, оноо)</li>
                    </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                    <h4 className="font-semibold text-white">V3: Экосистем бүрдүүлэх</h4>
                    <ul className="mt-2 space-y-1 text-gray-400 text-sm">
                        <li>- Mobile app (iOS, Android)</li>
                        <li>- Offline AI хувилбар</li>
                        <li>- Үндэсний сургалтын хөтөлбөртэй уялдуулах</li>
                        <li>- Бусад сургуулийн системтэй интеграц хийх (API)</li>
                    </ul>
                </div>
                <div className="md:col-span-2 bg-white/5 border border-white/10 p-6 rounded-xl">
                    <h4 className="font-semibold text-white">Туршилт ба Нэвтрүүлэлт</h4>
                    <p className="mt-2 text-gray-400 text-sm">Бодит сургуулиудтай хамтран туршилт хийж, үр дүнг хэмжин, сайжруулалт хийснээр Монгол улсын хэмжээнд нэвтрүүлэхээр зорьж байна.</p>
                </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/5 bg-slate-950/80 backdrop-blur-xl pt-10 pb-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <p className="text-sm text-gray-500">© 2026 EduGen AI. Бүх эрх хуулиар хамгаалагдсан.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
