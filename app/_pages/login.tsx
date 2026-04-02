import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-700/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-700/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none" />
      
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl border border-gray-200/50">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-8">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <a href="/" className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              EduGen AI
            </a>
            <div className="font-semibold text-gray-600 text-lg">
              Системд тавтай морилно уу
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>Багш, сурагчийн нэвтрэх хэсэг</p>
            </div>
          </div>

          <div>
            <form action="" method="post">
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col space-y-1">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-500">И-мэйл хаяг</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="user@example.com"
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

                <div className="flex flex-col space-y-1">
                    <label htmlFor="password-input" className="text-sm font-semibold text-gray-500">Нууц үг</label>
                    <input
                        id="password-input"
                        type="password"
                        placeholder="********"
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

                <div>
                  <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all transform hover:scale-105">
                    Нэвтрэх
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
            <p>Бүртгэл байхгүй юу?</p> <a href="#" className="font-semibold text-blue-600 hover:underline">Бүртгүүлэх</a>
          </div>
        </div>
      </div>
    </div>
  );
}
