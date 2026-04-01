import Image from "next/image";

export default function Navbar() {
  return (
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

  );
}
