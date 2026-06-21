"use client";

import { Hourglass, MapPin, Landmark, ArrowDown, BookOpen, Home } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useThemeLanguage } from "@/context/ThemeLanguageContext";

const eras = [
  {
    id: "ancient",
    title: { en: "Ancient Civilizations", ko: "고대 문명" },
    period: { en: "Pre-3000 BCE – 500 CE", ko: "기원전 3000년 이전 – 서기 500년" },
    description: {
      en: "The dawn of humanity and the rise of the first great empires along the Nile Valley, the Kingdom of Kush, and the Axumite Empire. Architectural marvels and profound advancements in agriculture, writing, and astronomy characterized this epoch.",
      ko: "인류의 새벽이자 나일 계곡, 쿠시 왕국, 악숨 제국을 따라 세워진 위대한 첫 제국들의 흥망성쇠기입니다. 농업, 문자, 천문학 부문의 획기적인 발전과 놀라운 건축학적 경이로움들이 이 시기를 대변합니다."
    },
    image: "https://images.unsplash.com/photo-1590575304724-4f014e7aeb29?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "medieval",
    title: { en: "Golden Age of Empires", ko: "제국의 황금기" },
    period: { en: "500 CE – 1500 CE", ko: "서기 500년 – 1500년" },
    description: {
      en: "The flourishing of powerful states like the Mali Empire, Songhai, and Great Zimbabwe. A time of immense wealth, intellectual exchange, and the establishment of vast trans-Saharan trade routes dealing in gold, salt, and knowledge.",
      ko: "말리 제국, 송가이, 그레이트 짐바브웨 같은 강성한 국가들의 번영기입니다. 막대한 부의 축적, 학문적 교류, 그리고 금, 소금, 지식을 거래하는 광대한 사하라 종단 무역로의 확립이 특징입니다."
    },
    image: "https://images.unsplash.com/photo-1536125010972-e16e02613ce4?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "colonial",
    title: { en: "Colonial Era", ko: "식민지 시대" },
    period: { en: "1500 CE – Mid 20th Century", ko: "서기 1500년 – 20세기 중반" },
    description: {
      en: "A profound period of disruption marked by European colonization and the transatlantic slave trade. Despite immense hardship, this era also forged deep resilience, profound cultural shifts, and the seeds of pan-African identity.",
      ko: "유럽의 식민지 개척과 대서양 노예 무역으로 얼룩진 중대한 격변기입니다. 극심한 고난 속에서도, 이 시기는 깊은 회복 탄력성, 대대적인 문화적 변화, 그리고 범아프리카 정체성의 씨앗을 싹틔웠습니다."
    },
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "independence",
    title: { en: "Liberation & Modernity", ko: "해방과 현대" },
    period: { en: "Mid 20th Century – Present", ko: "20세기 중반 – 현재" },
    description: {
      en: "The sweeping wave of independence movements that birthed modern African nations. Today, the continent stands as a dynamic, rapidly growing tapestry of cultures driving global innovation, art, and economic development.",
      ko: "현대 아프리카 국가들을 탄생시킨 독립운동의 거센 물결입니다. 오늘날 아프리카 대륙은 글로벌 혁신, 예술 및 경제 발전을 이끄는 역동적이고 빠르게 성장하는 문화적 모자이크로 자리잡고 있습니다."
    },
    image: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?q=80&w=800&auto=format&fit=crop"
  }
];

export default function HistoryPage() {
  const { t } = useThemeLanguage();

  return (
    <main className="min-h-screen bg-bg-main transition-colors duration-300">
      <Navbar />

      {/* Cinematic Hero */}
      <section className="relative h-[80vh] w-full flex flex-col items-center justify-center overflow-hidden bg-stone-900">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 transform transition-transform duration-[20s] ease-in-out"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1590575304724-4f014e7aeb29?q=80&w=2000&auto=format&fit=crop')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-stone-900/60 to-stone-900/80" />
        
        <div className="relative z-10 text-center px-6 max-w-3xl mt-20">
          <Hourglass className="w-10 h-10 text-[#D4AF37] mx-auto mb-6 opacity-80" />
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight font-serif drop-shadow-xl">
            {t({ en: "Echoes of Time", ko: "시간의 메아리" })}
          </h1>
          <p className="text-lg md:text-xl text-stone-300 leading-relaxed font-medium">
            {t({ 
              en: "Journey through the millennia. From the cradle of humankind to the rise of great empires, discover the profound history that shaped the African continent.",
              ko: "천년의 세월을 거슬러 올라가는 여정. 인류의 요람에서 시작해 위대한 제국의 발흥에 이르기까지, 아프리카 대륙을 형성해 온 심오한 역사를 만나보세요."
            })}
          </p>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-stone-400" />
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="max-w-5xl mx-auto px-6 lg:px-8 py-24">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-text-main mb-4 tracking-tight font-serif">
            {t({ en: "Chronicles of Africa", ko: "아프리카 연대기" })}
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            {t({ en: "A brief journey through the defining epochs of African history.", ko: "아프리카 역사를 정의하는 대표적인 시대들을 따라 걷는 짧은 여정입니다." })}
          </p>
        </div>

        <div className="relative border-l-2 border-brand/20 ml-4 md:ml-[50%]">
          {eras.map((era, index) => (
            <div key={era.id} className="mb-20 relative pl-8 md:pl-0">
              {/* Timeline dot */}
              <div className="absolute w-4 h-4 bg-brand rounded-full -left-[9px] md:left-1/2 md:-ml-[9px] top-2 ring-4 ring-bg-main z-10" />
              
              <div className={`md:w-[45%] ${index % 2 === 0 ? 'md:ml-auto md:pl-12' : 'md:mr-auto md:pr-12 md:text-right'}`}>
                <div className="bg-bg-card p-8 rounded-3xl shadow-sm border border-border-main hover:shadow-xl transition-all duration-300 group">
                  <div className="text-brand font-bold tracking-widest text-sm mb-2">{t(era.period)}</div>
                  <h3 className="text-2xl font-bold text-text-main mb-4 font-serif">{t(era.title)}</h3>
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6">
                    <img 
                      src={era.image} 
                      alt={t(era.title)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <p className="text-text-muted leading-relaxed text-left">
                    {t(era.description)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Historical Landmarks */}
      <section className="bg-stone-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-serif mb-4">
                {t({ en: "Monuments of Antiquity", ko: "고대의 불가사의한 유적들" })}
              </h2>
              <p className="text-stone-400 max-w-xl text-lg">
                {t({ en: "Explore the physical remnants of ancient kingdoms that still stand proudly today.", ko: "오늘날에도 여전히 웅장하게 서 있는 고대 왕국들의 흔적을 탐구해 보세요." })}
              </p>
            </div>
            <Link href="/" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors flex items-center gap-2 font-medium">
              <BookOpen className="w-4 h-4" />
              {t({ en: "Read Full Articles", ko: "전체 글 읽기" })}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: { en: "Pyramids of Giza", ko: "기자의 피라미드" }, location: { en: "Egypt", ko: "이집트" }, img: "https://images.unsplash.com/photo-1600527352352-7104e1c12ce3?q=80&w=800&auto=format&fit=crop" },
              { name: { en: "Great Zimbabwe", ko: "그레이트 짐바브웨" }, location: { en: "Zimbabwe", ko: "짐바브웨" }, img: "https://images.unsplash.com/photo-1588661601662-793db60fa8af?q=80&w=800&auto=format&fit=crop" },
              { name: { en: "Rock-Hewn Churches", location: "Lalibela", ko: "랄리벨라 암굴 교회군" }, location: { en: "Ethiopia", ko: "에티오피아" }, img: "https://images.unsplash.com/photo-1621255153283-7d72242b78b0?q=80&w=800&auto=format&fit=crop" },
            ].map((landmark, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-4 border border-stone-800">
                  <img src={landmark.img} alt={t(landmark.name)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-2xl font-bold font-serif mb-1">{t(landmark.name)}</h3>
                    <div className="flex items-center gap-1.5 text-stone-300 text-sm">
                      <MapPin className="w-4 h-4" />
                      {t(landmark.location)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center border-t border-stone-850 pt-12">
            <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition-colors">
              <Home className="w-5 h-5" />
              {t({ en: "Back to Explore", ko: "메인 화면으로 돌아가기" })}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
