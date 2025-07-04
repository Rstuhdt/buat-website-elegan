"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Compass,
  Target,
  Users,
  ImageIcon,
  TriangleIcon as ExclamationTriangle,
  Lightbulb,
  Handshake,
  TrendingUp,
  Megaphone,
  FileText,
  Rocket,
  UserIcon as UserGraduate,
  Store,
  ClapperboardIcon as ChalkboardTeacher,
  Sun,
  Moon,
  Sparkles,
  Calendar,
  BarChart3,
  Star,
  Zap,
  Heart,
  Coffee,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface KPIData {
  title: string
  target: number
  currentValue: number
  unit: string
  color: string
  icon: any
}

interface BudgetData {
  category: string
  allocated: number
  spent: number
  color: string
}

export default function MarketingPortal() {
  const { theme } = useTheme()
  const [activeSection, setActiveSection] = useState("dashboard")
  const [activeStrategy, setActiveStrategy] = useState("strategi-konten")
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
  const [activeDocSection, setActiveDocSection] = useState("roadmap")
  const [checkedTasks, setCheckedTasks] = useState(new Set())
  const [activeSocialSection, setActiveSocialSection] = useState("smo")
  const [activeTab, setActiveTab] = useState("tab-smo")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [dailyQuote, setDailyQuote] = useState("")
  const [showConfetti, setShowConfetti] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [comments, setComments] = useState({})
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [currentTaskId, setCurrentTaskId] = useState("")
  const [currentComment, setCurrentComment] = useState("")
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const motivationalQuotes = [
    "Kesuksesan adalah hasil dari persiapan, kerja keras, dan belajar dari kegagalan. - Colin Powell",
    "Inovasi membedakan antara pemimpin dan pengikut. - Steve Jobs",
    "Kualitas bukanlah tindakan, tetapi kebiasaan. - Aristoteles",
    "Tim yang hebat tidak terjadi begitu saja, mereka dibentuk dengan dedikasi. - John C. Maxwell",
    "Kreativitas adalah kecerdasan yang bersenang-senang. - Albert Einstein",
    "Masa depan milik mereka yang percaya pada keindahan mimpi mereka. - Eleanor Roosevelt",
    "Keunggulan bukanlah keterampilan, tetapi sikap. - Ralph Marston",
  ]

  const checklistData = [
    { isCategory: true, task: "A. Perencanaan Strategis & Seminar" },
    { category: "Seminar", task: "Merancang materi presentasi seminar yang menarik dan edukatif.", pic: "", notes: "" },
    {
      category: "Seminar",
      task: "Memastikan semua logistik pemasaran seminar siap (materi cetak, visual).",
      pic: "",
      notes: "",
    },
    { category: "Strategi", task: "Menjalin komunikasi proaktif dengan pimpinan sekolah.", pic: "", notes: "" },
    { isCategory: true, task: "B. Pengembangan Aset Pemasaran" },
    { category: "Aset Fisik", task: "Mendesain dan mencetak materi (poster, pamflet, spanduk).", pic: "", notes: "" },
    { category: "Aset Fisik", task: "Mendesain dan memproduksi merchandise (kaos, pin, topi).", pic: "", notes: "" },
    {
      category: "Aset Digital",
      task: "Menyiapkan konten awal untuk Website dan Media Sosial (TikTok).",
      pic: "",
      notes: "",
    },
    { category: "Aset Digital", task: "Memproduksi video tutorial penggunaan platform.", pic: "", notes: "" },
    { isCategory: true, task: "C. Pelaksanaan Promosi & Akuisisi" },
    { category: "Promosi", task: "Menetapkan skema program promosi dan diskon awal.", pic: "", notes: "" },
    {
      category: "Akuisisi",
      task: "Menyiapkan posko bantuan (helpdesk) untuk pendaftaran langsung.",
      pic: "",
      notes: "",
    },
    {
      category: "Akuisisi",
      task: "Merekrut dan memberi pengarahan untuk program Solera Ambassador.",
      pic: "",
      notes: "",
    },
    { isCategory: true, task: "D. Branding & Hubungan Masyarakat" },
    {
      category: "Branding",
      task: 'Mengembangkan narasi konsisten "Pionir Digital Marketplace untuk Sekolah".',
      pic: "",
      notes: "",
    },
    { category: "Humas", task: "Menyiapkan protokol dan tim respons krisis internal.", pic: "", notes: "" },
    { category: "Komunitas", task: "Menjalin kerja sama dengan OSIS untuk cross-promotion.", pic: "", notes: "" },
    { isCategory: true, task: "E. Umpan Balik & Pelaporan" },
    { category: "Feedback", task: "Menyiapkan kotak saran fisik dan formulir digital.", pic: "", notes: "" },
    { category: "Pelaporan", task: "Menyiapkan template laporan harian dan mingguan.", pic: "", notes: "" },
  ]

  const kpiData: KPIData[] = [
    {
      title: "Followers Growth",
      target: 1500,
      currentValue: 1250,
      unit: "followers",
      color: "from-blue-400 to-blue-600",
      icon: Users,
    },
    {
      title: "Engagement Rate",
      target: 2.5,
      currentValue: 2.1,
      unit: "%",
      color: "from-green-400 to-green-600",
      icon: Heart,
    },
    {
      title: "Content Reach",
      target: 10000,
      currentValue: 8500,
      unit: "views",
      color: "from-purple-400 to-purple-600",
      icon: Zap,
    },
    {
      title: "Brand Mentions",
      target: 60,
      currentValue: 45,
      unit: "mentions",
      color: "from-orange-400 to-orange-600",
      icon: Star,
    },
  ]

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Selamat Pagi, Tim Juara! ☀️"
    if (hour < 17) return "Selamat Siang, Tim Hebat! 🌟"
    if (hour < 21) return "Selamat Sore, Tim Luar Biasa! 🌅"
    return "Selamat Malam, Tim Inspiratif! 🌙"
  }

  const toggleTask = (index: number) => {
    const newCheckedTasks = new Set(checkedTasks)
    if (newCheckedTasks.has(index)) {
      newCheckedTasks.delete(index)
    } else {
      newCheckedTasks.add(index)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 2000)
    }
    setCheckedTasks(newCheckedTasks)
  }

  const CircularProgress = ({ percentage, size = 120, strokeWidth = 8, color }: any) => {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {percentage}%
          </span>
        </div>
      </div>
    )
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const ConfettiAnimation = () => {
    if (!showConfetti) return null

    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            <div
              className={`w-2 h-2 rounded-full bg-gradient-to-r ${
                [
                  "from-red-400 to-pink-400",
                  "from-blue-400 to-cyan-400",
                  "from-green-400 to-emerald-400",
                  "from-yellow-400 to-orange-400",
                ][Math.floor(Math.random() * 4)]
              }`}
            />
          </div>
        ))}
      </div>
    )
  }

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id)
  }

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const today = new Date().getDate()
    setDailyQuote(motivationalQuotes[today % motivationalQuotes.length])
  }, [])

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000)
  }, [])

  const roadmapSteps = [
    {
      icon: Compass,
      title: "Fase 1: Persiapan & Fondasi",
      desc: "Membangun dasar yang kokoh dengan menyelaraskan strategi, menyiapkan materi, dan memahami pasar secara mendalam.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Rocket,
      title: "Fase 2: Peluncuran & Adopsi Awal",
      desc: "Fokus pada eksekusi peluncuran di SMAN 2 Cibinong, mendorong adopsi, dan membangun citra merek yang positif.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: TrendingUp,
      title: "Fase 3: Optimalisasi & Pertumbuhan",
      desc: "Menganalisis data, menyempurnakan strategi berdasarkan umpan balik, dan memaksimalkan engagement.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Target,
      title: "Fase 4: Ekspansi & Skalabilitas",
      desc: "Menggunakan keberhasilan awal sebagai model dan fondasi untuk ekspansi ke sekolah-sekolah lain.",
      color: "from-purple-500 to-pink-500",
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["dashboard", "strategi", "kpi", "linimasa", "aset", "dokumen", "sosmed", "krisis"]
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-300 to-green-600 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-32 h-32 border-4 border-white/20 rounded-full animate-spin border-t-white"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mt-8 animate-pulse">Mempersiapkan Pengalaman Luar Biasa...</h2>
          <p className="text-white/70 mt-2">Tunggu sebentar, keajaiban sedang dimuat</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen transition-all duration-500">
      <style jsx global>{`
        :root {
          --bg-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --bg-secondary: rgba(255, 255, 255, 0.1);
          --text-primary: #1a202c;
          --text-secondary: #4a5568;
          --glass-bg: rgba(255, 255, 255, 0.15);
          --glass-border: rgba(255, 255, 255, 0.2);
        }

        .dark {
          --bg-primary: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          --bg-secondary: rgba(0, 0, 0, 0.3);
          --text-primary: #f7fafc;
          --text-secondary: #e2e8f0;
          --glass-bg: rgba(0, 0, 0, 0.2);
          --glass-border: rgba(255, 255, 255, 0.1);
        }

        body {
          background: var(--bg-primary);
          background-attachment: fixed;
        }
      `}</style>

      <ConfettiAnimation />

      {/* Animated Background */}
      <div className="fixed inset-0 animated-bg opacity-90 -z-10"></div>
      <div className="fixed inset-0 bg-black/20 -z-10"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass-morphism border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => scrollToSection("dashboard")}
              className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <Image
                  src="/logo-solera.png"
                  alt="Logo Solera"
                  width={40}
                  height={40}
                  className="rounded-lg pulse-glow"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Portal Marketing</h1>
                <p className="text-xs text-white/70">Futuristic Dashboard</p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex">
              <ul className="flex gap-1">
                {[
                  { id: "dashboard", label: "Dasbor", icon: BarChart3 },
                  { id: "strategi", label: "Strategi", icon: Lightbulb },
                  { id: "kpi", label: "KPI", icon: Target },
                  { id: "linimasa", label: "Timeline", icon: Calendar },
                  { id: "aset", label: "Aset", icon: ImageIcon },
                  { id: "dokumen", label: "Docs", icon: FileText },
                  { id: "sosmed", label: "Social", icon: Users },
                  { id: "krisis", label: "Crisis", icon: ExclamationTriangle },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center gap-1 px-2 py-2 rounded-lg font-medium transition-all duration-300 hover-lift text-xs ${
                        activeSection === item.id
                          ? "bg-white/20 text-white shadow-lg"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <item.icon className="w-3 h-3" />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden glass-morphism p-3 rounded-xl hover-lift text-white hover:bg-white/20 transition-all duration-300"
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="lg:hidden mt-4 glass-morphism rounded-xl p-4">
              <ul className="space-y-2">
                {[
                  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
                  { id: "strategi", label: "Strategi", icon: Lightbulb },
                  { id: "kpi", label: "KPI", icon: Target },
                  { id: "linimasa", label: "Timeline", icon: Calendar },
                  { id: "aset", label: "Aset", icon: ImageIcon },
                  { id: "dokumen", label: "Dokumen", icon: FileText },
                  { id: "sosmed", label: "Social Media", icon: Users },
                  { id: "krisis", label: "Crisis", icon: ExclamationTriangle },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        scrollToSection(item.id)
                        setShowMobileMenu(false)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 text-left ${
                        activeSection === item.id
                          ? "bg-white/20 text-white shadow-lg"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Dashboard Section */}
        <section id="dashboard" className="py-20">
          <div className="max-w-7xl mx-auto px-8">
            {/* Dynamic Greeting */}
            <div className="text-center mb-16 floating-animation">
              <h2 className="text-6xl font-bold text-white mb-4">{getGreeting()}</h2>
              <div className="glass-morphism rounded-2xl p-8 max-w-4xl mx-auto">
                <p className="text-xl text-white/90 mb-4 italic">"{dailyQuote}"</p>
                <div className="flex items-center justify-center gap-4 text-white/70">
                  <Coffee className="w-5 h-5" />
                  <span>{currentTime.toLocaleTimeString("id-ID")}</span>
                  <span>•</span>
                  <span>
                    {currentTime.toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {kpiData.map((kpi, index) => {
                const percentage = Math.round((kpi.currentValue / kpi.target) * 100)
                return (
                  <div key={index} className="glass-morphism rounded-2xl p-6 hover-lift text-center group">
                    <div className="mb-6">
                      <CircularProgress percentage={percentage} size={120} strokeWidth={8} color={kpi.color} />
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <kpi.icon className="w-5 h-5 text-white/70" />
                      <h4 className="font-semibold text-white">{kpi.title}</h4>
                    </div>
                    <div className="text-sm text-white/60 mb-2">
                      Target: {kpi.target.toLocaleString("id-ID")} {kpi.unit}
                    </div>
                    <div className="text-xs text-white/50">
                      Current: {kpi.currentValue.toLocaleString("id-ID")} {kpi.unit}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 text-center glass-morphism border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-white/70" />
            <p className="text-white/70">Powered by Innovation & Creativity</p>
            <Sparkles className="w-5 h-5 text-white/70" />
          </div>
          <p className="text-white/50">&copy; 2025 PT. Solera Crypto Network. Futuristic Marketing Portal.</p>
        </div>
      </footer>
    </div>
  )
}
