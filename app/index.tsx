import Image from "next/image";

export default function Home() {
  return (
    <div>
  <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-700/30 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none" />
  <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-700/20 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none" />
  <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none" />
  {/* Navbar */}
  <nav className="fixed w-full z-50 top-0 transition-all duration-300 pt-4 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 flex justify-between items-center shadow-lg">
        {/* Logo */}
        <a href="#" className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-80 transition-opacity">
          EduGen AI
        </a>
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-gray-300 font-medium text-sm">
          <a href="./index.html" className="hover:text-white transition-colors duration-200">Нүүр</a>
          <a href="./Opportunities.html" className="hover:text-white transition-colors duration-200">Боломжууд</a>
          <a href="#" className="hover:text-white transition-colors duration-200">Үнэ</a>
          <a href="#" className="hover:text-white transition-colors duration-200">Бидний тухай</a>
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
  {/* Hero Section */}
  <section className="relative z-10 min-h-screen flex items-center pt-32 pb-20">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Left Column: Content */}
      <div className="space-y-8">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium backdrop-blur-sm">
          <span className="mr-2">✨</span> Шинэ үеийн боловсролын платформ
        </div>
        <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">
          Боловсролын ирээдүйг <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
            EduGen AI
          </span>-тай хамт бүтээцгээе
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
          Хамгийн сүүлийн үеийн хиймэл оюун ухааны технологиор өөрийн суралцах үйл явцыг хурдасгаж, илүү ухаалгаар суралцаарай.
        </p>
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 pt-4">
          <a href="#" className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-center transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] transform hover:-translate-y-0.5">
            Үнэгүй турших
          </a>
          <a href="#" className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white font-semibold text-center transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 group">
            <span>Дэлгэрэнгүй</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
        {/* Trust metrics */}
        <div className="pt-10 border-t border-white/10 flex items-center gap-6 mt-8">
          <div className="flex -space-x-3">
            <img className="w-10 h-10 rounded-full border-2 border-slate-950 object-cover" src="https://i.pravatar.cc/100?img=11" alt="Хэрэглэгч" />
            <img className="w-10 h-10 rounded-full border-2 border-slate-950 object-cover" src="https://i.pravatar.cc/100?img=12" alt="Хэрэглэгч" />
            <img className="w-10 h-10 rounded-full border-2 border-slate-950 object-cover" src="https://i.pravatar.cc/100?img=13" alt="Хэрэглэгч" />
            <div className="w-10 h-10 rounded-full border-2 border-slate-950 bg-gray-800 flex items-center justify-center text-xs font-bold text-white z-10">+2k</div>
          </div>
          <p className="text-sm text-gray-400 leading-snug">
            Идэвхтэй суралцагчдын <br /><span className="text-white font-semibold">сэтгэл ханамж 4.9/5</span>
          </p>
        </div>
      </div>
      {/* Right Column: Dashboard Image (Glassmorphism Frame) */}
      <div className="relative w-full group">
        {/* Glow behind image */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000" />
        {/* Window Frame */}
        <div className="relative bg-white/5 border border-white/10 backdrop-blur-2xl rounded-2xl p-2 shadow-2xl overflow-hidden">
          {/* Window Controls */}
          <div className="flex gap-2 px-3 pt-2 pb-3">
            <div className="w-3 h-3 rounded-full bg-slate-600/50" />
            <div className="w-3 h-3 rounded-full bg-slate-600/50" />
            <div className="w-3 h-3 rounded-full bg-slate-600/50" />
          </div>
          {/* Image */}
          <img src="images/Design_a_futuristic_202604011050 (1).png" alt="EduGen AI Dashboard" className="rounded-xl w-full h-auto object-cover border border-white/5" />
        </div>
      </div>
    </div>
  </section>
  {/* How it Works Section */}
  <section className="relative z-10 py-24 bg-slate-950/50 border-t border-white/5">
    {/* Background Glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none" />
    <div className="max-w-7xl mx-auto px-6 relative">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Хэрхэн ажилладаг вэ?
        </h2>
        <p className="text-lg text-gray-400">
          EduGen AI нь багшийн материалыг ухаалаг сургалтын туршлага болгон хувиргана
        </p>
      </div>
      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connecting Line (Desktop only) */}
        <div className="hidden md:block absolute top-[72px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-blue-500/0 via-purple-500/40 to-indigo-500/0 z-0" />
        {/* Step 1 */}
        <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 group z-10 hover:-translate-y-2 text-center">
          <div className="absolute -inset-0.5 bg-gradient-to-b from-blue-500/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-md" />
          <div className="relative">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/5 border border-blue-500/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(59,130,246,0.15)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300 group-hover:scale-110">
              <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Материал нэмэх</h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Багш хичээлийн файл, тэмдэглэл, агуулгаа системд оруулна.
            </p>
          </div>
        </div>
        {/* Step 2 */}
        <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 group z-10 hover:-translate-y-2 text-center">
          <div className="absolute -inset-0.5 bg-gradient-to-b from-purple-500/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-md" />
          <div className="relative">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/5 border border-purple-500/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(168,85,247,0.15)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 group-hover:scale-110">
              <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">AI хичээл үүсгэх</h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Систем материал дээр үндэслэн интерактив хичээл, тест, дасгал үүсгэнэ.
            </p>
          </div>
        </div>
        {/* Step 3 */}
        <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 group z-10 hover:-translate-y-2 text-center">
          <div className="absolute -inset-0.5 bg-gradient-to-b from-indigo-500/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-md" />
          <div className="relative">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/5 border border-indigo-500/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(99,102,241,0.15)] group-hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all duration-300 group-hover:scale-110">
              <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14v7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Сурагч суралцах</h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Сурагч өөрийн түвшинд тохирсон агуулгаар суралцаж, AI туслахаас асууна.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Features Section */}
  <section className="relative z-10 py-24 bg-slate-950 border-t border-white/5 overflow-hidden">
    {/* Background Glow */}
    <div className="absolute top-[30%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none" />
    <div className="max-w-7xl mx-auto px-6 relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Гол онцлогууд
        </h2>
        <p className="text-lg text-gray-400">
          Сургалтын үйл явцыг бүхэлд нь шинэ шатанд гаргах хүчирхэг боломжууд
        </p>
      </div>
      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {/* Feature 1 */}
        <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2rem] p-10 hover:bg-white/10 transition-all duration-500 group z-10 hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/5 border border-blue-500/20 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300 group-hover:scale-110">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">AI хичээл үүсгэгч</h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              Багшийн материалаас автоматаар интерактив хичээл, тест, даалгавар үүсгэнэ.
            </p>
          </div>
        </div>
        {/* Feature 2 */}
        <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2rem] p-10 hover:bg-white/10 transition-all duration-500 group z-10 hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/5 border border-purple-500/20 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300 group-hover:scale-110">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Дасан зохицох сургалт</h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              Сурагчийн ахиц, ойлголтын түвшинд тохируулан агуулгыг өөрчилнө.
            </p>
          </div>
        </div>
        {/* Feature 3 */}
        <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2rem] p-10 hover:bg-white/10 transition-all duration-500 group z-10 hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/5 border border-indigo-500/20 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(99,102,241,0.1)] group-hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all duration-300 group-hover:scale-110">
              <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">AI туслах</h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              Сурагч асуулт асууж, ойлгоогүй сэдвээ шууд тайлбарлуулна.
            </p>
          </div>
        </div>
        {/* Feature 4 */}
        <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2rem] p-10 hover:bg-white/10 transition-all duration-500 group z-10 hover:-translate-y-1 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400/20 to-blue-500/5 border border-blue-400/20 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(96,165,250,0.1)] group-hover:shadow-[0_0_30px_rgba(96,165,250,0.3)] transition-all duration-300 group-hover:scale-110">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Шинжилгээ</h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              Багш, сургуульд зориулсан ахиц, гүйцэтгэлийн дата тайлан гаргана.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* CTA Section */}
  <section className="relative z-10 py-32 bg-slate-950 border-t border-white/5 overflow-hidden">
    {/* Background Glows */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none" />
    <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
      {/* Glassmorphism Container */}
      <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[3rem] p-12 md:p-20 shadow-2xl relative overflow-hidden group">
        {/* Inner Hover Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 blur-2xl transition duration-1000 group-hover:opacity-100 opacity-30" />
        <div className="relative">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Өнөөдөр эхлээрэй
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            EduGen AI ашиглан хичээлийг илүү ухаалаг, интерактив, үр дүнтэй болго
          </p>
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a href="#" className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-center transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] transform hover:-translate-y-0.5">
              Эхлэх
            </a>
            <a href="#" className="w-full sm:w-auto px-10 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white font-semibold text-center transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
              Сургууль бүртгүүлэх
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Footer Section */}
  <footer className="relative z-10 border-t border-white/5 bg-slate-950/80 backdrop-blur-xl pt-12 pb-8">
    <div className="max-w-7xl mx-auto px-6">
      {/* Top: Logo & Links */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo */}
        <a href="#" className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-80 transition-opacity">
          EduGen AI
        </a>
        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200">Бидний тухай</a>
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200">Холбоо барих</a>
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200">Нууцлал</a>
        </div>
      </div>
      {/* Bottom: Copyright */}
      <div className="mt-12 pt-8 border-t border-white/5 text-center">
        <p className="text-sm text-gray-500">
          © 2026 EduGen AI. Бүх эрх хуулиар хамгаалагдсан.
        </p>
      </div>
    </div>
  </footer>
</div>

  );
}
