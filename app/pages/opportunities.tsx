import Image from "next/image";

export default function Home() {
  return (
<div>
  {/* Background Glowing Effects */}
  <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-700/20 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none z-0" />
  <div className="fixed top-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-700/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none z-0" />
  <div className="fixed bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none z-0" />
  {/* 1. NAVBAR */}
  <nav className="fixed w-full z-50 top-0 transition-all duration-300 pt-4 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 flex justify-between items-center shadow-lg">
        {/* Logo */}
        <a href="index.html" className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-80 transition-opacity">
          EduGen AI
        </a>
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <a href="index.html" className="text-gray-300 hover:text-white transition-colors duration-200">Нүүр</a>
          {/* Active Link */}
          <a href="Opportunities.html" className="text-white font-semibold relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-400 after:to-purple-500 after:rounded-full">Боломжууд</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Үнэ</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Бидний тухай</a>
        </div>
        {/* Login Button */}
        <a href="#" className="hidden md:inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all duration-300 text-sm font-semibold text-white shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
          Нэвтрэх
        </a>
        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-300 hover:text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </nav>
  {/* Main Content Wrapper */}
  <main className="flex-grow flex flex-col relative z-10">
    {/* 2. HERO SECTION */}
    <section className="pt-40 pb-20 px-6 text-center max-w-4xl mx-auto">
      <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium backdrop-blur-sm mb-6">
        <span className="mr-2">🚀</span> Хязгааргүй боломж
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
        EduGen AI-ийн <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">боломжууд</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
        Багш, сурагч, сургуульд зориулсан ухаалаг сургалтын бүх боломжийг нэг дороос ашиглаарай.
      </p>
    </section>
    {/* 3. FEATURES GRID (MAIN SECTION) */}
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 group overflow-hidden hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 z-0" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all">
                <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI хичээл үүсгэгч</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Багшийн материалаас автоматаар интерактив хичээл, тест, даалгавар үүсгэнэ.
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 group overflow-hidden hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 z-0" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all">
                <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Дасан зохицох сургалт</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Сурагчийн ахиц, ойлголтын түвшинд тохируулан агуулгыг өөрчилнө.
              </p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 group overflow-hidden hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(99,102,241,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 z-0" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(99,102,241,0.2)] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all">
                <svg className="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI туслах</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Сурагч асуулт асууж, ойлгоогүй сэдвээ шууд тайлбарлуулна.
              </p>
            </div>
          </div>
          {/* Card 4 */}
          <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 group overflow-hidden hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(236,72,153,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 z-0" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-pink-500/20 border border-pink-500/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(236,72,153,0.2)] group-hover:shadow-[0_0_25px_rgba(236,72,153,0.5)] transition-all">
                <svg className="w-7 h-7 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Ахицын шинжилгээ</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Сурагч бүрийн гүйцэтгэл, идэвх, сул сэдвийг датагаар харуулна.
              </p>
            </div>
          </div>
          {/* Card 5 */}
          <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 group overflow-hidden hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(14,165,233,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 z-0" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(14,165,233,0.2)] group-hover:shadow-[0_0_25px_rgba(14,165,233,0.5)] transition-all">
                <svg className="w-7 h-7 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Даалгавар ба тест</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Автоматаар тест, шалгалт үүсгэж, үнэлгээ хийнэ.
              </p>
            </div>
          </div>
          {/* Card 6 */}
          <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 group overflow-hidden hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(16,185,129,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 z-0" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all">
                <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Багшийн хяналтын самбар</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Багш сурагчдын ахиц, ангийн гүйцэтгэлийг нэг дороос хянаж удирдана.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* 4. BENEFITS SECTION */}
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Яагаад EduGen AI?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Benefit 1 */}
          <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm shadow-lg">
            <div className="w-12 h-12 mx-auto bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 text-2xl">
              ⏱️
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Цаг хэмнэнэ</h4>
            <div className="h-1 w-12 bg-blue-500 rounded-full mx-auto mt-4 opacity-50" />
          </div>
          {/* Benefit 2 */}
          <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm shadow-lg">
            <div className="w-12 h-12 mx-auto bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 text-2xl">
              🎯
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Хувь хүнд тохирно</h4>
            <div className="h-1 w-12 bg-purple-500 rounded-full mx-auto mt-4 opacity-50" />
          </div>
          {/* Benefit 3 */}
          <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm shadow-lg">
            <div className="w-12 h-12 mx-auto bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4 text-2xl">
              📊
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Дата дээр суурилна</h4>
            <div className="h-1 w-12 bg-indigo-500 rounded-full mx-auto mt-4 opacity-50" />
          </div>
        </div>
      </div>
    </section>
    {/* 5. CTA SECTION */}
    <section className="py-24 px-6 relative mt-auto">
      {/* Central Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none z-0" />
      <div className="max-w-4xl mx-auto relative z-10 text-center bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-12 md:p-16 shadow-2xl">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
          EduGen AI-г өнөөдөр туршаад үз
        </h2>
        <p className="text-lg text-gray-400 mb-10">
          Сургалтын шинэ туршлагыг эхлүүлэхэд бэлэн үү?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#" className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-center transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.4)] transform hover:-translate-y-0.5">
            Үнэгүй эхлэх
          </a>
          <a href="#" className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white font-semibold text-center transition-all duration-300 transform hover:-translate-y-0.5">
            Холбоо барих
          </a>
        </div>
      </div>
    </section>
  </main>
  {/* 6. FOOTER */}
  <footer className="relative z-20 border-t border-white/5 bg-slate-950/80 backdrop-blur-xl pt-10 pb-6 mt-12">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo */}
        <a href="index.html" className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-80 transition-opacity">
          EduGen AI
        </a>
        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200">Бидний тухай</a>
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200">Холбоо барих</a>
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200">Нууцлал</a>
        </div>
      </div>
      {/* Bottom text */}
      <div className="mt-8 pt-6 border-t border-white/5 text-center">
        <p className="text-sm text-gray-500">
          © 2026 EduGen AI. Бүх эрх хуулиар хамгаалагдсан.
        </p>
      </div>
    </div>
  </footer>
</div>
    );
}
