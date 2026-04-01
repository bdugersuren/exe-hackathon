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
          <a href="Opportunities.html" className="text-gray-300 hover:text-white transition-colors duration-200">Боломжууд</a>
          {/* Active Link */}
          <a href="Pricing.html" className="text-white font-semibold relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-400 after:to-purple-500 after:rounded-full">Үнэ</a>
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
  <main className="flex-grow flex flex-col relative z-10 pt-32">
    {/* 2. HERO SECTION */}
    <section className="pt-12 pb-16 px-6 text-center max-w-4xl mx-auto relative">
      <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium backdrop-blur-sm mb-6">
        <span className="mr-2">💎</span> Энгийн, ойлгомжтой үнэ
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
        Танд тохирох <br className="hidden md:block" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
          үнийн сонголт
        </span>
      </h1>
      <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
        EduGen AI-г багш, сурагч, сургууль бүр өөрийн хэрэгцээнд тохируулан ашиглах боломжтой
      </p>
    </section>
    {/* 3. PRICING CARDS SECTION */}
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
          {/* Card 1: Эхлэх */}
          <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 flex flex-col h-full hover:-translate-y-2">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-300 mb-2">Эхлэх</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-extrabold text-white">Үнэгүй</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Туршиж үзэхэд тохиромжтой үндсэн багц
              </p>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-gray-300 text-sm">1 багшийн бүртгэл</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-gray-300 text-sm">Хязгаарлагдмал хичээл үүсгэх</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-gray-300 text-sm">Үндсэн AI туслах</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-gray-300 text-sm">Суурь тайлан</span>
              </li>
            </ul>
            <a href="#" className="w-full block py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-center transition-all duration-300">
              Эхлэх
            </a>
          </div>
          {/* Card 2: Стандарт (Recommended) */}
          <div className="relative bg-slate-900 border border-purple-500/50 backdrop-blur-xl rounded-3xl p-8 transition-all duration-500 flex flex-col h-full lg:scale-105 shadow-[0_0_40px_rgba(168,85,247,0.2)] z-10">
            {/* Inner Highlight Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent rounded-3xl pointer-events-none" />
            {/* Badge */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                Хамгийн түгээмэл
              </div>
            </div>
            <div className="mb-8 relative z-10 pt-2">
              <h3 className="text-xl font-semibold text-purple-300 mb-2">Стандарт</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-extrabold text-white">39,000₮</span>
                <span className="text-gray-400 font-medium">/ сар</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Идэвхтэй ашиглах багш, жижиг багт тохиромжтой
              </p>
            </div>
            <ul className="space-y-4 mb-8 flex-grow relative z-10">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-gray-200 text-sm">5 хүртэл багш</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-gray-200 text-sm font-medium text-white">Хязгааргүй хичээл үүсгэх</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-gray-200 text-sm">AI туслах бүрэн ашиглах</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-gray-200 text-sm">Ахицын дэлгэрэнгүй шинжилгээ</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-gray-200 text-sm">Даалгавар, тест үүсгэх</span>
              </li>
            </ul>
            <a href="#" className="relative z-10 w-full block py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-center transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transform hover:-translate-y-0.5">
              Сонгох
            </a>
          </div>
          {/* Card 3: Сургууль */}
          <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 flex flex-col h-full hover:-translate-y-2">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-300 mb-2">Сургууль</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl lg:text-4xl font-extrabold text-white">Байгууллагын үнэ</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Сургууль, байгууллагад зориулсан өргөтгөсөн шийдэл
              </p>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-gray-300 text-sm">Хязгааргүй багш, анги</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-gray-300 text-sm">Сургуулийн нэгдсэн хяналтын самбар</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-gray-300 text-sm">Дэвшилтэт аналитик</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-gray-300 text-sm">Админ удирдлага</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-gray-300 text-sm">Тусгай дэмжлэг</span>
              </li>
            </ul>
            <a href="#" className="w-full block py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-center transition-all duration-300">
              Холбоо барих
            </a>
          </div>
        </div>
      </div>
    </section>
    {/* 4. COMPARISON SECTION */}
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Багцуудын харьцуулалт
          </h2>
        </div>
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2rem] p-6 md:p-10 shadow-2xl overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-5 px-4 font-semibold text-gray-300 w-1/3">Боломж</th>
                <th className="py-5 px-4 font-bold text-white text-center w-1/5">Эхлэх</th>
                <th className="py-5 px-4 font-bold text-purple-400 text-center w-1/5">Стандарт</th>
                <th className="py-5 px-4 font-bold text-white text-center w-1/5">Сургууль</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-400 divide-y divide-white/5">
              {/* Row 1 */}
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-4 font-medium text-gray-200">AI хичээл үүсгэх</td>
                <td className="py-4 px-4 text-center">Хязгаарлагдмал</td>
                <td className="py-4 px-4 text-center text-white font-semibold">Хязгааргүй</td>
                <td className="py-4 px-4 text-center text-white font-semibold">Хязгааргүй</td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-4 font-medium text-gray-200">AI туслах</td>
                <td className="py-4 px-4 text-center">Үндсэн</td>
                <td className="py-4 px-4 text-center">Бүрэн</td>
                <td className="py-4 px-4 text-center">Бүрэн</td>
              </tr>
              {/* Row 3 */}
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-4 font-medium text-gray-200">Даалгавар үүсгэх</td>
                <td className="py-4 px-4 text-center flex justify-center">
                  <span className="text-gray-600">-</span>
                </td>
                <td className="py-4 px-4 text-center flex justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </td>
                <td className="py-4 px-4 text-center flex justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </td>
              </tr>
              {/* Row 4 */}
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-4 font-medium text-gray-200">Ахицын шинжилгээ</td>
                <td className="py-4 px-4 text-center">Суурь</td>
                <td className="py-4 px-4 text-center">Дэлгэрэнгүй</td>
                <td className="py-4 px-4 text-center">Дэвшилтэт</td>
              </tr>
              {/* Row 5 */}
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-4 font-medium text-gray-200">Багшийн тоо</td>
                <td className="py-4 px-4 text-center">1</td>
                <td className="py-4 px-4 text-center">5 хүртэл</td>
                <td className="py-4 px-4 text-center">Хязгааргүй</td>
              </tr>
              {/* Row 6 */}
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-4 font-medium text-gray-200">Админ хяналт</td>
                <td className="py-4 px-4 text-center flex justify-center">
                  <span className="text-gray-600">-</span>
                </td>
                <td className="py-4 px-4 text-center flex justify-center">
                  <span className="text-gray-600">-</span>
                </td>
                <td className="py-4 px-4 text-center flex justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </td>
              </tr>
              {/* Row 7 */}
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-4 font-medium text-gray-200">Байгууллагын дэмжлэг</td>
                <td className="py-4 px-4 text-center flex justify-center">
                  <span className="text-gray-600">-</span>
                </td>
                <td className="py-4 px-4 text-center flex justify-center">
                  <span className="text-gray-600">-</span>
                </td>
                <td className="py-4 px-4 text-center flex justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    {/* 5. FAQ SECTION */}
    <section className="py-20 px-6 relative">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Түгээмэл асуултууд
          </h2>
        </div>
        <div className="space-y-4">
          {/* FAQ 1 */}
          <details className="group bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-white hover:bg-white/5 transition-colors">
              Үнэгүй багцад юу багтах вэ?
              <span className="transition group-open:rotate-180">
                <svg fill="none" height={24} shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width={24} className="text-gray-400"><path d="M6 9l6 6 6-6" /></svg>
              </span>
            </summary>
            <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2">
              Үнэгүй багц нь платформын үндсэн боломжуудыг туршиж үзэхэд зориулагдсан.
            </div>
          </details>
          {/* FAQ 2 */}
          <details className="group bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-white hover:bg-white/5 transition-colors">
              Сургуульд зориулсан үнэ хэрхэн тогтох вэ?
              <span className="transition group-open:rotate-180">
                <svg fill="none" height={24} shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width={24} className="text-gray-400"><path d="M6 9l6 6 6-6" /></svg>
              </span>
            </summary>
            <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2">
              Сургуулийн хэмжээ, хэрэглэгчийн тоо, шаардлагатай боломжуудаас хамаарч тусгай санал гаргана.
            </div>
          </details>
          {/* FAQ 3 */}
          <details className="group bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-white hover:bg-white/5 transition-colors">
              Төлбөрөө дараа нь өөрчилж болох уу?
              <span className="transition group-open:rotate-180">
                <svg fill="none" height={24} shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width={24} className="text-gray-400"><path d="M6 9l6 6 6-6" /></svg>
              </span>
            </summary>
            <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2">
              Тийм. Хэрэгцээнээсээ хамааран багцаа ахиулах эсвэл өөрчлөх боломжтой.
            </div>
          </details>
          {/* FAQ 4 */}
          <details className="group bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-white hover:bg-white/5 transition-colors">
              Демо авч үзэх боломжтой юу?
              <span className="transition group-open:rotate-180">
                <svg fill="none" height={24} shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width={24} className="text-gray-400"><path d="M6 9l6 6 6-6" /></svg>
              </span>
            </summary>
            <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2">
              Тийм. Та манай багтай холбогдон демо танилцуулга авах боломжтой.
            </div>
          </details>
        </div>
      </div>
    </section>
    {/* 6. CTA SECTION */}
    <section className="py-24 px-6 relative mt-auto border-t border-white/5">
      {/* Central Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none z-0" />
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[3rem] p-12 md:p-20 shadow-2xl relative overflow-hidden group">
          {/* Inner Hover Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 blur-2xl transition duration-1000 group-hover:opacity-100 opacity-30" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Өөрт тохирох багцаа <br className="hidden md:block" />
              өнөөдөр сонго
            </h2>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              EduGen AI ашиглан сургалтын шинэ туршлагыг яг одоо эхлүүлээрэй
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <a href="#" className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-center transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.4)] transform hover:-translate-y-0.5">
                Үнэгүй эхлэх
              </a>
              <a href="#" className="w-full sm:w-auto px-10 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white font-semibold text-center transition-all duration-300 transform hover:-translate-y-0.5">
                Демо хүсэх
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  {/* 7. FOOTER */}
  <footer className="relative z-20 border-t border-white/5 bg-slate-950/80 backdrop-blur-xl pt-12 pb-8">
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
