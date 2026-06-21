"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, MapPin, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useThemeLanguage } from "@/context/ThemeLanguageContext";

export default function Home() {
  const { t } = useThemeLanguage();

  return (
    <main className="min-h-screen bg-bg-main transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[85vh] w-full mt-[72px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2500&auto=format&fit=crop')` }} // Sunset Savanna Image
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-md font-serif leading-tight">
            {t({ en: "Discovering the Heart of Africa", ko: "아프리카의 심장을 발견하다" })}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-medium drop-shadow-md">
            {t({ 
              en: "Immerse yourself in the rich narratives, vibrant cultures, and breathtaking landscapes that shape the continent's enduring legacy.",
              ko: "대륙의 불후의 유산을 형성하는 풍부한 역사, 활기찬 문화, 그리고 숨막히는 풍경에 몰입해 보세요."
            })}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link href="/map" className="bg-brand hover:bg-brand-hover text-white px-8 py-3.5 rounded text-sm font-semibold tracking-wide transition-colors flex items-center gap-2">
              {t({ en: "Explore Countries", ko: "국가별 탐색하기" })} <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-3.5 rounded text-sm font-semibold tracking-wide transition-colors flex items-center gap-2">
              <PlayCircle className="w-4 h-4" /> {t({ en: "Watch Video", ko: "비디오 시청" })}
            </button>
          </div>
        </div>

        {/* Floating Search Bar */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl bg-bg-card rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-2 flex items-center border border-border-main transition-colors duration-300">
          <div className="flex-1 flex items-center px-4 border-r border-border-main">
            <MapPin className="w-5 h-5 text-text-light mr-3" />
            <input 
              type="text" 
              placeholder={t({ en: "Where do you want to explore?", ko: "어디를 탐험하고 싶으신가요?" })} 
              className="w-full text-sm py-3 focus:outline-none placeholder:text-text-light text-text-main bg-transparent"
            />
          </div>
          <button className="bg-[#2E4C3B] hover:bg-[#122118] text-white px-8 py-3.5 rounded text-sm font-semibold transition-colors ml-2 cursor-pointer">
            {t({ en: "Search", ko: "검색" })}
          </button>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 mt-32 mb-24 space-y-32">
        
        {/* Featured Destination */}
        <section>
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-text-main font-serif mb-2">
                {t({ en: "Featured Destination", ko: "이주의 추천 국가" })}
              </h2>
              <p className="text-text-muted">
                {t({ en: "Discover the rich heritage of our selected country this week.", ko: "이번 주에 선정된 국가의 풍부한 유산을 발견해 보세요." })}
              </p>
            </div>
            <Link href="/country/morocco" className="text-sm font-semibold text-brand hover:text-brand-hover transition-colors flex items-center gap-1 hidden md:flex">
              {t({ en: "View Details", ko: "자세히 보기" })} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-bg-card rounded-xl overflow-hidden border border-border-main shadow-sm flex flex-col lg:flex-row h-auto transition-colors duration-300">
            <div className="lg:w-3/5 aspect-video relative">
              <img 
                src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=1200&auto=format&fit=crop" 
                alt="Morocco Souk" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:w-2/5 p-10 lg:p-14 flex flex-col justify-center">
              <div className="flex gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-semibold">{t({ en: "North Africa", ko: "북아프리카" })}</span>
                <span className="px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-semibold">{t({ en: "History", ko: "역사" })}</span>
              </div>
              <h3 className="text-4xl font-bold text-text-main font-serif mb-6">{t({ en: "Morocco", ko: "모로코" })}</h3>
              <p className="text-text-muted leading-relaxed mb-8 flex-1">
                {t({
                  en: "A crossroads of cultures where ancient medinas meet sweeping desert landscapes. Experience the vibrant souks, intricate Islamic architecture, and the warm hospitality that has welcomed travelers for millennia.",
                  ko: "고대 메디나와 드넓은 사막 풍경이 만나는 문화의 교차로입니다. 활기찬 수크, 정교한 이슬람 건축물, 그리고 수천 년 동안 여행자들을 맞이해 온 따뜻한 환대를 경험해 보세요."
                })}
              </p>
              <Link href="/country/morocco" className="text-sm font-semibold text-brand hover:text-brand-hover transition-colors flex items-center gap-2">
                {t({ en: "Explore Morocco", ko: "모로코 탐험하기" })} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Cultural Highlights */}
        <section>
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-text-main font-serif mb-2">
              {t({ en: "Cultural Highlights", ko: "문화 하이라이트" })}
            </h2>
            <p className="text-text-muted">
              {t({ en: "Stories, art, and traditions shaping the continent.", ko: "대륙을 형성하고 있는 이야기, 미술 및 전통들." })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Large Left */}
            <div className="md:col-span-2 rounded-xl overflow-hidden relative group cursor-pointer border border-border-main w-full aspect-video md:aspect-auto md:h-full shadow-sm animate-fade-in">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1528699633788-424224dc89b5?q=80&w=1000&auto=format&fit=crop')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <span className="px-3 py-1 rounded bg-[#E2C275] text-[#2C1A10] text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">
                  {t({ en: "Art & Craft", ko: "예술 및 공예" })}
                </span>
                <h3 className="text-2xl font-bold text-white font-serif mb-2">
                  {t({ en: "The Threads of History", ko: "역사의 실타래" })}
                </h3>
                <p className="text-gray-300 text-sm">
                  {t({ en: "Exploring the deep significance of woven textiles in West African societies.", ko: "서아프리카 사회에서 직조 직물이 가지는 깊은 유산과 의미를 탐구합니다." })}
                </p>
              </div>
            </div>

            {/* Right Column: Cards 2 & 3 */}
            <div className="md:col-span-1 flex flex-col gap-6">
              {/* Card 2: Top Right */}
              <div className="bg-bg-card rounded-xl overflow-hidden border border-border-main group cursor-pointer shadow-sm flex flex-col transition-colors duration-300 flex-1">
                <div className="w-full aspect-video relative overflow-hidden">
                   <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519630761622-0a442e39cd20?q=80&w=600&auto=format&fit=crop')` }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-1 bg-bg-main/50 transition-colors duration-300 justify-center">
                  <span className="text-[#2E4C3B] dark:text-[#A3E635] text-[10px] font-bold uppercase tracking-widest mb-2">
                    {t({ en: "Music", ko: "음악" })}
                  </span>
                  <h3 className="text-lg font-bold text-text-main font-serif mb-2">
                    {t({ en: "Rhythms of the Earth", ko: "대지의 리듬" })}
                  </h3>
                  <div className="mt-2">
                    <span className="text-xs font-semibold text-brand flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t({ en: "Read Article", ko: "기사 읽기" })} <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 3: Bottom Right (Solid Color) */}
              <div className="rounded-xl overflow-hidden bg-[#B85D19] p-8 text-white relative group cursor-pointer shadow-sm flex flex-col justify-center flex-1">
                <h3 className="text-xl font-bold font-serif mb-2">
                  {t({ en: "Culinary Roots", ko: "요리의 뿌리" })}
                </h3>
                <p className="text-white/80 text-sm mb-4 flex-1 line-clamp-2 md:line-clamp-3">
                  {t({ en: "How indigenous ingredients are inspiring modern gastronomy across the continent.", ko: "전통 식재료들이 어떻게 대륙 전역에서 현대 미식에 영감을 주고 있는지 탐구합니다." })}
                </p>
                <span className="text-xs font-bold uppercase tracking-widest border-b border-white/40 pb-0.5 inline-block self-start hover:border-white transition-colors">
                  {t({ en: "Discover Recipes", ko: "레시피 알아보기" })}
                </span>
              </div>
            </div>
          </div>
          
          {/* Card 4: Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="rounded-xl overflow-hidden relative group cursor-pointer border border-border-main w-full aspect-video md:aspect-auto md:h-full shadow-sm">
               <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop" 
                alt="Modernism" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="bg-bg-card rounded-xl border border-border-main p-10 flex flex-col justify-center shadow-sm transition-colors duration-300">
               <span className="px-3 py-1 rounded bg-[#E2C275]/20 text-[#B85D19] dark:text-[#E2C275] text-[10px] font-bold uppercase tracking-widest mb-4 inline-block w-max">
                 {t({ en: "Architecture", ko: "건축" })}
               </span>
                <h3 className="text-2xl font-bold text-text-main font-serif mb-4">
                  {t({ en: "Modernism in the Tropics", ko: "열대의 모더니즘" })}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-6">
                  {t({ 
                    en: "A look at how contemporary African architects are redefining urban spaces while honoring traditional design principles.",
                    ko: "현대 아프리카 건축가들이 전통 디자인 원칙을 존중하면서 어떻게 도시 공간을 재정의하고 있는지 살펴봅니다."
                  })}
                </p>
                <button className="border border-border-main hover:bg-bg-main text-text-main text-xs font-bold uppercase tracking-widest py-2.5 px-6 rounded w-max transition-colors">
                  {t({ en: "View Gallery", ko: "갤러리 보기" })}
                </button>
            </div>
          </div>

        </section>

      </div>

      <Footer />
    </main>
  );
}
