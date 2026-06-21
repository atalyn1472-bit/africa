"use client";

import React, { memo, useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import { countries as countryData } from "@/lib/countries";
import { useThemeLanguage } from "@/context/ThemeLanguageContext";

const countryNameKo: Record<string, string> = {
  "libya": "리비아",
  "morocco": "모로코",
  "w. sahara": "서사하라",
  "western sahara": "서사하라",
  "algeria": "알제리",
  "tunisia": "튀니지",
  "egypt": "이집트",
  "sudan": "수단",
  "eritrea": "에리트레아",
  "djibouti": "지부티",
  "somalia": "소말리아",
  "ethiopia": "에티오피아",
  "s. sudan": "남수단",
  "south sudan": "남수단",
  "uganda": "우간다",
  "rwanda": "르완다",
  "burundi": "부룬디",
  "kenya": "케냐",
  "tanzania": "탄자니아",
  "seychelles": "세이셸",
  "mozambique": "모잠비크",
  "malawi": "말라위",
  "comoros": "코모로",
  "madagascar": "마다가스카르",
  "mauritius": "모리셔스",
  "eswatini": "에스와티니",
  "swaziland": "에스와티니",
  "south africa": "남아프리카 공화국",
  "lesotho": "레소토",
  "namibia": "나미비아",
  "angola": "앙골라",
  "botswana": "보츠와나",
  "zimbabwe": "짐바브웨",
  "zambia": "잠비아",
  "dem. rep. congo": "콩고 민주 공화국",
  "democratic republic of the congo": "콩고 민주 공화국",
  "congo": "콩고 공화국",
  "republic of the congo": "콩고 공화국",
  "gabon": "가봉",
  "eq. guinea": "적도 기니",
  "equatorial guinea": "적도 기니",
  "são tomé and principe": "상투메 프린시페",
  "sao tome and principe": "상투메 프린시페"
};

// TopoJSON for World map
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface MapChartProps {
  setTooltipContent: (content: string) => void;
  onCountryClick: (countryName: string) => void;
  selectedCountryName: string | null;
}

const MapChart = ({ setTooltipContent, onCountryClick, selectedCountryName }: MapChartProps) => {
  const [geographiesList, setGeographiesList] = useState<any[]>([]);
  const [position, setPosition] = useState({ coordinates: [20, 0], zoom: 1.5 });
  const { t } = useThemeLanguage();

  const getCountryDisplayName = (countryName: string) => {
    const name = countryName.toLowerCase();
    return t({
      en: countryName,
      ko: countryNameKo[name] || countryName
    });
  };

  // Map mapping helper for name mismatches between database and TopoJSON
  const getCountryFromGeoName = (geoName: string) => {
    const normalizedGeo = geoName.toLowerCase();
    return countryData.find((c) => {
      const name = c.name.toLowerCase();
      return (
        name === normalizedGeo ||
        (name === "w. sahara" && normalizedGeo === "western sahara") ||
        (name === "dem. rep. congo" && (normalizedGeo === "democratic republic of the congo" || normalizedGeo === "dem. rep. congo")) ||
        (name === "congo" && (normalizedGeo === "republic of congo" || normalizedGeo === "republic of the congo")) ||
        (name === "s. sudan" && normalizedGeo === "south sudan") ||
        (name === "eswatini" && (normalizedGeo === "swaziland" || normalizedGeo === "eswatini")) ||
        (name === "são tomé and principe" && (normalizedGeo === "sao tome and principe" || normalizedGeo === "são tomé and principe")) ||
        (name === "eq. guinea" && normalizedGeo === "equatorial guinea")
      );
    });
  };

  const isCountrySupported = (geoName: string) => {
    return !!getCountryFromGeoName(geoName);
  };

  // Adjust zoom & center position dynamically based on selected country
  useEffect(() => {
    if (!selectedCountryName) {
      setPosition({ coordinates: [16, 2], zoom: 1.5 });
      return;
    }

    const geoFeature = geographiesList.find(
      (g) => g.properties.name.toLowerCase() === selectedCountryName.toLowerCase() ||
             getCountryFromGeoName(g.properties.name)?.name.toLowerCase() === selectedCountryName.toLowerCase()
    );

    if (geoFeature) {
      const centroid = geoCentroid(geoFeature);
      // Center on the country and zoom in
      setPosition({ coordinates: centroid, zoom: 4.5 });
    }
  }, [selectedCountryName, geographiesList]);

  // Find info of the currently selected country to draw its flag
  const selectedCountry = selectedCountryName ? getCountryFromGeoName(selectedCountryName) : null;
  const selectedGeoFeature = selectedCountryName
    ? geographiesList.find(
        (g) => g.properties.name.toLowerCase() === selectedCountryName.toLowerCase() ||
               getCountryFromGeoName(g.properties.name)?.name.toLowerCase() === selectedCountryName.toLowerCase()
      )
    : null;
  const selectedCentroid = selectedGeoFeature ? geoCentroid(selectedGeoFeature) : null;

  return (
    <div className="w-full h-full relative cursor-crosshair">
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [-20.0, -2.0, 0], // Focus on Africa center
          scale: 380
        }}
        className="w-full h-full outline-none"
      >
        <ZoomableGroup 
          center={position.coordinates as [number, number]} 
          zoom={position.zoom} 
          onMoveEnd={(pos) => setPosition(pos)}
          maxZoom={8}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) => {
              // Store geographies list for centroid lookup on selection changes
              if (geographiesList.length === 0 && geographies.length > 0) {
                setGeographiesList(geographies);
              }

              return geographies.map((geo) => {
                const geoName = geo.properties.name;
                const country = getCountryFromGeoName(geoName);
                const isSupported = !!country;
                const isSelected = selectedCountryName?.toLowerCase() === country?.name.toLowerCase();

                // If the country is not supported (i.e. not in Africa database), do not render it.
                // This removes other continents and keeps only Africa.
                if (!isSupported) {
                  return null;
                }

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      setTooltipContent(country.name);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    onClick={() => {
                      onCountryClick(country.name);
                    }}
                    style={{
                      default: {
                        fill: isSelected ? "#8B3E2A" : "#A44A32",
                        outline: "none",
                        stroke: "#FFFFFF",
                        strokeWidth: 0.8,
                        transition: "fill 250ms, stroke-width 250ms",
                        cursor: "pointer"
                      },
                      hover: {
                        fill: "#8B3E2A",
                        outline: "none",
                        stroke: "#FFFFFF",
                        strokeWidth: 1.2,
                        cursor: "pointer"
                      },
                      pressed: {
                        fill: "#6D3121",
                        outline: "none"
                      }
                    }}
                  />
                );
              });
            }}
          </Geographies>

          {/* Render the flag when a country is selected */}
          {selectedCountry && selectedCentroid && (
            <Marker coordinates={selectedCentroid}>
              <g className="pointer-events-none">
                <defs>
                  <clipPath id="flag-clip">
                    <circle cx="0" cy="-28" r="13" />
                  </clipPath>
                </defs>
                {/* Pin body (waterdrop shape) */}
                <path
                  d="M 0 0 C -10 -10, -16 -18, -16 -28 A 16 16 0 1 1 16 -28 C 16 -18, 10 -10, 0 0 Z"
                  fill="var(--color-bg-card)"
                  stroke="var(--color-brand)"
                  strokeWidth="2.5"
                  style={{ filter: "drop-shadow(0px 3px 6px rgba(0,0,0,0.3))" }}
                />
                {/* Country Flag image cropped to circle */}
                <image
                  href={`https://flagcdn.com/w160/${selectedCountry.iso2.toLowerCase()}.png`}
                  x="-15"
                  y="-43"
                  width="30"
                  height="30"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#flag-clip)"
                />
                {/* Localized Country Name text below pin */}
                <text
                  y="18"
                  textAnchor="middle"
                  fill="var(--text-main)"
                  stroke="var(--bg-main)"
                  strokeWidth="3.5"
                  paintOrder="stroke"
                  className="text-[10px] font-bold select-none"
                  style={{ fontSize: "9px", fontFamily: "sans-serif" }}
                >
                  {getCountryDisplayName(selectedCountry.name)}
                </text>
              </g>
            </Marker>
          )}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);
