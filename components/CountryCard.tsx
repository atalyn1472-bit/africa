"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Country } from "@/lib/countries";
import { useThemeLanguage } from "@/context/ThemeLanguageContext";

interface Props {
  country: Country;
  index: number;
}

export default function CountryCard({ country, index }: Props) {
  const { t } = useThemeLanguage();

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
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative flex flex-col bg-bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border-main h-full"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-video overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url('${country.image}')` }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-8">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-brand" />
          <span className="text-xs font-semibold tracking-wider text-brand uppercase">{getRegionTranslation(country.region) || country.capital}</span>
        </div>
        
        <h3 className="text-2xl font-bold text-text-main mb-3 font-serif">
          {country.name}
        </h3>
        
        <p className="text-text-muted text-sm line-clamp-3 mb-6 flex-1">
          {country.description}
        </p>

        <div className="flex items-center gap-2 text-brand font-medium text-sm group/btn mt-auto">
          <span className="relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-brand after:origin-bottom-right after:transition-transform group-hover/btn:after:scale-x-100 group-hover/btn:after:origin-bottom-left">
            {t({ en: "Explore Destination", ko: "탐험하기" })}
          </span>
          <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}
