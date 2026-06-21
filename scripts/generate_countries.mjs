import fs from 'fs';
import path from 'path';

// Mapping REST Countries API common names to TopoJSON world-atlas names
const topoJsonMap = {
  "DR Congo": "Dem. Rep. Congo",
  "Republic of the Congo": "Congo",
  "Central African Republic": "Central African Rep.",
  "Equatorial Guinea": "Eq. Guinea",
  "South Sudan": "S. Sudan",
  "Western Sahara": "W. Sahara",
  "Eswatini": "eSwatini",
  "Ivory Coast": "Côte d'Ivoire",
  "São Tomé and Príncipe": "São Tomé and Principe",
  "Gambia": "Gambia",
  "Guinea-Bissau": "Guinea-Bissau",
  "Cape Verde": "Cape Verde",
};

// Hardcoded detailed countries to keep their rich descriptions
const detailedCountriesMap = {
  "south-africa": {
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2000&auto=format&fit=crop",
    geographyImage: "https://images.unsplash.com/photo-1576485290814-1c72aa4faa8e?q=80&w=800&auto=format&fit=crop",
    description: "Experience the vibrant heart of the Rainbow Nation, from the iconic Table Mountain to the untamed wilderness of Kruger National Park.",
    tagline: "The Rainbow Nation",
    geographyText: [
      "South Africa boasts an incredible diversity of landscapes, encompassing a staggering 2,798 kilometers of coastline that stretches along both the South Atlantic and Indian Oceans. To the north lie the dry, dusty expanses of the Kalahari Desert, contrasting sharply with the lush, green canopy of the Tsitsikamma forest along the Garden Route.",
      "The interior is dominated by a vast, flat, and sparsely populated scrubland known as the Karoo. The eastern coastline is well-watered and tropical, while the southwest enjoys a Mediterranean climate, fostering the world-renowned Cape Floristic Region, one of the six floral kingdoms of the world."
    ],
    cultureFeatures: [
      { title: "Diverse Heritage", description: "A beautiful amalgamation of numerous cultures, including Zulu, Xhosa, Afrikaans, and English influences, reflected in its music, art, and daily life.", icon: "users" },
      { title: "Artisan Crafts", description: "Renowned for vibrant beadwork, intricate pottery, and woven baskets that tell stories of ancient traditions and modern resilience.", icon: "paint" }
    ]
  },
  "kenya": {
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2000&auto=format&fit=crop",
    geographyImage: "https://images.unsplash.com/photo-1547471080-7fc2caa7f5a6?q=80&w=800&auto=format&fit=crop",
    description: "The classic African safari destination, home to the Great Migration and the majestic Maasai Mara.",
    tagline: "Pride of Africa",
    geographyText: [
      "Kenya's geography is as varied as its wildlife. The Great Rift Valley slices through the country from north to south, creating a dramatic landscape of lakes, volcanoes, and escarpments. Mount Kenya, the second-highest peak in Africa, towers over the central highlands, its snow-capped peak a stark contrast to the surrounding savanna.",
      "To the southeast, the coastline offers pristine white-sand beaches bordering the warm Indian Ocean. The northern regions are arid and semi-desert, characterized by rugged terrain and vital oases."
    ],
    cultureFeatures: [
      { title: "Maasai Traditions", description: "The iconic Maasai people continue to live semi-nomadic lifestyles, preserving their distinct red attire, jumping dances, and deep connection to the land.", icon: "users" },
      { title: "Swahili Coast", description: "A historic blend of African, Arab, and Indian influences that birthed the Swahili language and a unique coastal architectural style.", icon: "paint" }
    ]
  },
  "egypt": {
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=2000&auto=format&fit=crop",
    geographyImage: "https://images.unsplash.com/photo-1600527352352-7104e1c12ce3?q=80&w=800&auto=format&fit=crop",
    description: "Step back in time to the land of pharaohs, pyramids, and the life-giving Nile River.",
    tagline: "Cradle of Civilization",
    geographyText: [
      "Egypt is largely defined by the world's longest river, the Nile, which snakes through the eastern part of the country, providing a fertile lifeline amidst the surrounding desert. The vast Sahara Desert covers the majority of Egypt's landmass, creating a harsh but beautiful expanse of sand dunes and rocky plateaus.",
      "To the east, the Red Sea coast offers stunning coral reefs and rugged mountainous terrain, making it a stark contrast to the lush Nile valley and the arid Western Desert."
    ],
    cultureFeatures: [
      { title: "Ancient Wonders", description: "Home to the Great Pyramids of Giza, the Sphinx, and countless temples that stand as testaments to one of history's most powerful civilizations.", icon: "paint" },
      { title: "Vibrant Bazaars", description: "Experience the sensory overload of bustling souks, where the scent of spices, intricate textiles, and traditional music fill the air.", icon: "users" }
    ]
  },
  "morocco": {
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2000&auto=format&fit=crop",
    geographyImage: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=800&auto=format&fit=crop",
    description: "A sensory overload of colorful souks, stunning Islamic architecture, and the endless Sahara.",
    tagline: "The Western Kingdom",
    geographyText: [
      "Morocco's landscape is defined by the rugged Atlas Mountains that run down the spine of the country, separating the mild Mediterranean and Atlantic coastlines from the harsh Sahara Desert. The highest peak, Mount Toubkal, is a popular trekking destination.",
      "Beyond the mountains, the golden dunes of the Sahara stretch out endlessly. The coastal regions are fertile and historically significant, hosting ancient cities and vibrant modern hubs."
    ],
    cultureFeatures: [
      { title: "Medina Life", description: "Lose yourself in the labyrinthine alleys of ancient medinas, where artisans craft leather, brass, and ceramics using centuries-old techniques.", icon: "users" },
      { title: "Mint Tea Tradition", description: "The serving of sweet mint tea is a cornerstone of Moroccan hospitality, representing friendship and welcoming visitors.", icon: "paint" }
    ]
  },
  "tanzania": {
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2000&auto=format&fit=crop",
    geographyImage: "https://images.unsplash.com/photo-1547471080-7fc2caa7f5a6?q=80&w=800&auto=format&fit=crop",
    description: "Witness the sheer scale of the Serengeti and the towering heights of Mount Kilimanjaro.",
    tagline: "Wild at Heart",
    geographyText: [
      "Tanzania is home to Africa's highest peak, Mount Kilimanjaro, a dormant volcano that rises dramatically from the plains. The country also encompasses a significant portion of the Great Rift Valley, which holds massive lakes like Victoria, Tanganyika, and Nyasa.",
      "The vast Serengeti plains in the north are the stage for the immense annual wildebeest migration. Off the eastern coast lies the Zanzibar Archipelago, known for its pristine beaches and historic Stone Town."
    ],
    cultureFeatures: [
      { title: "Rich Tribal Tapestry", description: "Over 120 distinct ethnic groups call Tanzania home, creating a peaceful and vibrant mosaic of languages, dances, and traditions.", icon: "users" },
      { title: "Spice Island Heritage", description: "Zanzibar's history as a major trading hub is evident in its heavily spiced cuisine and the ornate wooden doors of its historic buildings.", icon: "paint" }
    ]
  },
  "madagascar": {
    image: "https://images.unsplash.com/photo-1518414922567-5d8205f15f01?q=80&w=2000&auto=format&fit=crop",
    geographyImage: "https://images.unsplash.com/photo-1506451000858-a4db79ab33b5?q=80&w=800&auto=format&fit=crop",
    description: "An evolutionary wonderland teeming with unique wildlife and dramatic landscapes found nowhere else on Earth.",
    tagline: "The Eighth Continent",
    geographyText: [
      "As the world's fourth-largest island, Madagascar's isolation has resulted in a landscape completely unique to itself. The eastern coast is a steep escarpment covered in dense tropical rainforests, while the western side is characterized by dry deciduous forests and the iconic Avenue of the Baobabs.",
      "The central highlands are terraced with rice paddies and feature cooler climates. The island is also dotted with bizarre geological formations, such as the limestone pinnacles of the Tsingy de Bemaraha."
    ],
    cultureFeatures: [
      { title: "Endemic Ecosystems", description: "Famed for its incredible biodiversity, with lemurs, chameleons, and bizarre flora that evolved entirely independently from the mainland.", icon: "paint" },
      { title: "Austronesian Roots", description: "The Malagasy culture is a fascinating blend of Southeast Asian, African, and European influences, visible in their language, agriculture, and complex burial rituals.", icon: "users" }
    ]
  }
};

const defaultImage = "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2000&auto=format&fit=crop";
const defaultGeoImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop";

function generate() {
  const regionsData = {
    "North Africa": ["Libya", "Morocco", "Western Sahara", "Algeria", "Tunisia", "Egypt", "Sudan"],
    "East Africa": ["Eritrea", "Djibouti", "Somalia", "Ethiopia", "South Sudan", "Uganda", "Rwanda", "Burundi", "Kenya", "Tanzania", "Seychelles", "Mozambique", "Malawi", "Comoros", "Madagascar", "Mauritius"],
    "South Africa": ["Eswatini", "South Africa", "Lesotho", "Namibia", "Angola", "Botswana", "Zimbabwe", "Zambia"],
    "Central Africa": ["DR Congo", "Republic of the Congo", "Gabon", "Equatorial Guinea", "São Tomé and Príncipe", "Central African Republic", "Chad", "Cameroon"],
    "West Africa": ["Nigeria", "Mali", "Niger", "Mauritania", "Cape Verde", "Senegal", "Gambia", "Guinea-Bissau", "Guinea", "Sierra Leone", "Liberia", "Ivory Coast", "Burkina Faso", "Ghana", "Togo", "Benin"]
  };

  let tsContent = `// This file is auto-generated by scripts/generate_countries.mjs\n\n`;
  tsContent += `export interface Country {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  highlights: string[];
  capital: string;
  language: string;
  population: string;
  geographyText: string[];
  geographyImage: string;
  cultureFeatures: { title: string; description: string; icon: string }[];
  region: string;
}\n\n`;

  tsContent += `export const countries: Country[] = [\n`;

  let count = 0;
  
  const countryFacts = {
    "Libya": { capital: "Tripoli", lang: "Arabic" },
    "Morocco": { capital: "Rabat", lang: "Arabic, Berber" },
    "Western Sahara": { capital: "Laayoune", lang: "Arabic, Spanish" },
    "Algeria": { capital: "Algiers", lang: "Arabic, Berber" },
    "Tunisia": { capital: "Tunis", lang: "Arabic" },
    "Egypt": { capital: "Cairo", lang: "Arabic" },
    "Sudan": { capital: "Khartoum", lang: "Arabic, English" },
    
    "Eritrea": { capital: "Asmara", lang: "Tigrinya, Arabic" },
    "Djibouti": { capital: "Djibouti City", lang: "French, Arabic" },
    "Somalia": { capital: "Mogadishu", lang: "Somali, Arabic" },
    "Ethiopia": { capital: "Addis Ababa", lang: "Amharic" },
    "South Sudan": { capital: "Juba", lang: "English" },
    "Uganda": { capital: "Kampala", lang: "English, Swahili" },
    "Rwanda": { capital: "Kigali", lang: "Kinyarwanda, English, French" },
    "Burundi": { capital: "Gitega", lang: "Kirundi, French" },
    "Kenya": { capital: "Nairobi", lang: "Swahili, English" },
    "Tanzania": { capital: "Dodoma", lang: "Swahili, English" },
    "Seychelles": { capital: "Victoria", lang: "French, English" },
    "Mozambique": { capital: "Maputo", lang: "Portuguese" },
    "Malawi": { capital: "Lilongwe", lang: "English, Chichewa" },
    "Comoros": { capital: "Moroni", lang: "Comorian, Arabic, French" },
    "Madagascar": { capital: "Antananarivo", lang: "Malagasy, French" },
    "Mauritius": { capital: "Port Louis", lang: "English, French" },

    "Eswatini": { capital: "Mbabane", lang: "Swazi, English" },
    "South Africa": { capital: "Pretoria", lang: "12 Official Languages" },
    "Lesotho": { capital: "Maseru", lang: "Sesotho, English" },
    "Namibia": { capital: "Windhoek", lang: "English" },
    "Angola": { capital: "Luanda", lang: "Portuguese" },
    "Botswana": { capital: "Gaborone", lang: "English, Setswana" },
    "Zimbabwe": { capital: "Harare", lang: "16 Official Languages" },
    "Zambia": { capital: "Lusaka", lang: "English" },

    "DR Congo": { capital: "Kinshasa", lang: "French" },
    "Republic of the Congo": { capital: "Brazzaville", lang: "French" },
    "Gabon": { capital: "Libreville", lang: "French" },
    "Equatorial Guinea": { capital: "Malabo", lang: "Spanish, French, Portuguese" },
    "São Tomé and Príncipe": { capital: "São Tomé", lang: "Portuguese" },
    "Central African Republic": { capital: "Bangui", lang: "Sango, French" },
    "Chad": { capital: "N'Djamena", lang: "Arabic, French" },
    "Cameroon": { capital: "Yaoundé", lang: "French, English" },

    "Nigeria": { capital: "Abuja", lang: "English" },
    "Mali": { capital: "Bamako", lang: "French" },
    "Niger": { capital: "Niamey", lang: "French" },
    "Mauritania": { capital: "Nouakchott", lang: "Arabic" },
    "Cape Verde": { capital: "Praia", lang: "Portuguese" },
    "Senegal": { capital: "Dakar", lang: "French" },
    "Gambia": { capital: "Banjul", lang: "English" },
    "Guinea-Bissau": { capital: "Bissau", lang: "Portuguese" },
    "Guinea": { capital: "Conakry", lang: "French" },
    "Sierra Leone": { capital: "Freetown", lang: "English" },
    "Liberia": { capital: "Monrovia", lang: "English" },
    "Ivory Coast": { capital: "Yamoussoukro", lang: "French" },
    "Burkina Faso": { capital: "Ouagadougou", lang: "French" },
    "Ghana": { capital: "Accra", lang: "English" },
    "Togo": { capital: "Lomé", lang: "French" },
    "Benin": { capital: "Porto-Novo", lang: "French" }
  };

  for (const [region, countriesList] of Object.entries(regionsData)) {
    for (const apiName of countriesList) {
      count++;
      let mappedName = topoJsonMap[apiName] || apiName;
      let id = mappedName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      
      let detailed = detailedCountriesMap[id];
      let facts = countryFacts[apiName] || { capital: "N/A", lang: "N/A" };
      
      let pop = "Various";
      let capital = facts.capital;
      let lang = facts.lang;

      let dynamicImage = `https://loremflickr.com/1200/800/${encodeURIComponent(apiName)},landscape/all`;
      let dynamicGeoImage = `https://loremflickr.com/800/600/${encodeURIComponent(apiName)},nature/all`;

      let tagline = detailed ? detailed.tagline : `Heart of ${region}`;
      let desc = detailed ? detailed.description : `Discover the untamed beauty and rich cultural heritage of ${mappedName}, a remarkable destination in ${region}.`;
      let image = detailed ? detailed.image : dynamicImage;
      let geoImage = detailed ? detailed.geographyImage : dynamicGeoImage;
      
      let geoText1 = detailed ? detailed.geographyText[0].replace(/'/g, "\\'") : `${mappedName} features diverse landscapes that define the beautiful ${region} region.`;
      let geoText2 = detailed ? detailed.geographyText[1].replace(/'/g, "\\'") : `From bustling cities to tranquil nature reserves, the geography of ${mappedName} is truly awe-inspiring.`;
      
      let cult1Title = detailed ? detailed.cultureFeatures[0].title.replace(/'/g, "\\'") : "Rich Heritage";
      let cult1Desc = detailed ? detailed.cultureFeatures[0].description.replace(/'/g, "\\'") : `Experience the deep-rooted traditions and vibrant lifestyles of the people in ${mappedName}.`;
      let cult1Icon = detailed ? detailed.cultureFeatures[0].icon : "users";

      let cult2Title = detailed ? detailed.cultureFeatures[1].title.replace(/'/g, "\\'") : "Art & Music";
      let cult2Desc = detailed ? detailed.cultureFeatures[1].description.replace(/'/g, "\\'") : `The local art and music scene reflects a unique blend of historical influences and modern creativity.`;
      let cult2Icon = detailed ? detailed.cultureFeatures[1].icon : "paint";

      tsContent += `  {
    id: "${id}",
    name: "${mappedName.replace(/"/g, '\\"')}",
    tagline: "${tagline.replace(/"/g, '\\"')}",
    description: "${desc.replace(/"/g, '\\"')}",
    image: "${image}",
    highlights: ["Nature", "Culture", "History"],
    capital: "${capital.replace(/"/g, '\\"')}",
    language: "${lang.replace(/"/g, '\\"')}",
    population: "${pop}",
    region: "${region}",
    geographyImage: "${geoImage}",
    geographyText: [
      "${geoText1.replace(/"/g, '\\"')}",
      "${geoText2.replace(/"/g, '\\"')}"
    ],
    cultureFeatures: [
      { title: "${cult1Title.replace(/"/g, '\\"')}", description: "${cult1Desc.replace(/"/g, '\\"')}", icon: "${cult1Icon}" },
      { title: "${cult2Title.replace(/"/g, '\\"')}", description: "${cult2Desc.replace(/"/g, '\\"')}", icon: "${cult2Icon}" }
    ]
  },
`;
    }
  }

  tsContent += `];\n`;

  const outPath = path.join(process.cwd(), "lib", "countries.ts");
  fs.writeFileSync(outPath, tsContent);
  console.log(`Successfully wrote ${count} countries to ${outPath}`);
}

generate();
