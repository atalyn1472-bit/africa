"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import MapChart from "@/components/MapChart";
import { countries, Country } from "@/lib/countries";
import { ArrowRight, MapPin, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeLanguage } from "@/context/ThemeLanguageContext";

export default function MapPage() {
  const [tooltipContent, setTooltipContent] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const { t } = useThemeLanguage();

  const handleCountryClick = (countryName: string) => {
    const country = countries.find(c => c.name.toLowerCase() === countryName.toLowerCase());
    if (country) {
      setSelectedCountry(country);
    }
  };

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
    <main className="h-screen w-screen overflow-hidden bg-bg-main flex flex-col pt-[72px] transition-colors duration-300">
      <Navbar />

      <div className="flex-1 relative w-full h-full">
        
        {/* Full Screen Map */}
        <div className="absolute inset-0">
          <MapChart 
            setTooltipContent={setTooltipContent} 
            onCountryClick={handleCountryClick}
            selectedCountryName={selectedCountry?.name || null}
          />
        </div>

        {/* Floating Header */}
        <div className="absolute top-8 left-8 pointer-events-none z-10">
          <h1 className="text-5xl font-bold text-text-main font-serif mb-2 drop-shadow-md">
            {t({ en: "Explore Africa", ko: "아프리카 탐험하기" })}
          </h1>
          <p className="text-text-main/80 font-medium drop-shadow-sm text-lg">
            {t({ en: "Click on a highlighted country to discover more.", ko: "지도 위의 하이라이트된 국가를 클릭해 상세 정보를 확인하세요." })}
          </p>
        </div>
          
        {/* Tooltip */}
        {tooltipContent && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-gray-900/90 dark:bg-stone-900/95 backdrop-blur-sm text-white px-6 py-3 rounded-full shadow-lg pointer-events-none z-20 text-sm font-semibold tracking-wide border border-white/10 dark:border-stone-800">
            {tooltipContent}
          </div>
        )}

        {/* Floating Info Panel Container */}
        <div className="absolute z-10 w-[92%] max-w-[360px] bottom-6 left-1/2 -translate-x-1/2 md:bottom-auto md:right-auto md:left-[calc(50%+120px)] md:top-1/2 md:-translate-y-1/2 md:translate-x-0 transition-all duration-300">
          <AnimatePresence mode="wait">
            {selectedCountry ? (
              <motion.div 
                key={selectedCountry.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-bg-card/95 backdrop-blur-md rounded-3xl p-6 border border-border-main shadow-2xl transition-colors duration-300 relative"
              >
                {/* Close/Zoom-out button */}
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="absolute top-4 right-4 bg-bg-main hover:bg-brand/10 hover:text-brand border border-border-main text-text-muted p-1.5 rounded-full transition-colors z-20 cursor-pointer shadow-sm"
                  aria-label="Close and zoom out"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="w-full aspect-video rounded-xl overflow-hidden mb-5 relative border border-border-main">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${selectedCountry.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand" />
                    <span className="text-xs font-semibold tracking-widest uppercase">{getRegionTranslation(selectedCountry.region)}</span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-text-main font-serif mb-2">{selectedCountry.name}</h2>
                <p className="text-text-muted leading-relaxed mb-6 text-sm line-clamp-3">
                  {selectedCountry.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                   <div className="bg-bg-main/80 rounded-lg p-3 text-center border border-border-main transition-colors duration-300">
                     <span className="block text-[10px] font-bold text-text-light uppercase tracking-widest mb-1">
                       {t({ en: "Capital", ko: "수도" })}
                     </span>
                     <span className="block font-semibold text-text-main text-sm truncate px-1" title={selectedCountry.capital}>{selectedCountry.capital}</span>
                   </div>
                   <div className="bg-bg-main/80 rounded-lg p-3 text-center border border-border-main transition-colors duration-300">
                     <span className="block text-[10px] font-bold text-text-light uppercase tracking-widest mb-1">
                       {t({ en: "Language", ko: "사용 언어" })}
                     </span>
                     <span className="block font-semibold text-text-main text-sm truncate px-1" title={selectedCountry.language}>{selectedCountry.language}</span>
                   </div>
                </div>

                <Link 
                  href={`/country/${selectedCountry.id}`}
                  className="w-full bg-brand hover:bg-brand-hover text-white py-3.5 rounded-lg text-sm font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
                >
                  {t({ en: `Explore ${selectedCountry.name}`, ko: `${selectedCountry.name} 탐험하기` })} <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

      </div>
    </main>
  );
}
