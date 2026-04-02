import Image from "next/image";

export default function About() {
  return (
    <div>
      {/* Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-700/30 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-700/20 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none" />
      
      {/* Navbar */}
      <nav className="fixed w-full z-50 top-0 transition-all duration-300 pt-4 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 flex justify-between items-center shadow-lg">
            <a href="/" className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-80 transition-opacity">
              EduGen AI
            </a>
            <div className="hidden md:flex space-x-8 text-gray-300 font-medium text-sm">
              <a href="/" className="text-white font-semibold">Нүүр</a>
              <a href="/opportunities" className="hover:text-white transition-colors duration-200">Боломжууд</a>
              <a href="/pricing" className="hover:text-white transition-colors duration-200">Үнэ</a>
              <a href="/aboutus" className="hover:text-white transition-colors duration-200">Бидний тухай</a>
            </div>
            <a href="/login" className="hidden md:inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all duration-300 text-sm font-semibold text-white shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Нэвтрэх
            </a>
            <button className="md:hidden text-gray-300 hover:text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium backdrop-blur-sm">
              <span className="mr-2">✨</span> AI-д суурилсан интерактив, adaptive learning платформ
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">
              Хичээлийг амьд болгож, сурагч бүрт <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">өөрийн замнал</span> үүсгэнэ
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
              EduGen AI нь багшийн оруулсан материалыг интерактив хичээл, тест, даалгавар болгон хувиргаж, сурагчийн хариулт дээр үндэслэн дараагийн сургалтыг автоматаар тохируулна.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <a href="/teacher-dashboard" className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-center transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] transform hover:-translate-y-0.5">
                Demo үзэх
              </a>
              <a href="#solution" className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white font-semibold text-center transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 group">
                <span>Шийдлийг харах</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </div>
          <div className="relative w-full group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000" />
            <div className="relative bg-white/5 border border-white/10 backdrop-blur-2xl rounded-2xl p-2 shadow-2xl overflow-hidden">
              <div className="flex gap-2 px-3 pt-2 pb-3">
                <div className="w-3 h-3 rounded-full bg-slate-600/50" />
                <div className="w-3 h-3 rounded-full bg-slate-600/50" />
                <div className="w-3 h-3 rounded-full bg-slate-600/50" />
              </div>
              <img src="images/Design_a_futuristic_202604011050 (1).png" alt="EduGen AI Dashboard" className="rounded-xl w-full h-auto object-cover border border-white/5" />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="relative z-10 py-24 bg-slate-950/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Монголын ЕБС-д тулгамдаж буй асуудлууд</h2>
            <p className="text-lg text-gray-400 mt-4">Багш, сурагч, сургуулийн түвшинд хуримтлагдсан асуудлууд нь сургалтын чанарт шууд нөлөөлж байна.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <h3 className="font-semibold text-white">Багш талдаа</h3>
                  <ul className="mt-3 space-y-2 text-gray-400 text-sm list-disc list-inside">
                      <li>Хичээл бэлтгэхэд их цаг зарцуулдаг</li>
                      <li>Шалгалт, даалгавар боловсруулах ачаалал өндөр</li>
                      <li>Сурагч бүрийн ахицыг нэг бүрчлэн хянах боломж хомс</li>
                  </ul>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <h3 className="font-semibold text-white">Сурагч талдаа</h3>
                  <ul className="mt-3 space-y-2 text-gray-400 text-sm list-disc list-inside">
                      <li>Сурах хурд, ойлголтын түвшин харилцан адилгүй</li>
                      <li>Хичээлийн материал ихэвчлэн статик, сонирхолгүй</li>
                      <li>Ойлгоогүй үед шууд тусламж авах боломж бага</li>
                  </ul>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl md:col-span-2 lg:col-span-1">
                  <h3 className="font-semibold text-white">Сургууль талдаа</h3>
                  <ul className="mt-3 space-y-2 text-gray-400 text-sm list-disc list-inside">
                      <li>Сургалтын чанарыг өгөгдөлд суурилан хэмжихэд хэцүү</li>
                      <li>Хоцрогдолтой сурагчдыг эрт илрүүлэх систем сул</li>
                      <li>Дижитал сургалтын нэгдсэн платформ дутмаг</li>
                  </ul>
              </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Бидний шийдэл: EduGen AI</h2>
            <p className="text-lg text-gray-400 mt-4">Багшийн оруулсан эх материалыг AI боловсруулж, сурагч бүрт тохирсон ухаалаг сургалтын орчныг бүрдүүлнэ.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                <h3 className="text-xl font-bold text-white mb-3">Интерактив хичээл үүсгэнэ</h3>
                <p className="text-gray-400">Товч агуулга, слайд, зураг жишээтэй тайлбар, дундын асуулт, төгсгөлийн шалгалт зэргийг автоматаар бэлдэнэ.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                <h3 className="text-xl font-bold text-white mb-3">Сурагч бүрт тохируулна</h3>
                <p className="text-gray-400">Амархан/дунд/хүнд түвшний контент, тайлбарын хэв маягийг өөрчилж, буруу хариулсан сэдвээр давтлага өгнө.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                <h3 className="text-xl font-bold text-white mb-3">AI туслах багш</h3>
                <p className="text-gray-400">"Дахин тайлбарла", "7-р ангийн хүүхдэд ойлгомжтой болго", "жишээ өг" гэх мэт хүсэлтэд 24/7 хариулна.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                <h3 className="text-xl font-bold text-white mb-3">Дүн шинжилгээ гаргана</h3>
                <p className="text-gray-400">Аль сэдэв дээр олон хүүхэд алдаж байгаа, аль сурагч эрсдэлтэй байгааг илрүүлж багшид зөвлөмж өгнө.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="relative z-10 py-24 bg-slate-950/50 border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Хэрхэн ажилладаг вэ?</h2>
            <p className="text-lg text-gray-400 mt-4">Input → AI → Adaptive Output → Analytics</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/5 border border-blue-500/20 flex items-center justify-center mb-6"><span className="text-3xl">📄</span></div>
              <h3 className="text-xl font-bold text-white mb-3">1. Материал нэмэх</h3>
              <p className="text-gray-400">Багш хичээлийн файл, тэмдэглэл, агуулгаа системд оруулна.</p>
            </div>
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/5 border border-purple-500/20 flex items-center justify-center mb-6"><span className="text-3xl">🤖</span></div>
              <h3 className="text-xl font-bold text-white mb-3">2. AI хичээл үүсгэх</h3>
              <p className="text-gray-400">Систем материал дээр үндэслэн интерактив хичээл, тест, дасгал үүсгэнэ.</p>
            </div>
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/5 border border-indigo-500/20 flex items-center justify-center mb-6"><span className="text-3xl">🧑‍🎓</span></div>
              <h3 className="text-xl font-bold text-white mb-3">3. Сурагч суралцах</h3>
              <p className="text-gray-400">Сурагч өөрийн түвшинд тохирсон агуулгаар суралцаж, систем дасан зохицно.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[3rem] p-12 md:p-20 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">Өнөөдөр эхлээрэй</h2>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">EduGen AI ашиглан хичээлийг илүү ухаалаг, интерактив, үр дүнтэй болго.</p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <a href="/pricing" className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-center transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] transform hover:-translate-y-0.5">
                Үнийн мэдээлэл
              </a>
              <a href="/contact" className="w-full sm:w-auto px-10 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white font-semibold text-center transition-all duration-300">
                Сургууль бүртгүүлэх
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-slate-950/80 backdrop-blur-xl pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <a href="/" className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-80 transition-opacity">
              EduGen AI
            </a>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              <a href="/aboutus" className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200">Бидний тухай</a>
              <a href="/contact" className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200">Холбоо барих</a>
              <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200">Нууцлал</a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-sm text-gray-500">© 2026 EduGen AI. Бүх эрх хуулиар хамгаалагдсан.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
