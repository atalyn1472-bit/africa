"use client";

import { useState } from "react";
import { Newspaper, ArrowRight, TrendingUp, Home } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useThemeLanguage } from "@/context/ThemeLanguageContext";

const mockCategories = [
  { key: "All", label: { en: "All", ko: "전체" } },
  { key: "Economy", label: { en: "Economy", ko: "경제" } },
  { key: "Technology", label: { en: "Technology", ko: "기술" } },
  { key: "Environment", label: { en: "Environment", ko: "환경" } },
  { key: "Arts", label: { en: "Arts", ko: "예술" } }
];

const mockNews = [
  // Tech (10 items)
  {
    id: 1,
    category: "Technology",
    title: { en: "Tech Hubs Expanding Across East Africa", ko: "동아프리카 전역으로 확장되는 기술 허브" },
    excerpt: { en: "New investments are driving a wave of innovation and startup growth in major East African cities, fostering a new generation of tech talent.", ko: "새로운 투자가 동아프리카 주요 도시의 혁신과 스타트업 성장을 주도하여 차세대 기술 인재를 육성하고 있습니다." },
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
    date: "Oct 12, 2026",
    readTime: { en: "5 min read", ko: "5분 분량" },
    featured: true,
  },
  {
    id: 5,
    category: "Technology",
    title: { en: "Renewable Energy Startups Secure Record Funding", ko: "재생 에너지 스타트업, 기록적인 자금 확보" },
    excerpt: { en: "Solar and wind energy projects are receiving unprecedented support to power remote regions.", ko: "태양광 및 풍력 에너지 프로젝트가 외딴 지역에 전력을 공급하기 위해 전례 없는 지원을 받고 있습니다." },
    image: "https://images.unsplash.com/photo-1509391366360-120050811e58?q=80&w=800&auto=format&fit=crop",
    date: "Oct 01, 2026",
    readTime: { en: "4 min read", ko: "4분 분량" },
    featured: false,
  },
  {
    id: 6,
    category: "Technology",
    title: { en: "AI Agriculture Solutions Deploying in West Africa", ko: "서아프리카에 배치되는 AI 농업 솔루션" },
    excerpt: { en: "Smart sensors and AI models are helping farmers predict weather patterns and optimize crop yields.", ko: "스마트 센서와 AI 모델은 농부들이 날씨 패턴을 예측하고 작물 수확량을 최적화하도록 돕고 있습니다." },
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=800&auto=format&fit=crop",
    date: "Sep 28, 2026",
    readTime: { en: "6 min read", ko: "6분 분량" },
    featured: false,
  },
  {
    id: 7,
    category: "Technology",
    title: { en: "Mobile Banking Reaches New Heights in Kenya", ko: "케냐에서 새로운 정점에 도달한 모바일 뱅킹" },
    excerpt: { en: "New micro-transaction features are enabling rural traders to access global markets instantly.", ko: "새로운 소액 거래 기능을 통해 시골 상인들이 글로벌 시장에 즉시 액세스할 수 있습니다." },
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
    date: "Sep 25, 2026",
    readTime: { en: "4 min read", ko: "4분 분량" },
    featured: false,
  },
  {
    id: 8,
    category: "Technology",
    title: { en: "Coding Bootcamps Empowering Youth in Lagos", ko: "라고스에서 청소년들에게 힘을 실어주는 코딩 부트캠프" },
    excerpt: { en: "Thousands of high school graduates are learning web development through community-led bootcamps.", ko: "수천 명의 고등학교 졸업생들이 커뮤니티 주도 부트캠프를 통해 웹 개발을 배우고 있습니다." },
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
    date: "Sep 20, 2026",
    readTime: { en: "5 min read", ko: "5분 분량" },
    featured: false,
  },
  {
    id: 9,
    category: "Technology",
    title: { en: "Fiber Optic Network Expands to Inland Cities", ko: "내륙 도시로 광섬유 네트워크 확장" },
    excerpt: { en: "High-speed internet infrastructure is being laid across landlocked nations to boost connectivity.", ko: "연결성을 높이기 위해 내륙국 전역에 고속 인터넷 인프라가 구축되고 있습니다." },
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop",
    date: "Sep 15, 2026",
    readTime: { en: "5 min read", ko: "5분 분량" },
    featured: false,
  },
  {
    id: 10,
    category: "Technology",
    title: { en: "E-Commerce Logistics Platforms Get Boost", ko: "전자 상거래 물류 플랫폼 활성화" },
    excerpt: { en: "New routing algorithms are solving last-mile delivery challenges in dense urban environments.", ko: "새로운 라우팅 알고리즘이 인구 밀도가 높은 도시 환경에서 라스트 마일 배송 문제를 해결하고 있습니다." },
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=800&auto=format&fit=crop",
    date: "Sep 10, 2026",
    readTime: { en: "3 min read", ko: "3분 분량" },
    featured: false,
  },
  {
    id: 11,
    category: "Technology",
    title: { en: "Satellites Monitor Wildlife Migration in Real-Time", ko: "인공위성을 이용한 야생동물 이동 실시간 모니터링" },
    excerpt: { en: "Conservationists use advanced satellite imagery and IoT collars to track elephant herds.", ko: "환경 보호론자들은 고등 위성 이미지와 IoT 칼라를 사용하여 코끼리 무리를 추적합니다." },
    image: "https://images.unsplash.com/photo-1547471080-7fc2caa7f5a6?q=80&w=800&auto=format&fit=crop",
    date: "Sep 05, 2026",
    readTime: { en: "4 min read", ko: "4분 분량" },
    featured: false,
  },
  {
    id: 26,
    category: "Technology",
    title: { en: "Virtual Reality Classrooms Launch in Kigali", ko: "키갈리에서 가상 현실 교실 출시" },
    excerpt: { en: "Students explore historical landmarks across the globe using low-cost VR headsets.", ko: "학생들은 저비용 VR 헤드셋을 사용하여 전 세계의 역사적 명소를 탐색합니다." },
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=800&auto=format&fit=crop",
    date: "Aug 30, 2026",
    readTime: { en: "5 min read", ko: "5분 분량" },
    featured: false,
  },
  {
    id: 27,
    category: "Technology",
    title: { en: "African Gaming Studios Gain Global Attention", ko: "아프리카 게임 스튜디오, 전 세계적 관심 유도" },
    excerpt: { en: "Local developers are publishing titles inspired by rich African mythologies and history.", ko: "현대 개발자들은 아프리카의 풍부한 신화와 역사에서 영감을 받은 타이틀을 퍼블리싱하고 있습니다." },
    image: "https://images.unsplash.com/photo-1553481187-be93c21490a9?q=80&w=800&auto=format&fit=crop",
    date: "Aug 25, 2026",
    readTime: { en: "4 min read", ko: "4분 분량" },
    featured: false,
  },

  // Economy (10 items)
  {
    id: 2,
    category: "Economy",
    title: { en: "Continental Free Trade Area Shows Early Success", ko: "아프리카 대륙 자유무역지대 초기 성공 입증" },
    excerpt: { en: "Intra-African trade has seen a significant boost following the implementation of the new trade agreements.", ko: "새로운 무역 협정의 시행에 따라 아프리카 역내 무역이 크게 활성화되었습니다." },
    image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c83a7f?q=80&w=800&auto=format&fit=crop",
    date: "Oct 10, 2026",
    readTime: { en: "4 min read", ko: "4분 분량" },
    featured: false,
  },
  {
    id: 12,
    category: "Economy",
    title: { en: "Green Bonds Gaining Momentum in Capital Markets", ko: "자본 시장에서 추진력을 얻고 있는 그린 본드" },
    excerpt: { en: "African nations are turning to sustainable finance to fund critical infrastructure projects.", ko: "아프리카 국가들은 중요한 인프라 프로젝트에 자금을 지원하기 위해 지속 가능한 금융으로 눈을 돌리고 있습니다." },
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop",
    date: "Oct 09, 2026",
    readTime: { en: "5 min read", ko: "5분 분량" },
    featured: false,
  },
  {
    id: 13,
    category: "Economy",
    title: { en: "Startups Attract Venture Capital at Record Pace", ko: "스타트업, 기록적인 속도로 벤처 캐피털 유치" },
    excerpt: { en: "Fintech, logistics, and agritech sectors dominate the record-breaking quarter of funding.", ko: "핀테크, 물류, 농업 기술 부문이 사상 최대의 분기 자금 조달을 주도했습니다." },
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800&auto=format&fit=crop",
    date: "Oct 07, 2026",
    readTime: { en: "4 min read", ko: "4분 분량" },
    featured: false,
  },
  {
    id: 14,
    category: "Economy",
    title: { en: "Tourism Sector Rebounds Strongly", ko: "관광 부문 강력한 반등세 기록" },
    excerpt: { en: "Ecotourism and cultural heritage routes lead the hospitality industry’s revitalization.", ko: "생태 관광과 문화유산 루트가 환대 산업의 재활성화를 주도하고 있습니다." },
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop",
    date: "Oct 04, 2026",
    readTime: { en: "6 min read", ko: "6분 분량" },
    featured: false,
  },
  {
    id: 15,
    category: "Economy",
    title: { en: "Micro-Finance Empowers Women Entrepreneurs", ko: "소액 금융, 여성 기업가에게 기회 제공" },
    excerpt: { en: "Local cooperatives provide low-interest loans, sparking economic growth in rural areas.", ko: "지역 협동조합은 저금리 대출을 제공하여 농촌 지역의 경제 성장을 촉진합니다." },
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop",
    date: "Sep 29, 2026",
    readTime: { en: "5 min read", ko: "5분 분량" },
    featured: false,
  },
  {
    id: 16,
    category: "Economy",
    title: { en: "Infrastructure Projects Connecting Major Hubs", ko: "주요 허브를 연결하는 인프라 프로젝트" },
    excerpt: { en: "New highway and rail lines aim to cut transport times between trading cities by half.", ko: "새로운 고속도로 및 철도 노선은 무역 도시 간의 운송 시간을 절반으로 줄이는 것을 목표로 합니다." },
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    date: "Sep 22, 2026",
    readTime: { en: "5 min read", ko: "5분 분량" },
    featured: false,
  },
  {
    id: 17,
    category: "Economy",
    title: { en: "Local Manufacturing Shows Steady Growth", ko: "현지 제조업 꾸준한 성장세 확인" },
    excerpt: { en: "Industrial parks are expanding production of textiles and electronics for export.", ko: "산업 단지들은 수출용 직물 및 전자 제품의 생산을 확장하고 있습니다." },
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    date: "Sep 18, 2026",
    readTime: { en: "4 min read", ko: "4분 분량" },
    featured: false,
  },
  {
    id: 18,
    category: "Economy",
    title: { en: "Agricultural Exports Diversify", ko: "농산물 수출 다변화 흐름" },
    excerpt: { en: "Focus shifts to processed goods like chocolate and coffee to capture higher market value.", ko: "더 높은 시장 가치를 포착하기 위해 초콜릿이나 커피와 같은 가공 제품으로 초점이 이동하고 있습니다." },
    image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=800&auto=format&fit=crop",
    date: "Sep 12, 2026",
    readTime: { en: "5 min read", ko: "5분 분량" },
    featured: false,
  },
  {
    id: 28,
    category: "Economy",
    title: { en: "Renewable Energy Transition Creates Thousands of Jobs", ko: "재생 에너지 전환으로 수천 개의 일자리 창출" },
    excerpt: { en: "Solar and wind energy installations are creating a massive demand for skilled local technicians.", ko: "태양광 및 풍력 에너지 설비는 숙련된 현지 기술자에 대한 막대한 수요를 창출하고 있습니다." },
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    date: "Sep 02, 2026",
    readTime: { en: "4 min read", ko: "4분 분량" },
    featured: false,
  },
  {
    id: 29,
    category: "Economy",
    title: { en: "Digital Currencies Adopted for Cross-Border Remittances", ko: "국가 간 송금을 위한 디지털 통화 도입" },
    excerpt: { en: "Fintech solutions reduce the cost of transferring money across countries significantly.", ko: "핀테크 솔루션은 국가 간의 자금 이체 비용을 크게 줄여줍니다." },
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=800&auto=format&fit=crop",
    date: "Aug 20, 2026",
    readTime: { en: "5 min read", ko: "5분 분량" },
    featured: false,
  },

  // Environment (10 items)
  {
    id: 3,
    category: "Environment",
    title: { en: "Great Green Wall Initiative Reaches Milestone", ko: "만리장성 녹화 프로젝트, 기념비적인 마일스톤 달성" },
    excerpt: { en: "Millions of hectares of degraded land have been restored across the Sahel, bringing hope to local communities.", ko: "사헬 전역에 걸쳐 수백만 헥타르의 황폐화된 토지가 복원되어 지역 사회에 희망을 불어넣었습니다." },
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    date: "Oct 08, 2026",
    readTime: { en: "6 min read", ko: "6분 분량" },
    featured: false,
  },
  {
    id: 19,
    category: "Environment",
    title: { en: "Marine Conservation Zones Expanded", ko: "해양 보존 구역 대폭 확대" },
    excerpt: { en: "Coastal nations designate new protected areas to safeguard coral reefs and fish populations.", ko: "연안 국가들은 산호초와 어류 개체수를 보호하기 위해 새로운 보호 구역을 지정합니다." },
    image: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=800&auto=format&fit=crop",
    date: "Oct 06, 2026",
    readTime: { en: "5 min read", ko: "5분 분량" },
    featured: false,
  },
  {
    id: 20,
    category: "Environment",
    title: { en: "Reforestation Projects Revitalize Highlands", ko: "고원 지대를 활성화하는 재조림 프로젝트" },
    excerpt: { en: "Community-led planting programs restore natural water catchments and native biodiversity.", ko: "커뮤니티 주도의 나무 심기 프로그램은 자연적인 유수지 및 고유 생물 다양성을 복원합니다." },
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop",
    date: "Oct 02, 2026",
    readTime: { en: "4 min read", ko: "4분 분량" },
    featured: false,
  },
  {
    id: 21,
    category: "Environment",
    title: { en: "Wildlife Corridors Protect Migratory Routes", ko: "이동 경로를 보호하는 야생동물 통로 설치" },
    excerpt: { en: "Cooperative land management keeps essential paths open for elephants and other large species.", ko: "협동적인 토지 관리는 코끼리와 다른 대형 종을 위한 필수적인 경로를 열어둡니다." },
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop",
    date: "Sep 27, 2026",
    readTime: { en: "5 min read", ko: "5분 분량" },
    featured: false,
  },
  {
    id: 22,
    category: "Environment",
    title: { en: "Eco-Friendly Farming Methods Gain Popularity", ko: "환경 친화적인 농법 대중화 추세" },
    excerpt: { en: "Permaculture and agroforestry techniques help farmers adapt to changing weather patterns.", ko: "퍼머컬처와 아그로포레스트리 기술은 농부들이 변화하는 날씨 패턴에 적응하는 것을 돕습니다." },
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800&auto=format&fit=crop",
    date: "Sep 24, 2026",
    readTime: { en: "4 min read", ko: "4분 분량" },
    featured: false,
  },
  {
    id: 23,
    category: "Environment",
    title: { en: "Solar Power Replaces Fossil Fuels in Remote Villages", ko: "외딴 마을에서 화석 연료를 대체하는 태양광 발전" },
    excerpt: { en: "Decentralized mini-grids provide clean, reliable electricity without damaging local habitats.", ko: "분산형 미니 그리드는 현지 서식지를 훼손하지 않고 깨끗하고 신뢰할 수 있는 전기를 제공합니다." },
    image: "https://images.unsplash.com/photo-1509391366360-120050811e58?q=80&w=800&auto=format&fit=crop",
    date: "Sep 16, 2026",
    readTime: { en: "5 min read", ko: "5분 분량" },
    featured: false,
  },
  {
    id: 24,
    category: "Environment",
    title: { en: "Water Management Systems Combat Drought", ko: "가뭄에 대비하는 수자원 관리 시스템" },
    excerpt: { en: "Innovative sand dams and rainwater harvesting structures secure year-round water access.", ko: "혁신적인 모래 댐과 빗물 집수 구조물은 연중 용수 접근을 보장합니다." },
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
    date: "Sep 11, 2026",
    readTime: { en: "4 min read", ko: "4분 분량" },
    featured: false,
  },
  {
    id: 25,
    category: "Environment",
    title: { en: "Youth Climate Advocates Mobilize", ko: "동원되는 청소년 기후 옹호자들" },
    excerpt: { en: "Young activists drive national campaigns for plastic ban enforcement and green policies.", ko: "젊은 활동가들은 플라스틱 금지 집행과 친환경 정책을 위한 국가적 캠페인을 주도합니다." },
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
    date: "Sep 07, 2026",
    readTime: { en: "3 min read", ko: "3분 분량" },
    featured: false,
  },
  {
    id: 30,
    category: "Environment",
    title: { en: "Banning Single-Use Plastics Shows Positive Results", ko: "일회용 플라스틱 규제, 긍정적인 성과 도출" },
    excerpt: { en: "Clean streets and healthier marine environments are reported following strict import bans.", ko: "엄격한 수입 금지 조치 이후 깨끗한 거리와 더 건강한 해양 환경이 보고되고 있습니다." },
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=800&auto=format&fit=crop",
    date: "Aug 18, 2026",
    readTime: { en: "4 min read", ko: "4분 분량" },
    featured: false,
  },
  {
    id: 31,
    category: "Environment",
    title: { en: "Community Conservancies Boost Rhino Populations", ko: "커뮤니티 보호 구역, 코뿔소 개체수 증가 기여" },
    excerpt: { en: "Anti-poaching patrols and community ownership lead to a dramatic rise in black rhino births.", ko: "밀렵 단속 순찰대와 공동체 중심의 소유 구조 덕분에 검은코뿔소 출생률이 크게 증가했습니다." },
    image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?q=80&w=800&auto=format&fit=crop",
    date: "Aug 12, 2026",
    readTime: { en: "6 min read", ko: "6분 분량" },
    featured: false,
  },

  // Arts (10 items)
  {
    id: 4,
    category: "Arts",
    title: { en: "Contemporary African Art takes Center Stage in Global Galleries", ko: "글로벌 갤러리에서 중심에 서는 아프리카 현대 미술" },
    excerpt: { en: "Artists from across the continent are redefining modern art, with major exhibitions opening in Paris, London, and New York.", ko: "대륙 전역의 예술가들이 현대 미술을 재정의하고 있으며 파리, 런던, 뉴욕에서 대규모 전시회가 열립니다." },
    image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=800&auto=format&fit=crop",
    date: "Oct 05, 2026",
    readTime: { en: "3 min read", ko: "3분 분량" },
    featured: false,
  },
  {
    id: 32,
    category: "Arts",
    title: { en: "Film Festivals Highlight African Storytellers", ko: "아프리카의 스토리텔러들을 강조하는 영화제들" },
    excerpt: { en: "Independent directors gain critical acclaim for films exploring complex identity and folklore themes.", ko: "독립 감독들은 복잡한 정체성과 민속 테마를 탐구하는 영화로 비평가들의 찬사를 받습니다." },
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop",
    date: "Oct 03, 2026",
    readTime: { en: "5 min read", ko: "5분 분량" },
    featured: false,
  },
  {
    id: 33,
    category: "Arts",
    title: { en: "Fashion Designers Lead Sustainable Trends", ko: "지속 가능한 트렌드를 선도하는 패션 디자이너들" },
    excerpt: { en: "Eco-friendly fabrics and traditional patterns merge in high-fashion runways globally.", ko: "친환경 원단과 전통 패턴이 결합하여 전 세계 하이 패션 런웨이에 등장합니다." },
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
    date: "Sep 30, 2026",
    readTime: { en: "4 min read", ko: "4분 분량" },
    featured: false,
  },
  {
    id: 34,
    category: "Arts",
    title: { en: "Traditional Music Reimagined for Modern Audiences", ko: "현대 청중을 위해 재해석된 전통 음악" },
    excerpt: { en: "Electronic beats fuse with ancient instruments, creating a viral new musical genre.", ko: "일렉트로닉 비트가 고대 악기와 융합되어 선풍적인 인기를 끄는 새로운 음악 장르를 창조합니다." },
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
    date: "Sep 26, 2026",
    readTime: { en: "4 min read", ko: "4분 분량" },
    featured: false,
  },
  {
    id: 35,
    category: "Arts",
    title: { en: "Literature Boom: Authors Win Prestigious Awards", ko: "문학의 붐: 저명한 상을 휩쓰는 작가들" },
    excerpt: { en: "Novelists from multiple countries receive international recognition for their powerful prose.", ko: "여러 국가의 소설가들이 강력하고 아름다운 산문으로 국제적인 인정을 받았습니다." },
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
    date: "Sep 21, 2026",
    readTime: { en: "5 min read", ko: "5분 분량" },
    featured: false,
  },
  {
    id: 36,
    category: "Arts",
    title: { en: "Sculptors Revive Ancient Bronze Casting Techniques", ko: "고대 청동 주조 기법을 되살리는 조각가들" },
    excerpt: { en: "Artisans merge traditional heritage with modern abstract shapes in public art projects.", ko: "장인들은 공공 예술 프로젝트에서 전통적인 유산과 현대적인 추상 형상을 융합합니다." },
    image: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=800&auto=format&fit=crop",
    date: "Sep 14, 2026",
    readTime: { en: "4 min read", ko: "4분 분량" },
    featured: false,
  },
  {
    id: 37,
    category: "Arts",
    title: { en: "Theater Companies Return to International Touring", ko: "국제 투어 공연을 재개하는 극단들" },
    excerpt: { en: "Dynamic stage plays addressing contemporary issues tour across continents.", ko: "현대 사회 문제를 다루는 역동적인 연극들이 여러 대륙에 걸쳐 투어 공연을 진행합니다." },
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=800&auto=format&fit=crop",
    date: "Sep 08, 2026",
    readTime: { en: "5 min read", ko: "5분 분량" },
    featured: false,
  },
  {
    id: 38,
    category: "Arts",
    title: { en: "Street Art Festivals Brighten Urban Districts", ko: "도시 구역을 밝히는 스트리트 아트 페스티벌" },
    excerpt: { en: "Murals painted by local and international artists tell stories of hope and community.", ko: "현지 및 해외 예술가들이 그린 벽화들이 희망과 커뮤니티의 이야기를 들려줍니다." },
    image: "https://images.unsplash.com/photo-1561055657-b9e0bf0fa360?q=80&w=800&auto=format&fit=crop",
    date: "Sep 03, 2026",
    readTime: { en: "4 min read", ko: "4분 분량" },
    featured: false,
  },
  {
    id: 39,
    category: "Arts",
    title: { en: "Digital Art Ecosystem Expands in Nigeria", ko: "나이지리아의 디지털 아트 생태계 확장" },
    excerpt: { en: "Local creators leverage digital platforms and NFTs to showcase illustration and 3D design work.", ko: "현지 창작자들은 디지털 플랫폼과 NFT를 활용하여 일러스트레이션 및 3D 디자인 작품을 선보입니다." },
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    date: "Aug 22, 2026",
    readTime: { en: "5 min read", ko: "5분 분량" },
    featured: false,
  },
  {
    id: 40,
    category: "Arts",
    title: { en: "Traditional Weaving Techniques Passed to Next Generation", ko: "다음 세대로 이어지는 전통 직조 기술" },
    excerpt: { en: "Workshops in remote regions teach youth how to spin and dye local materials.", ko: "외딴 지역의 워크숍에서 청소년들에게 지역 섬유를 잣고 염색하는 법을 가르칩니다." },
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop",
    date: "Aug 15, 2026",
    readTime: { en: "4 min read", ko: "4분 분량" },
    featured: false,
  }
];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);
  const { t } = useThemeLanguage();

  // Filter articles based on category
  const filteredArticles = mockNews.filter(
    (n) => selectedCategory === "All" || n.category === selectedCategory
  );

  // Take the first article as featured
  const featuredArticle = filteredArticles[0] || mockNews[0];
  
  // The rest are regular articles
  const regularArticles = filteredArticles.slice(1);

  // Limit regular articles displayed to visibleCount
  const displayedArticles = regularArticles.slice(0, visibleCount);

  // Whether there are more articles to load
  const hasMore = regularArticles.length > visibleCount;

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(8); // Reset
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4); // Load 4 more
  };

  const getCategoryTranslation = (cat: string) => {
    switch (cat) {
      case "Economy": return t({ en: "Economy", ko: "경제" });
      case "Technology": return t({ en: "Technology", ko: "기술" });
      case "Environment": return t({ en: "Environment", ko: "환경" });
      case "Arts": return t({ en: "Arts", ko: "예술" });
      default: return t({ en: "All", ko: "전체" });
    }
  };

  return (
    <main className="min-h-screen bg-bg-main pb-24 pt-24 md:pt-32 transition-colors duration-300">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand/20 bg-brand/5 text-brand text-xs font-bold tracking-widest mb-4">
              <Newspaper className="w-3.5 h-3.5" />
              {t({ en: "LATEST UPDATES", ko: "최신 업데이트" })}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-text-main tracking-tight">
              {t({ en: "African News & Insights", ko: "아프리카 뉴스 & 인사이트" })}
            </h1>
          </div>
          <div className="flex items-center gap-2 text-text-muted font-medium bg-bg-card px-4 py-2 rounded-full border border-border-main transition-colors duration-300">
            <TrendingUp className="w-4 h-4 text-brand" />
            {t({ en: "Trending Topics", ko: "트렌딩 토픽" })}
          </div>
        </div>

        {/* Featured Article Hero */}
        {featuredArticle && (
          <div className="relative rounded-[2rem] overflow-hidden mb-16 group cursor-pointer w-full aspect-video">
            <img 
              src={featuredArticle.image} 
              alt={t(featuredArticle.title)}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 lg:w-2/3">
              <span className="inline-block px-3 py-1 bg-brand text-white text-xs font-bold uppercase tracking-wider rounded mb-4">
                {getCategoryTranslation(featuredArticle.category)}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:underline decoration-white/30 decoration-2 underline-offset-4">
                {t(featuredArticle.title)}
              </h2>
              <p className="text-white/80 text-lg md:text-xl mb-6 line-clamp-2">
                {t(featuredArticle.excerpt)}
              </p>
              <div className="flex items-center gap-4 text-white/60 text-sm font-medium">
                <span>{featuredArticle.date}</span>
                <span>•</span>
                <span>{t(featuredArticle.readTime)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Categories Tab */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar border-b border-border-main">
          {mockCategories.map((category) => (
            <button 
              key={category.key}
              onClick={() => handleCategoryChange(category.key)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer border ${
                selectedCategory === category.key 
                  ? "bg-text-main text-bg-main border-text-main" 
                  : "bg-bg-card text-text-muted border-border-main hover:border-brand hover:text-brand"
              }`}
            >
              {t(category.label)}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12">
          {displayedArticles.map((article) => (
            <article key={article.id} className="group cursor-pointer flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-2/5 aspect-video relative rounded-2xl overflow-hidden flex-shrink-0">
                <img 
                  src={article.image} 
                  alt={t(article.title)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-bg-card/90 dark:bg-bg-card/95 backdrop-blur text-xs font-bold text-text-main border border-border-main rounded transition-colors duration-300">
                  {getCategoryTranslation(article.category)}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 text-xs text-text-light font-medium mb-3">
                  <span>{article.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-stone-700" />
                  <span>{t(article.readTime)}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-text-main mb-3 group-hover:text-brand transition-colors leading-snug">
                  {t(article.title)}
                </h3>
                <p className="text-text-muted text-sm md:text-base line-clamp-2 mb-4">
                  {t(article.excerpt)}
                </p>
                <div className="mt-auto flex items-center text-brand font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  {t({ en: "Read Article", ko: "기사 읽기" })}
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-16 text-center flex flex-col md:flex-row items-center justify-center gap-4">
          {hasMore && (
            <button 
              onClick={handleLoadMore}
              className="px-8 py-3.5 border-2 border-border-main bg-bg-card text-text-main font-bold rounded-lg hover:border-brand hover:text-brand transition-colors cursor-pointer"
            >
              {t({ en: "Load More Articles", ko: "기사 더보기" })}
            </button>
          )}
          <Link href="/" className="px-8 py-3.5 bg-bg-card border border-border-main hover:bg-bg-main text-text-main font-bold rounded-lg transition-colors flex items-center gap-2">
            <Home className="w-5 h-5" />
            {t({ en: "Back to Explore", ko: "메인 화면으로 돌아가기" })}
          </Link>
        </div>

      </div>

      <Footer />
    </main>
  );
}
