// Commodity intelligence directory.
// Evidence governance: status reflects MASAR's dossier state, never an
// unverified trading claim. No "active" corridor commodity is published
// until a verified transaction record exists.

export const COMMODITY_STATUS = {
  ACTIVE: {
    key: "ACTIVE",
    label: "Active corridor coverage",
    tone: "success",
    description:
      "Commodities transacted through the MASAR workflow with completed, verified transaction records.",
  },
  VALIDATION: {
    key: "VALIDATION",
    label: "Under validation",
    tone: "warning",
    description:
      "Commodities for which MASAR is actively validating origin supply, Saudi demand and compliance pathways.",
  },
  INTELLIGENCE: {
    key: "INTELLIGENCE",
    label: "Market intelligence",
    tone: "muted",
    description:
      "Commodities tracked through market intelligence, without a validated end-to-end corridor workflow.",
  },
  FUTURE: {
    key: "FUTURE",
    label: "Future opportunity",
    tone: "gold",
    description:
      "Potential corridor commodities identified for later validation. No coverage is implied.",
  },
};

export const commodities = [
  {
    slug: "sesame",
    name: "Sesame",
    scientific: "Sesamum indicum",
    icon: "grain",
    status: "VALIDATION",
    origins: ["Jigawa", "Kano", "Benue", "Nasawara", "Yobe"],
    summary:
      "Nigeria is among the world's largest sesame exporters. White and brown sesame grades flow to food manufacturers, confectionery, tahini producers and oil processors across the Gulf.",
    saudiDemand:
      "Sesame is used in bakery, confectionery, tahini and halawa production and in traditional foods. Demand is quality- and consistency-sensitive, with documented preference for clean, low-impurity, well-graded seed.",
    seasonality:
      "Main harvest and aggregation window: late September to January, with carry-over stock traded into the second quarter.",
    logistics:
      "Dry container export in food-grade pp/jute bags, typically via Lagos ports or regional transhipment. Moisture and contamination control are central to transit quality.",
    risks: [
      "Moisture and admixture (foreign matter, discoloured seed)",
      "Aflatoxin and contamination handling at aggregation",
      "Inconsistent grading between lots",
      "Phytosanitary and food-import documentation gaps",
    ],
    dossier: true,
  },
  {
    slug: "cashew",
    name: "Cashew",
    scientific: "Anacardium occidentale",
    icon: "grain",
    status: "VALIDATION",
    origins: ["Oyo", "Ogun", "Kogi", "Benue", "Enugu", "Edo"],
    summary:
      "Nigeria is a major raw cashew nut origin. Exports are dominated by raw cashew nuts for overseas processing; kernels and processed forms represent a developing value-add opportunity.",
    saudiDemand:
      "Demand centres on processed cashew kernels for retail, snacking and food processing. Kernel supply chains typically require processing, food-safety evidence and consistent sizing.",
    seasonality: "Main harvest: February to June, with peak aggregation March–May.",
    logistics: "Raw nuts move in jute/pp bags in dry containers; kernel trade requires packing, moisture control and shelf-life documentation.",
    risks: ["Kernel yield variability", "Moisture and mould risk", "Processing bottlenecks for kernels", "Specification mismatch for retail grades"],
    dossier: true,
  },
  {
    slug: "ginger",
    name: "Ginger",
    scientific: "Zingiber officinale",
    icon: "leaf",
    status: "VALIDATION",
    origins: ["Kaduna", "Plateau", "Gombe", "Benue"],
    summary:
      "Nigerian ginger — fresh, split and dried — is recognized for high oleoresin and pungency. Trade into the Gulf serves spice traders, processors and food manufacturers.",
    saudiDemand:
      "Dried split ginger and ginger powder feed spice blending and food processing; buyers focus on cleanliness, moisture, microbiological profile and oleoresin content.",
    seasonality: "Harvest: October to December; drying and processing continue into Q1.",
    logistics: "Dried ginger requires moisture-controlled packing to prevent mould and caking during sea freight.",
    risks: ["Moisture and mould", "Adulteration and origin grading", "Microbiological limits", "Documentation of processing conditions"],
    dossier: true,
  },
  {
    slug: "hibiscus",
    name: "Hibiscus (zobo)",
    scientific: "Hibiscus sabdariffa",
    icon: "leaf",
    status: "VALIDATION",
    origins: ["Kano", "Jigawa", "Katsina", "Bauchi", "Sokoto"],
    summary:
      "Dried red hibiscus calyces from northern Nigeria serve beverage and herbal-infusion markets, with established demand channels through Middle East traders.",
    saudiDemand:
      "Used in beverages and infusions, especially in warmer months and around religious calendar periods. Buyers emphasize colour, cleanliness, moisture and absence of extraneous matter.",
    seasonality: "Harvest and drying: October to January.",
    logistics: "Light, dry cargo requiring clean packing, moisture protection and odour segregation in transit.",
    risks: ["Moisture re-absorption", "Foreign matter and stem content", "Colour-grade inconsistency", "Phytosanitary clearance"],
    dossier: true,
  },
  {
    slug: "gum-arabic",
    name: "Gum Arabic",
    scientific: "Acacia senegal / seyal",
    icon: "leaf",
    status: "VALIDATION",
    origins: ["Yobe", "Borno", "Jigawa", "Sokoto", "Adamawa"],
    summary:
      "Nigeria is a significant gum arabic origin (Acacia senegal and Acacia seyal grades), used globally in confectionery, beverages, pharmaceuticals and industrial applications.",
    saudiDemand:
      "Food, confectionery and beverage manufacturers use gum arabic as an emulsifier and stabilizer; grade identity (hashab vs. talha) and cleanliness determine acceptance.",
    seasonality: "Tapping and collection across the dry season, roughly November to May.",
    logistics: "Exported as cleaned dried exudate in bags; requires clear grade identity and contamination control.",
    risks: ["Grade misidentification (senegal vs seyal)", "Adulteration", "Particulate contamination", "Inconsistent cleaning and sizing"],
    dossier: true,
  },
  {
    slug: "shea",
    name: "Shea",
    scientific: "Vitellaria paradoxa",
    icon: "leaf",
    status: "VALIDATION",
    origins: ["Kwara", "Niger", "Kogi", "Oyo", "Plateau"],
    summary:
      "Shea nuts and shea butter connect West African collection networks to cosmetics, confectionery and cocoa-butter-equivalent markets. Gulf demand is niche but quality-led.",
    saudiDemand:
      "Interest from cosmetics manufacturing, personal care and food processors; refined, deodorized butter with documented quality parameters is preferred.",
    seasonality: "Collection and primary processing: May to September.",
    logistics: "Butter moves in food-grade packaging with melting-point considerations in high-temperature transit.",
    risks: ["Processing hygiene and free fatty acid levels", "Contaminants and PAH considerations", "Grade consistency", "Smallholder aggregation quality"],
    dossier: true,
  },
  {
    slug: "groundnuts",
    name: "Groundnuts",
    scientific: "Arachis hypogaea",
    icon: "grain",
    status: "VALIDATION",
    origins: ["Kano", "Sokoto", "Zamfara", "Katsina", "Taraba"],
    summary:
      "Groundnuts and groundnut products have deep historical significance in Nigerian agriculture and regional trade, with oil, snack and confectionery applications.",
    saudiDemand:
      "Edible groundnut and product specifications focus on oil quality, aflatoxin management, moisture and freedom from contamination — stringent in food-import markets.",
    seasonality: "Harvest: September to November, with trade through the dry season.",
    logistics: "Dry bagged container movement; moisture management is decisive for aflatoxin risk.",
    risks: ["Aflatoxin controls", "Moisture and mould", "Oil-grade specifications", "Laboratory evidence requirements"],
    dossier: true,
  },
  { slug: "soy", name: "Soy", scientific: "Glycine max", icon: "leaf", status: "INTELLIGENCE", origins: ["Benue", "Kaduna", "Nasarawa", "Oyo"], summary: "Growing Nigerian production serving animal feed, edible oil and food processing; Gulf trade pathways are under evaluation.", seasonality: "Rainfed harvest around October–November.", logistics: "Bulk or bagged dry movement.", risks: ["Supply consistency", "GMO and documentation expectations", "Price linkage to global markets"], dossier: false },
  { slug: "cocoa", name: "Cocoa", scientific: "Theobroma cacao", icon: "bean", status: "INTELLIGENCE", origins: ["Ondo", "Cross River", "Edo", "Osun", "Ogun"], summary: "Nigeria's traditional export strength. Saudi demand is limited relative to processing markets; corridor relevance tracked via re-export and processing channels.", seasonality: "Main crop October–January; light crop April–June.", logistics: "Bagged beans in dry containers with quality certification.", risks: ["Quality grading", "Fermentation consistency", "Destination demand depth"], dossier: false },
  { slug: "coffee", name: "Coffee", scientific: "Coffea canephora / arabica", icon: "bean", status: "INTELLIGENCE", origins: ["Cross River", "Taraba", "Plateau", "Oyo"], summary: "Small but developing Nigerian coffee output, primarily robusta, with emerging specialty interest.", seasonality: "Harvest November–February depending on zone.", logistics: "Bagged green coffee with moisture and defect grading.", risks: ["Smallholder consistency", "Traceability expectations", "Certification requirements"], dossier: false },
  { slug: "fonio", name: "Fonio", scientific: "Digitaria exilis", icon: "grain", status: "INTELLIGENCE", origins: ["Plateau", "Niger", "Kebbi", "Zamfara"], summary: "An ancient, gluten-free West African grain with emerging international health-food interest; Gulf awareness is at an early stage.", seasonality: "Rainfed harvest late summer.", logistics: "Cleaning and milling quality define export readiness.", risks: ["Demand awareness", "Processing and shelf life", "Scale of consistent supply"], dossier: false },
  { slug: "millet", name: "Millet", scientific: "Pennisetum glaucum", icon: "grain", status: "INTELLIGENCE", origins: ["Sokoto", "Borno", "Jigawa", "Kano"], summary: "A drought-tolerant staple of the Sahel with regional trade flows and potential specialty/grain-food channels into Gulf markets.", seasonality: "Dry-season trade following late-summer harvest.", logistics: "Bulk/bagged dry grain movement.", risks: ["Contamination and cleaning", "Specification definition", "Buyer awareness"], dossier: false },
  { slug: "sorghum", name: "Sorghum", scientific: "Sorghum bicolor", icon: "grain", status: "INTELLIGENCE", origins: ["Borno", "Sokoto", "Zamfara", "Kano"], summary: "Widely cultivated dual-purpose grain for food and feed; corridor relevance tied to feed manufacturing and food-grade channels.", seasonality: "Harvest September–November.", logistics: "Bulk/bagged movement; moisture control.", risks: ["Grade differentiation", "Feed vs. food specifications", "Volume consistency"], dossier: false },
  { slug: "maize", name: "Maize", scientific: "Zea mays", icon: "grain", status: "INTELLIGENCE", origins: ["Kaduna", "Niger", "Oyo", "Borno"], summary: "Large domestic and regional market; export windows depend on seasonal surplus and aflatoxin management.", seasonality: "Rainfed harvest September–October.", logistics: "Bulk/bagged dry movement.", risks: ["Aflatoxin", "Moisture", "Regional demand competition"], dossier: false },
  { slug: "cowpeas", name: "Cowpeas", scientific: "Vigna unguiculata", icon: "grain", status: "INTELLIGENCE", origins: ["Borno", "Sokoto", "Zamfara", "Kano"], summary: "A protein staple across West African and Sahelian diets with established regional trade and diaspora-market demand.", seasonality: "Dry-season trade following harvest.", logistics: "Bagged dry movement with pest-management considerations.", risks: ["Weevil and storage damage", "Moisture", "Phytosanitary treatment requirements"], dossier: false },
  { slug: "beans", name: "Beans", scientific: "Phaseolus / Vigna spp.", icon: "grain", status: "INTELLIGENCE", origins: ["Borno", "Plateau", "Niger", "Adamawa"], summary: "Multiple bean types with regional and diaspora demand; export specifications and cleaning standards determine market access.", seasonality: "Seasonal supply following rains.", logistics: "Bagged dry movement.", risks: ["Storage pests", "Cleaning and sorting", "Moisture"], dossier: false },
  { slug: "spices", name: "Spices", scientific: "Various", icon: "leaf", status: "INTELLIGENCE", origins: ["Northern and Middle Belt states"], summary: "A basket including turmeric, chilli, cloves and other culinary spices, largely traded through regional spice merchants.", seasonality: "Commodity-specific seasons.", logistics: "Dry, moisture-protected packing; microbiological evidence for processed markets.", risks: ["Specification fragmentation", "Contaminant limits", "Processing standards"], dossier: false },
  { slug: "dried-fruits", name: "Dried fruits", scientific: "Various", icon: "leaf", status: "INTELLIGENCE", origins: ["Multiple"], summary: "Dates, dried mango, pineapple and tropical dried fruits — including processing linkages between West African supply and Gulf consumption patterns.", seasonality: "Commodity-specific seasons.", logistics: "Moisture-controlled, food-grade packaging with shelf-life evidence.", risks: ["Processing hygiene", "Preservative and labelling requirements", "Shelf-life evidence"], dossier: false },
  { slug: "other", name: "Other verified agricultural products", scientific: "", icon: "grid", status: "FUTURE", origins: [], summary: "MASAR evaluates additional evidence-supported agricultural categories as buyer demand and qualified supply emerge. Categories are published only after validation.", seasonality: "", logistics: "", risks: [], dossier: false },
];

export function getCommodity(slug) {
  return commodities.find((c) => c.slug === slug);
}

export const sesameDossier = {
  overview:
    "Sesame (Sesamum indicum) is one of Nigeria's principal agricultural export crops and a strong candidate for a quality-led corridor into Saudi Arabia. The crop is aggregated in major producing states and exported as natural (white) and brown/black seed for crushing, tahini, confectionery and bakery applications.",
  buyerProfiles: [
    "Food manufacturers using sesame in bakery, snacks and confectionery",
    "Tahini and halawa producers",
    "Spice and ingredient distributors supplying food service and retail",
    "Edible-oil crushers and processors",
  ],
  qualityRequirements: [
    "Agreed grade (e.g. natural white / brown), purity and admixture limits",
    "Moisture content within contract specification",
    "Foreign matter and discoloured/damaged seed limits",
    "Oil content where commercially relevant",
    "Aflatoxin, pesticide-residue and microbiological expectations aligned to Saudi food-import requirements",
    "Consistent packing, marking and lot identification",
  ],
  typicalDocumentation: [
    "Commercial contract and proforma/commercial invoice",
    "Packing list",
    "Phytosanitary certificate from the origin authority",
    "Certificate of origin",
    "Bill of lading / transport document",
    "Independent inspection and sampling report",
    "Laboratory analysis where required by the buyer or product category",
    "Saudi import-side clearance documentation (per importer and product requirements)",
  ],
  inspectionConsiderations: [
    "Sampling at aggregation and pre-shipment against the agreed specification",
    "Independent laboratory testing for moisture, admixture and contaminants where specified",
    "Loading supervision with photographic and documentary evidence",
    "Lot traceability from origin aggregation through stuffing",
  ],
  masarOpportunity:
    "MASAR is validating an end-to-end sesame workflow: buyer qualification in Saudi Arabia, supplier capability verification in Nigeria, aligned grading and documentation, independent inspection evidence, and controlled transaction stages from agreement through delivery and record.",
  evidence: {
    status: "SECONDARY",
    sources: [
      "Nigerian Export Promotion Council (NEPC) commodity profiles",
      "International Trade Centre (ITC) Trade Map product series",
      "Saudi food-import authority guidance (SFDA) — verify current requirements per shipment",
    ],
    lastUpdated: "2026-09-01",
    note: "Qualitative dossier compiled from secondary and official sources. MASAR does not publish unverified pricing or transaction volumes.",
  },
};
