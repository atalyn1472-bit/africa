"use client";

import Link from "next/link";
import { Globe, Mail } from "lucide-react";
import { useThemeLanguage } from "@/context/ThemeLanguageContext";

export default function Footer() {
  const { t } = useThemeLanguage();

  return (
    <footer className="bg-bg-card border-t border-border-main py-20 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-xl font-bold tracking-tight text-brand font-serif">
                Heritage Africa
              </span>
            </Link>
            <p className="text-text-muted text-sm mb-6 leading-relaxed max-w-[200px]">
              © {new Date().getFullYear()} Heritage Africa. {t({ en: "Celebrating Vibrant Heritage.", ko: "찬란한 아프리카 유산을 기념합니다." })}
            </p>
            <div className="flex items-center gap-4">
              <button className="text-text-muted hover:text-brand transition-colors">
                <Globe className="w-5 h-5" />
              </button>
              <button className="text-text-muted hover:text-brand transition-colors">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Explore Column */}
          <div className="col-span-1">
            <h4 className="text-xs font-bold text-text-main tracking-widest uppercase mb-6">{t({ en: "Explore", ko: "탐색" })}</h4>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-sm text-text-muted hover:text-brand transition-colors underline-offset-4 hover:underline">
                  {t({ en: "Educational Resources", ko: "교육 자료" })}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-text-muted hover:text-brand transition-colors underline-offset-4 hover:underline">
                  {t({ en: "Country Archives", ko: "국가 아카이브" })}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-text-muted hover:text-brand transition-colors underline-offset-4 hover:underline">
                  {t({ en: "Cultural Map", ko: "문화 지도" })}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="col-span-1">
            <h4 className="text-xs font-bold text-text-main tracking-widest uppercase mb-6">{t({ en: "Legal", ko: "법적 고지" })}</h4>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-sm text-text-muted hover:text-brand transition-colors underline-offset-4 hover:underline">
                  {t({ en: "Privacy Policy", ko: "개인정보 처리방침" })}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-text-muted hover:text-brand transition-colors underline-offset-4 hover:underline">
                  {t({ en: "Terms of Service", ko: "이용 약관" })}
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="col-span-1">
             <h4 className="text-xs font-bold text-text-main tracking-widest uppercase mb-6">{t({ en: "Connect", ko: "소통하기" })}</h4>
             <ul className="space-y-4">
              <li>
                <Link href="#" className="text-sm text-text-muted hover:text-brand transition-colors underline-offset-4 hover:underline">
                  {t({ en: "Contact Us", ko: "문의하기" })}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-text-muted hover:text-brand transition-colors underline-offset-4 hover:underline">
                  {t({ en: "Newsletter", ko: "뉴스레터 구독" })}
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
