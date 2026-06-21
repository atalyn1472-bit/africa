"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { countries } from "@/lib/countries";
import { PaintBucket, Users, Music, Utensils, Heart, Globe2 } from "lucide-react";
import Link from "next/link";
import { useThemeLanguage } from "@/context/ThemeLanguageContext";

export default function CulturePage() {
  const { t } = useThemeLanguage();

  // Get some random featured cultures from our countries data
  const featuredCountries = countries.filter(c => c.cultureFeatures.length > 0).slice(0, 6);

  return (
    <main className="min-h-screen bg-bg-main pb-24 pt-[72px] transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 scale-105 transform transition-transform duration-1000"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2000&auto=format&fit=crop')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-bg-main transition-colors duration-300" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 text-white text-xs font-bold tracking-widest mb-6 backdrop-blur-md">
            <Globe2 className="w-4 h-4" />
            {t({ en: "AFRICAN HERITAGE", ko: "아프리카 문화유산" })}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg font-serif">
            {t({ en: "A Tapestry of Culture", ko: "문화의 아름다운 직조" })}
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium drop-shadow-md max-w-2xl mx-auto">
            {t({ 
              en: "Explore the vibrant traditions, art, music, and flavors that make up the diverse cultural landscape of the African continent.",
              ko: "아프리카 대륙의 다양한 문화적 풍경을 구성하는 활기찬 전통, 미술, 음악, 그리고 독특한 맛을 탐험해 보세요."
            })}
          </p>
        </div>
      </section>

      {/* Cultural Facets Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4 tracking-tight">
            {t({ en: "Dimensions of Heritage", ko: "문화유산의 다양한 갈래" })}
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            {t({ en: "Discover the pillars of African cultural expression passed down through generations.", ko: "세대를 거쳐 전해 내려온 아프리카 문화적 표현의 기둥들을 발견해 보세요." })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              icon: PaintBucket, 
              title: { en: "Art & Crafts", ko: "예술 및 공예" }, 
              desc: { en: "Intricate beadwork, vibrant textiles, and timeless sculptures.", ko: "정교한 비즈 공예, 활기찬 직물, 그리고 시대를 초월한 조각품들." } 
            },
            { 
              icon: Music, 
              title: { en: "Music & Dance", ko: "음악 및 무용" }, 
              desc: { en: "Rhythmic beats and expressive movements that tell stories.", ko: "이야기를 담아 전하는 리드미컬한 비트와 풍부한 표현력의 춤동작들." } 
            },
            { 
              icon: Utensils, 
              title: { en: "Cuisine", ko: "음식 문화" }, 
              desc: { en: "Rich flavors, aromatic spices, and communal dining traditions.", ko: "풍부한 향과 맛, 향기로운 향신료, 그리고 함께 나누는 전통적인 식사 문화." } 
            },
            { 
              icon: Users, 
              title: { en: "Community", ko: "공동체 유대" }, 
              desc: { en: "Deep-rooted social structures and profound ancestral connections.", ko: "뿌리 깊은 사회 구조와 조상들과의 조화로운 정신적 연결." } 
            },
          ].map((facet, idx) => (
            <div key={idx} className="group p-8 rounded-3xl bg-bg-card border border-border-main hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-brand/10 text-brand rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <facet.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-text-main mb-3">{t(facet.title)}</h3>
              <p className="text-text-muted leading-relaxed">{t(facet.desc)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Traditions from Countries */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex items-center gap-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-main tracking-tight">
            {t({ en: "Featured Traditions", ko: "특색 있는 전통 문화" })}
          </h2>
          <div className="h-px bg-border-main flex-grow" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCountries.map((country) => (
            <div key={country.id} className="bg-bg-card border border-border-main rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col h-full duration-300">
              <div className="relative w-full aspect-video overflow-hidden">
                <img 
                  src={country.image} 
                  alt={country.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">
                    {t({ en: country.region, ko: country.region === "North Africa" ? "북아프리카" : country.region === "East Africa" ? "동아프리카" : country.region === "South Africa" ? "남아프리카" : "중앙아프리카" })}
                  </p>
                  <h3 className="text-2xl font-bold">{t({ en: country.name, ko: country.name })}</h3>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="space-y-6 flex-grow">
                  {country.cultureFeatures.slice(0, 2).map((feature, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="mt-1 bg-brand/10 p-2 rounded-lg text-brand flex-shrink-0">
                        {feature.icon === "users" ? <Users className="w-4 h-4" /> : <PaintBucket className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-text-main mb-1">{t({ en: feature.title, ko: feature.title })}</h4>
                        <p className="text-sm text-text-muted leading-relaxed">{t({ en: feature.description, ko: feature.description })}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Link href={`/country/${country.id}`} className="mt-8 pt-4 border-t border-border-main flex items-center text-brand font-semibold hover:text-brand-hover text-sm group/link transition-colors">
                  {t({ en: `Explore ${country.name}`, ko: `${country.name} 탐험하기` })}
                  <Heart className="w-4 h-4 ml-2 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Back to Home CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12 text-center">
        <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-bg-card hover:bg-bg-main text-text-main border border-border-main font-bold rounded-full transition-colors">
          <Globe2 className="w-5 h-5" />
          {t({ en: "Back to Explore", ko: "메인 화면으로 돌아가기" })}
        </Link>
      </section>

      <Footer />
    </main>
  );
}
