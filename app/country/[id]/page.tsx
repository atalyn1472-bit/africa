"use client";

import * as React from "react";
import { countries } from "@/lib/countries";
import { MapPin, Users, Globe, Building2, Languages, ArrowRight, Users2, PaintBucket } from "lucide-react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useThemeLanguage } from "@/context/ThemeLanguageContext";

export default function CountryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const country = countries.find((c) => c.id === id);
  const { t } = useThemeLanguage();

  if (!country) {
    notFound();
  }

  const getRegionTranslation = (region: string) => {
    switch (region) {
      case "North Africa": return t({ en: "North Africa", ko: "북아프리카" });
      case "East Africa": return t({ en: "East Africa", ko: "동아프리카" });
      case "South Africa": return t({ en: "South Africa", ko: "남아프리카" });
      case "Central Africa": return t({ en: "Central Africa", ko: "중앙아프리카" });
      case "West Africa": return t({ en: "West Africa", ko: "서아프리카" });
      default: return region;
    }
  };

  return (
    <main className="min-h-screen bg-bg-main pb-24 pt-[72px] transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] w-full mb-24">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${country.image}')` }}
        >
          {/* Stronger white fade gradient at the bottom for text readability */}
          <div className="absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-bg-main via-bg-main/90 to-transparent transition-colors duration-300" />
          <div className="absolute bottom-0 w-full h-1/3 bg-bg-main/50 blur-sm transition-colors duration-300" />
        </div>
        
        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 lg:px-24">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand/20 bg-brand/10 text-brand text-xs font-bold tracking-widest mb-4">
              <MapPin className="w-3.5 h-3.5" />
              {getRegionTranslation(country.region)}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-text-main mb-4 tracking-tight drop-shadow-sm font-serif">
              {country.name}
            </h1>
            <p className="text-lg text-text-muted leading-relaxed font-medium drop-shadow-sm">
              {country.tagline}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-24 grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-24">
          
          {/* Geography & Nature */}
          <section>
            <div className="flex items-center gap-6 mb-8">
              <div className="h-px bg-brand w-12 opacity-30" />
              <h2 className="text-3xl font-bold text-text-main tracking-tight font-serif">
                {t({ en: "Geography & Nature", ko: "지리 및 자연 환경" })}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <div className="space-y-6">
                {country.geographyText.map((text, i) => (
                  <p key={i} className="text-text-muted leading-relaxed">
                    {text}
                  </p>
                ))}
              </div>
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl border border-border-main">
                <img 
                  src={country.geographyImage} 
                  alt={`${country.name} Landscape`} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* Culture & Traditions */}
          <section>
            <div className="flex items-center gap-6 mb-8">
              <div className="h-px bg-brand w-12 opacity-30" />
              <h2 className="text-3xl font-bold text-text-main tracking-tight font-serif">
                {t({ en: "Culture & Traditions", ko: "문화 및 전통" })}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {country.cultureFeatures.map((feature, i) => (
                <div key={i} className="bg-bg-card border border-border-main p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                  {feature.icon === "users" ? (
                    <PaperIconWrapper icon={Users2} />
                  ) : (
                    <PaperIconWrapper icon={PaintBucket} />
                  )}
                  <h3 className="text-xl font-bold text-text-main mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 bg-bg-card border border-border-main p-8 rounded-2xl shadow-sm transition-colors duration-300">
            <h3 className="text-2xl font-bold text-text-main mb-6 font-serif">
              {t({ en: "Key Insights", ko: "핵심 정보" })}
            </h3>
            <div className="h-px w-full bg-border-main mb-6" />
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <Building2 className="w-5 h-5 text-brand mt-1" />
                <div>
                  <p className="text-xs font-semibold text-text-light uppercase tracking-wider mb-1">
                    {t({ en: "Capital", ko: "수도" })}
                  </p>
                  <p className="text-text-main font-medium">{country.capital}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Users className="w-5 h-5 text-brand mt-1" />
                <div>
                  <p className="text-xs font-semibold text-text-light uppercase tracking-wider mb-1">
                    {t({ en: "Population", ko: "인구" })}
                  </p>
                  <p className="text-text-main font-medium">{country.population}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Languages className="w-5 h-5 text-brand mt-1" />
                <div>
                  <p className="text-xs font-semibold text-text-light uppercase tracking-wider mb-1">
                    {t({ en: "Languages", ko: "사용 언어" })}
                  </p>
                  <p className="text-text-main font-medium">{country.language}</p>
                </div>
              </div>
            </div>

            <Link 
              href="/map"
              className="w-full flex items-center justify-center gap-2 border border-brand text-brand hover:bg-brand hover:text-white transition-colors py-3 rounded-md font-medium text-sm cursor-pointer"
            >
              {t({ en: "View Map", ko: "지도 보기" })}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}

function PaperIconWrapper({ icon: Icon }: { icon: any }) {
  return (
    <div className="w-12 h-12 bg-brand/10 text-brand rounded-xl flex items-center justify-center mb-6">
      <Icon className="w-6 h-6" />
    </div>
  );
}
