export const FLAGSHIP = {
  slug: "nigeria-saudi",
  origin: { name: "Nigeria", capital: "Abuja", hubs: ["Lagos", "Kano"] },
  destination: { name: "Saudi Arabia", hubs: ["Jeddah", "Riyadh", "Dammam"] },
  whyNigeria: [
    "One of Africa's largest agricultural economies, with established production and aggregation of sesame, cashew, ginger, hibiscus and gum arabic.",
    "Recognized export ecosystems including the NEPC, export processing structures and organized commodity associations.",
    "Origin depth in producing states, from northern aggregation hubs to southern processing and port networks.",
    "Existing maritime trade links through Lagos ports and regional transhipment pathways.",
  ],
  whySaudi: [
    "A large, import-dependent food market driven by population, urbanization and food-security strategy.",
    "Sophisticated import, distribution and retail ecosystems across Riyadh, Jeddah and Dammam.",
    "Institutional food-import governance, including the Saudi Food & Drug Authority (SFDA) framework and national customs/clearance systems.",
    "Demand for consistent-quality agricultural inputs for processing, food service and retail.",
  ],
  challenges: [
    { t: "Quality", d: "Grades vary between lots and origins; buyers need independent evidence of specification.", r: "Agreed specifications and pre-shipment inspection." },
    { t: "Documentation", d: "Export and import documents are fragmented and often assembled late.", r: "A document workflow built before cargo moves." },
    { t: "Logistics", d: "Inland movement, port handling and transhipment introduce cost and delay risk.", r: "Qualified logistics partners coordinated within the transaction." },
    { t: "Compliance", d: "Saudi food-import requirements demand product documentation, labeling and conformity evidence.", r: "Compliance gates mapped to official Saudi requirements." },
    { t: "Buyer discovery", d: "Suppliers struggle to identify genuine, qualified buyers beyond intermediaries.", r: "Buyer intelligence and requirement validation." },
    { t: "Payment", d: "Trust gaps make payment terms and settlement between strangers difficult.", r: "Controlled milestones and financeable evidence, with payments handled by counterparties and banks." },
    { t: "Trust", d: "Without shared history, each party fears non-performance.", r: "Verification, evidence and repeat-transaction records." },
  ],
  commodityOpportunities: ["sesame", "cashew", "ginger", "hibiscus", "gum-arabic", "shea", "groundnuts"],
  masarRole:
    "MASAR inserts the missing transaction layer: verifying buyer and supplier, fixing specifications, coordinating compliance and independent inspection, managing milestones, gating release and assembling the evidence record. Partners perform laboratory testing, logistics, insurance and financial services within the controlled workflow.",
  compliance: [
    "Saudi food imports are subject to SFDA requirements, including product registration/listing as applicable, labeling in Arabic and conformity procedures that vary by product.",
    "Clearance runs through national import systems (including FASAH) and Saudi Customs; requirements depend on the product, importer status and shipment structure.",
    "Origin-side export requires national export documentation, phytosanitary certification for applicable plant products and certificates of origin.",
    "Requirements change and must be verified per shipment against the relevant official authority.",
  ],
  evidence: {
    status: "SECONDARY",
    sources: [
      "Saudi Food & Drug Authority (SFDA) public guidance",
      "Saudi Customs / FASAH public information",
      "Nigerian Export Promotion Council (NEPC) commodity information",
      "International Trade Centre (ITC) market data",
    ],
    lastUpdated: "2026-09-01",
  },
};

export const FUTURE_CORRIDORS = [
  { name: "Senegal / Mali → Saudi Arabia", focus: "Groundnuts, sesame, gum arabic", state: "TARGET" },
  { name: "Tanzania → GCC", focus: "Pulses, oilseeds, spices", state: "TARGET" },
  { name: "Sudan → Saudi Arabia", focus: "Oilseeds, gum arabic, hibiscus", state: "TARGET" },
  { name: "Ethiopia → GCC", focus: "Coffee, oilseeds, pulses", state: "TARGET" },
  { name: "West Africa → UAE / Qatar", focus: "Cashew, sesame, dried foods", state: "TARGET" },
  { name: "Kenya → GCC", focus: "Coffee, tea, legumes, avocados", state: "TARGET" },
];
