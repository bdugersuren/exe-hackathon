import Image from "next/image";

export default function Navbar() {
  return (
<footer class="relative z-20 border-t border-white/5 bg-slate-950/80 backdrop-blur-xl pt-12 pb-8">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex flex-col md:flex-row justify-between items-center gap-6">
                <!-- Logo -->
                <a href="index.html" class="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-80 transition-opacity">
                    EduGen AI
                </a>
                
                <!-- Links -->
                <div class="flex flex-wrap justify-center gap-6 md:gap-8">
                    <a href="#" class="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200">Бидний тухай</a>
                    <a href="#" class="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200">Холбоо барих</a>
                    <a href="#" class="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200">Нууцлал</a>
                </div>
            </div>
            
            <!-- Bottom text -->
            <div class="mt-12 pt-8 border-t border-white/5 text-center">
                <p class="text-sm text-gray-500">
                    &copy; 2026 EduGen AI. Бүх эрх хуулиар хамгаалагдсан.
                </p>
            </div>
        </div>
    </footer>
 );
}