"use client";

import { useState } from "react";
import { Search, Menu, X, Sun, Moon, Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useThemeLanguage } from "@/context/ThemeLanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, language, toggleTheme, setLanguage, t } = useThemeLanguage();

  const navLinks = [
    { label: { en: "Explore", ko: "탐색" }, key: "Explore" },
    { label: { en: "Map", ko: "지도" }, key: "Map" },
    { label: { en: "Culture", ko: "문화" }, key: "Culture" },
    { label: { en: "News", ko: "뉴스" }, key: "News" },
    { label: { en: "History", ko: "역사" }, key: "History" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-card/95 backdrop-blur-md border-b border-border-main transition-all duration-300 shadow-sm dark:bg-bg-card/90">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold tracking-tight text-brand font-serif">
            Heritage Africa
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => {
            const path = `/${item.key.toLowerCase()}`;
            const isActive = 
              (item.key === "Explore" && (pathname === "/" || pathname.includes("/country"))) ||
              (item.key === "Map" && pathname === "/map") ||
              (item.key !== "Explore" && item.key !== "Map" && pathname === path);
            
            let href = path;
            if (item.key === "Explore") href = "/";

            return (
              <Link
                key={item.key}
                href={href}
                className={`text-[13px] uppercase tracking-wider font-semibold transition-colors relative pb-1 ${
                  isActive ? "text-brand border-b-[3px] border-brand" : "text-text-muted hover:text-brand"
                }`}
              >
                {t(item.label)}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Search */}
          <div className="relative group">
            <Search className="w-4 h-4 text-text-light absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder={t({ en: "Search countries...", ko: "국가 검색..." })} 
              className="bg-bg-main text-text-main text-sm rounded-full pl-10 pr-4 py-2 w-40 focus:w-48 focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all placeholder:text-text-light border border-border-main"
            />
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 border border-border-main rounded-full p-1 bg-bg-main">
            <button 
              onClick={() => setLanguage("en")}
              className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                language === "en" ? "bg-brand text-white" : "text-text-muted hover:text-text-main"
              }`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage("ko")}
              className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                language === "ko" ? "bg-brand text-white" : "text-text-muted hover:text-text-main"
              }`}
            >
              KO
            </button>
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full border border-border-main hover:bg-bg-main transition-colors text-text-muted hover:text-text-main cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <button className="bg-brand hover:bg-brand-hover text-white px-5 py-2 rounded text-[13px] font-semibold tracking-wide transition-colors">
            {t({ en: "Connect", ko: "연결하기" })}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Theme Toggle for mobile header */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full border border-border-main text-text-muted hover:text-text-main cursor-pointer"
          >
            {theme === "light" ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
          </button>

          <button
            className="text-text-main p-1.5"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-bg-card border-t border-border-main py-4 px-6 flex flex-col gap-4 shadow-lg absolute w-full transition-all">
          {navLinks.map((item) => {
            const path = `/${item.key.toLowerCase()}`;
            let href = path;
            if (item.key === "Explore") href = "/";

            return (
              <Link
                key={item.key}
                href={href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-text-main hover:text-brand"
              >
                {t(item.label)}
              </Link>
            );
          })}
          
          <div className="flex flex-col gap-4 mt-2 pt-4 border-t border-border-main">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="w-5 h-5 text-text-light absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder={t({ en: "Search countries...", ko: "국가 검색..." })} 
                className="bg-bg-main w-full rounded-full pl-12 pr-4 py-3 focus:outline-none border border-border-main text-text-main"
              />
            </div>

            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-between py-2 px-1 border-b border-border-main">
              <span className="text-sm font-semibold text-text-muted flex items-center gap-1.5">
                <Globe className="w-4 h-4" />
                {t({ en: "Language", ko: "언어 설정" })}
              </span>
              <div className="flex items-center gap-1 border border-border-main rounded-full p-0.5 bg-bg-main">
                <button 
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                    language === "en" ? "bg-brand text-white" : "text-text-muted"
                  }`}
                >
                  English
                </button>
                <button 
                  onClick={() => setLanguage("ko")}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                    language === "ko" ? "bg-brand text-white" : "text-text-muted"
                  }`}
                >
                  한국어
                </button>
              </div>
            </div>

            <button className="bg-brand text-white px-6 py-3 rounded-md font-medium w-full mt-2">
              {t({ en: "Connect", ko: "연결하기" })}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
