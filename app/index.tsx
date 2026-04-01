const navItems = [
  { label: "Нүүр", href: "#home" },
  { label: "Асуудал", href: "#problem" },
  { label: "Шийдэл", href: "#solution" },
  { label: "Онцлог", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Demo", href: "#demo" },
  { label: "Нөлөө", href: "#impact" },
  { label: "Ирээдүй", href: "#future" },
];

const problems = [
  "Багш нарын хичээл бэлтгэх, шалгах ачаалал өндөр",
  "Сурагч бүрийн сурах хурд, ойлголтын түвшин харилцан адилгүй",
  "Материал ихэвчлэн статик (PDF, ном, нэг хэвийн контент)",
  "Ойлгохгүй хоцорсон үед шууд тусламж авах боломж бага",
  "Ахиц дэвшлийг өгөгдлөөр хянах боломж хязгаарлагдмал",
];

const solutionValue = [
  {
    title: "AI Lesson Generator",
    text: "PDF, Word, PPT, текст оруулмагц зорилго, ойлголт, слайд хэлбэрийн тайлбар, тест, summary үүсгэнэ.",
  },
  {
    title: "Adaptive Learning",
    text: "Сурагчийн хариулт, хурд, алдааны хэв маягт тулгуурлан дараагийн даалгаврыг тохируулна.",
  },
  {
    title: "AI Tutor Chat",
    text: "“Дахин тайлбарла”, “7-р ангид ойлгомжтой болго”, “жишээ өг” гэх мэт хүсэлтэд 24/7 хариулна.",
  },
  {
    title: "Learning Analytics",
    text: "Аль сэдвүүд дээр хоцрогдол үүсэж буйг багш, сургуулийн түвшинд илрүүлж зөвлөмж өгнө.",
  },
];

const features = [
  {
    title: "Smart Assessment",
    text: "Олон сонголттой, нөхөх, богино тайлбар асуултыг difficulty-ээр тохируулан үүсгэнэ.",
  },
  {
    title: "Multilingual Support",
    text: "Монгол хэл дээр бүрэн ажиллаж, англи эх сурвалжийг монголоор тайлбарлана.",
  },
  {
    title: "Low-bandwidth Mode",
    text: "Хөнгөн UI + офлайн кэштэй горимоор тогтворгүй сүлжээнд ажиллана.",
  },
  {
    title: "Inclusive Access",
    text: "Text-to-speech, mobile friendly, харааны уншихад ээлтэй дизайн.",
  },
];

const workflow = [
  "Багш материал оруулна",
  "AI хичээл, тест, тайлбар үүсгэнэ",
  "Сурагч интерактив хичээл үзнэ",
  "Систем хариуг үнэлж дасан зохицоно",
  "Analytics тайлан багшид илгээнэ",
];

const modules = [
  {
    title: "Багшийн модуль",
    items: ["Материал upload", "AI generate", "Ангидаа түгээх", "Тайлан харах"],
  },
  {
    title: "Сурагчийн модуль",
    items: ["Хичээл үзэх", "AI tutor-тай чат", "Тест өгөх", "Ахиц харах"],
  },
  {
    title: "Админ / Сургуулийн модуль",
    items: ["Хэрэглэгч удирдах", "Хичээлийн хэрэглээний тайлан", "Risk student жагсаалт"],
  },
  {
    title: "AI Engine",
    items: ["Content parser", "Lesson generator", "Adaptive recommender", "Analytics engine"],
  },
];

const advantages = [
  "Багшийн цагийг 60–80% хэмнэнэ",
  "Сурагчийн ойлголтыг бодитоор сайжруулна",
  "Хоцрогдлыг эрт илрүүлнэ",
  "Монгол хэл дээр бүрэн ажиллах боломжтой",
  "Low-internet орчинд ашиглах боломжтой",
];

const innovations = [
  "Статик материалыг интерактив болгоно",
  "Нэг хичээл → олон түвшний хувилбар",
  "AI + Education + Personalization нэгтгэсэн",
  "Дасан зохицох сургалтын үндсэн логиктой",
];

const impacts = [
  { value: "↑ Суралцах үр дүн", label: "Дата-д суурилсан ахиц" },
  { value: "↓ Багшийн ачаалал", label: "Автоматжуулсан материал" },
  { value: "↔ Тэгш боломж", label: "Сурагч бүрт тохирсон замнал" },
  { value: "K12 өргөн хэрэглээ", label: "Бүх ЕБС-д тэлэх боломж" },
];

const futureWork = [
  "Speech recognition ба ярианы хичээл",
  "Mobile app + офлайн AI хувилбар",
  "Бодит сургуулиудад туршилт",
  "Хөтөлбөрийн стандарттай нийцүүлэх",
];

const mvpFeatures = [
  "Материал upload хийх",
  "AI lesson summary үүсгэх",
  "AI quiz үүсгэх",
  "Student learning page",
  "Basic analytics dashboard",
];

const techStack = [
  "Next.js + React + Tailwind",
  "Node.js (Nest/Express) эсвэл FastAPI",
  "PostgreSQL + Redis + pgvector",
  "LLM API + OCR + Document parser",
];

import Link from "next/link";

export default function Home() {
  return (
    <div id="home" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(63,210,199,0.14),_transparent_50%),radial-gradient(circle_at_20%_60%,_rgba(255,180,92,0.12),_transparent_45%),radial-gradient(circle_at_80%_20%,_rgba(255,107,107,0.12),_transparent_40%)]" />
      <div className="absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-[#12363a] blur-[120px] opacity-60 animate-[drift_10s_ease-in-out_infinite]" />
      <div className="absolute bottom-[-20%] left-[-10%] h-[520px] w-[520px] rounded-full bg-[#2a1e12] blur-[160px] opacity-60 animate-[drift_12s_ease-in-out_infinite]" />

      <nav className="fixed top-0 z-50 w-full px-6 pt-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl shadow-lg">
          <a href="#home" className="text-xl font-extrabold tracking-tight text-white">
            EduGen AI
          </a>
          <div className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="hidden items-center justify-center rounded-xl border border-white/15 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/15 md:inline-flex"
          >
            Холбоо барих
          </a>
        </div>
      </nav>

      <section className="relative z-10 px-6 pb-20 pt-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="space-y-8 animate-[rise_0.9s_ease-out]">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
              AI-д суурилсан интерактив, adaptive learning платформ
            </div>
            <h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl">
              Хичээлийг амьд болгож, сурагч бүрт
              <span className="text-emerald-300"> өөр</span> замнал үүсгэнэ
            </h1>
            <p className="max-w-xl text-lg text-slate-300">
              EduGen AI нь багшийн оруулсан материалыг интерактив хичээл,
              тест, даалгавар, тайлбар болгон хувиргаж, сурагчийн хариулт дээр
              үндэслэн дараагийн сургалтыг автоматаар тохируулна.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/teacher/dashboard"
                className="rounded-xl bg-emerald-400 px-7 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-emerald-300"
              >
                Багш (Demo)
              </Link>
              <Link
                href="/student/dashboard"
                className="rounded-xl bg-indigo-400 px-7 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-indigo-300"
              >
                Сурагч (Demo)
              </Link>
              <Link
                href="#solution"
                className="rounded-xl border border-white/15 bg-white/5 px-7 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Шийдлийг харах
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-6 text-sm text-slate-300 sm:grid-cols-4">
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-lg font-semibold text-white">60–80%</p>
                <p>Бэлтгэл хэмнэлт</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-lg font-semibold text-white">24/7</p>
                <p>AI туслах</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-lg font-semibold text-white">K12</p>
                <p>Бүх анги</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-lg font-semibold text-white">Монгол</p>
                <p>Хэлний дэмжлэг</p>
              </div>
            </div>
          </div>
          <div className="relative animate-[rise_1.1s_ease-out]">
            <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-emerald-400/30 via-transparent to-amber-300/20 blur-2xl" />
            <div className="relative rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl shadow-2xl">
              <div className="flex items-center gap-2 pb-5">
                <span className="h-3 w-3 rounded-full bg-white/30" />
                <span className="h-3 w-3 rounded-full bg-white/30" />
                <span className="h-3 w-3 rounded-full bg-white/30" />
              </div>
              <div className="space-y-5">
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
                  <p className="text-sm font-semibold text-emerald-300">
                    PDF → Интерактив хичээл
                  </p>
                  <p className="mt-2 text-sm text-slate-300">
                    Оролтын материалыг AI анализлаад, зорилго, ойлголт, жишээ,
                    inline асуултыг нэг дор гаргана.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                    <p className="font-semibold">Adaptive next step</p>
                    <p className="mt-2 text-xs text-slate-400">
                      Буруу хариулбал тайлбар + хялбар контент
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                    <p className="font-semibold">AI tutor chat</p>
                    <p className="mt-2 text-xs text-slate-400">
                      “Өөрөөр тайлбарла” хүсэлт
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-4 text-xs text-amber-100">
                  Нэг материал → олон түвшний хичээл → хувь хүнд тохирсон суралцах
                  туршлага
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className="relative z-10 border-t border-white/5 bg-slate-950/40 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300/80">Асуудал</p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Монголын ЕБС-ийн бодит нөхцөл
            </h2>
            <p className="text-slate-300">
              Багш, сурагч, сургуулийн түвшинд хуримтлагдсан асуудлууд нь
              сургалтын чанарт шууд нөлөөлж байна.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {problems.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="solution" className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">Шийдэл</p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">EduGen AI гэж юу вэ?</h2>
            <p className="text-slate-300">
              EduGen AI нь багшийн оруулсан материалыг AI-аар боловсруулж
              интерактив хичээл, тест, даалгавар, тайлбар болгон хувиргана.
              Сурагч бүрийн ахиц дээр үндэслэн дараагийн контентыг автомат
              тохируулж өгнө.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {solutionValue.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl"
              >
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="relative z-10 border-t border-white/5 bg-slate-950/60 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300/80">Гол онцлог</p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Интерактив + Adaptive + Analytics
            </h2>
            <p className="text-slate-300">
              Багшийн ажлыг хөнгөвчилж, сурагчийн ойлголтыг гүнзгийрүүлэхэд
              чиглэсэн цогц боломжууд.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {features.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">Workflow</p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Input → AI → Adaptive → Analytics
            </h2>
            <p className="text-slate-300">Бүрэн автомат бөгөөд өөрөө сайжирдаг сургалтын цикл.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            {workflow.map((step, index) => (
              <div
                key={step}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200"
              >
                <div className="text-xs text-amber-300/80">Алхам {index + 1}</div>
                <div className="mt-2 font-medium">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/5 bg-slate-950/60 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300/80">Модуль бүтэц</p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">Системийн үндсэн модуль</h2>
            <p className="text-slate-300">Багш, сурагч, админ, AI engine гэсэн 4 үндсэн багц.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {modules.map((module) => (
              <div key={module.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-slate-300 sm:grid-cols-2">
                  {module.items.map((item) => (
                    <div key={item} className="rounded-xl border border-white/5 bg-slate-900/40 px-3 py-2">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">Demo / Screenshot</p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">Нэг платформ, олон дүр зураг</h2>
            <p className="text-slate-300">Хичээл үүсгэх, суралцах, тайлан гаргах хэсгүүдийн гол харц.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {["PDF upload & AI parse", "Generated lesson preview", "Student interaction", "Analytics dashboard"].map(
              (label) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="h-40 rounded-2xl border border-dashed border-white/15 bg-slate-900/60" />
                  <p className="mt-4 text-sm text-slate-300">{label}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/5 bg-slate-950/60 px-6 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300/80">Давуу тал</p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">Яагаад EduGen AI вэ?</h2>
            <div className="grid grid-cols-1 gap-3 text-slate-300 sm:grid-cols-2">
              {advantages.map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">Innovation</p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">Бусдаас ялгарах цөм</h2>
            <div className="grid grid-cols-1 gap-3 text-slate-300 sm:grid-cols-2">
              {innovations.map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="impact" className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300/80">Impact</p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">Боловсролын үр нөлөө</h2>
            <p className="text-slate-300">
              EduGen AI нь багшийн ажлыг хөнгөвчилж, сурагч бүрийн оролцоог
              нэмэгдүүлснээр урт хугацааны өөрчлөлт авчирна.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {impacts.map((item) => (
              <div key={item.value} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-lg font-semibold text-white">{item.value}</p>
                <p className="mt-2 text-sm text-slate-300">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="future" className="relative z-10 border-t border-white/5 bg-slate-950/60 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">Future Work</p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">Дараагийн үе шат</h2>
            <p className="text-slate-300">
              Хэрэглэгчийн хэрэгцээ, сургалтын орчны онцлогт тохируулан
              өргөжүүлнэ.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {futureWork.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-slate-300">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">MVP хувилбар</h3>
              <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-slate-300 sm:grid-cols-2">
                {mvpFeatures.map((item) => (
                  <div key={item} className="rounded-xl border border-white/5 bg-slate-900/40 px-3 py-2">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">Tech stack</h3>
              <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-slate-300">
                {techStack.map((item) => (
                  <div key={item} className="rounded-xl border border-white/5 bg-slate-900/40 px-3 py-2">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/5 p-10 text-center shadow-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300/80">Pitch</p>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              “Нэг материал → олон түвшний хичээл → хувь хүнд тохирсон
              туршлага.”
            </h2>
            <p className="mt-6 text-slate-300">
              EduGen AI бол багшийн ачааллыг бууруулж, сурагч бүрт тохирсон
              сургалтыг бий болгох AI-powered adaptive learning platform юм.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/teacher/dashboard"
                className="rounded-xl bg-emerald-400 px-7 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-300"
              >
                Багшийн Самбар руу орох
              </Link>
              <Link
                href="mailto:hello@edugen.ai"
                className="rounded-xl border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Сургуультай хамтрах
              </Link>
            </div>
            <p className="mt-6 text-xs text-slate-400">
              Багийн нэр: MindSpark (санал). Гишүүдийн нэрсийг энд оруулна.
            </p>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 bg-slate-950/80 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm text-slate-400">© 2026 EduGen AI. Бүх эрх хуулиар хамгаалагдсан.</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <a href="#solution" className="transition hover:text-white">
              Бүтээгдэхүүн
            </a>
            <a href="#demo" className="transition hover:text-white">
              Demo
            </a>
            <a href="#contact" className="transition hover:text-white">
              Холбоо барих
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
