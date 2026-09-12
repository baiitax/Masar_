export const INSIGHT_CATEGORIES = [
  { key: "saudi-market", label: "Saudi market" },
  { key: "nigeria-market", label: "Nigeria market" },
  { key: "commodity-intelligence", label: "Commodity intelligence" },
  { key: "compliance", label: "Trade compliance" },
  { key: "logistics", label: "Logistics" },
  { key: "education", label: "Export education" },
  { key: "buyer-insights", label: "Buyer insights" },
  { key: "research", label: "MASAR research" },
];

export const articles = [
  {
    slug: "sesame-corridor-brief",
    title: "Sesame from Nigeria to Saudi Arabia: a corridor intelligence brief",
    category: "commodity-intelligence",
    categoryLabel: "Commodity intelligence",
    excerpt:
      "Why sesame is one of the strongest candidate products on the Nigeria–Saudi corridor — and where quality, documentation and inspection decide whether a transaction completes.",
    date: "2026-09-02",
    modified: "2026-09-10",
    author: "MASAR Trade Intelligence Desk",
    readingTime: "7 min read",
    image: "/images/origin-nigeria.jpg",
    alt: "Sacks of aggregated sesame in a Nigerian commodity warehouse, warm light through warehouse openings.",
    sources: [
      "Nigerian Export Promotion Council (NEPC), sesame commodity profile",
      "International Trade Centre (ITC) Trade Map, sesame (HS 120740) series",
      "Saudi Food & Drug Authority (SFDA), food import guidance",
    ],
    sections: [
      { h: "Why sesame", p: [
        "Sesame is one of Nigeria's most established agricultural export categories, with production concentrated in states including Jigawa, Kano, Benue and Nasarawa. On the demand side, sesame is embedded in Gulf food manufacturing — bakery, confectionery, tahini and halawa — where consistent quality and documentation matter more than the lowest spot price.",
        "That combination — established origin supply and structural, quality-sensitive demand — is what makes sesame a strong inaugural corridor candidate rather than a speculative one.",
      ] },
      { h: "Where transactions break", p: [
        "Failure points on this corridor are rarely about demand. They cluster around specification and evidence: admixture and foreign matter, moisture, discoloured seed, inconsistent grading between lots, incomplete phytosanitary documentation and uncertainty about contaminant testing expectations.",
        "When these issues surface at destination rather than at origin, the cost is not a claim alone — it is the loss of a repeat buyer.",
      ], bullets: ["Specification drift between aggregation, purchase and shipment", "Evidence arriving after cargo rather than before release", "Documentation assembled under time pressure", "No shared transaction record between buyer and supplier"] },
      { h: "The evidence-first approach", p: [
        "A controlled sesame transaction aligns grade and tolerances in writing before commitment; samples at aggregation and pre-shipment; independent laboratory testing for moisture, admixture and contaminants where the buyer or product category requires; loading supervision with photographic evidence; and a complete document package travelling with the transaction.",
        "MASAR is validating exactly this workflow — qualified Saudi demand, verified Nigerian supply and an evidence dossier at every release gate.",
      ] },
      { h: "What we are watching", p: [
        "Seasonal aggregation quality (main harvest and aggregation runs from late September into January), the tightening of Saudi product and labeling expectations, and the gap between spot-market intermediation and direct, documented buyer–supplier relationships.",
      ] },
    ],
    disclaimer:
      "Qualitative analysis based on secondary and official sources. MASAR does not publish unverified prices or volumes; current commercial pricing is available by market quotation.",
  },
  {
    slug: "how-saudi-importers-qualify-suppliers",
    title: "How Saudi food importers qualify new African suppliers",
    category: "buyer-insights",
    categoryLabel: "Buyer insights",
    excerpt:
      "The checklist a Saudi importer effectively runs on a new African origin supplier — from company credibility to conformity evidence — and what exporters can prepare in advance.",
    date: "2026-08-21",
    modified: "2026-09-05",
    author: "MASAR Trade Intelligence Desk",
    readingTime: "6 min read",
    image: "/images/saudi-distribution.jpg",
    alt: "Warehouse aisle of palletized food goods near Riyadh, with a procurement manager reviewing stock.",
    sources: [
      "Saudi Food & Drug Authority (SFDA) public guidance on imported food",
      "Saudi customs / FASAH clearance documentation guidance",
      "Interviews and public procurement documentation patterns from Gulf importers",
    ],
    sections: [
      { h: "Qualification is evidence, not reassurance", p: [
        "A Saudi importer evaluating a new African supplier is rarely persuaded by catalogues or promises. The decision rests on evidence: a credible, verifiable company; a product that demonstrably meets the stated grade; documents that will survive clearance; and a counterparty that can perform repeatedly.",
      ] },
      { h: "The practical checklist", bullets: [
        "Verifiable company identity, registration and export standing",
        "Evidence of prior shipments or, for newer exporters, credible processing and packing capability",
        "Product specification with tolerances, packing and marking",
        "Inspection and laboratory evidence aligned to Saudi food-import expectations",
        "Phytosanitary and origin documentation appropriate to the product",
        "Labeling and conformity preparation, including Arabic labeling where applicable",
        "A clear communication and document workflow through booking and shipment",
      ]},
      { h: "What changes for exporters", p: [
        "Exporters that prepare evidence before approaching the market shorten the trust gap considerably. Registration, sample readiness, documentation discipline and willingness to accept independent inspection are the signals that separate a transaction-ready supplier from a directory listing.",
        "MASAR's exporter application is structured around exactly these dimensions — and an application is never described as verified until verification actually occurs.",
      ] },
    ],
    disclaimer:
      "Requirements vary by product, importer status and transaction structure. Verify current obligations with the competent authorities and qualified professionals.",
  },
  {
    slug: "compliance-before-cargo",
    title: "Compliance before cargo: documentation that travels with the transaction",
    category: "compliance",
    categoryLabel: "Trade compliance",
    excerpt:
      "Compliance on the Saudi–Africa corridor is a workflow, not a paperwork scramble at the port. A practical look at building the document package before goods move.",
    date: "2026-08-08",
    modified: "2026-09-01",
    author: "MASAR Trade Intelligence Desk",
    readingTime: "8 min read",
    image: "/images/inspection-lab.jpg",
    alt: "Gloved hands sampling sesame seeds in a laboratory with inspection documentation on the table.",
    sources: [
      "Saudi Food & Drug Authority (SFDA) public guidance",
      "Saudi Customs and FASAH public documentation information",
      "Nigerian Export Promotion Council (NEPC) export documentation guidance",
    ],
    sections: [
      { h: "Why documents fail late", p: [
        "Documentation problems discovered near shipment or at destination are expensive and often preventable. They usually originate earlier: an unspecified product, an unconfirmed importer requirement, a missing certificate or a mismatch between what was inspected and what was loaded.",
      ] },
      { h: "The core package", bullets: [
        "Commercial documents — contract or proforma, commercial invoice and packing list",
        "Transport document — bill of lading or equivalent",
        "Certificate of origin",
        "Phytosanitary certificate for applicable plant products, issued by the origin authority",
        "Inspection and, where required, laboratory analysis reports",
        "Destination-side registration, listing, conformity and labeling elements applicable to the product and importer",
      ]},
      { h: "Build it against the timeline", p: [
        "Each document has an owner and a deadline tied to a transaction stage. MASAR sequences these into the workflow so that release gates — agreement, compliance, inspection, shipment — cannot be crossed while evidence is missing.",
        "This is operational guidance, not legal advice: requirements shift by commodity, importer status and transaction structure, and the relevant authorities remain the definitive source.",
      ] },
    ],
    disclaimer:
      "Operational guidance only; it does not replace advice from the relevant authorities or qualified professionals.",
  },
  {
    slug: "what-verified-supply-means",
    title: "What “verified supply” actually means",
    category: "research",
    categoryLabel: "MASAR research",
    excerpt:
      "Verification is one of the most over-used words in trade platforms. Here is the specific, evidence-based meaning MASAR gives it — and what it never means.",
    date: "2026-07-30",
    modified: "2026-08-29",
    author: "MASAR Trade Intelligence Desk",
    readingTime: "5 min read",
    image: "/images/processing-nigeria.jpg",
    alt: "Sesame and cashew sorting line in a West African export processing facility.",
    sources: ["MASAR verification framework"],
    sections: [
      { h: "A state, not a badge", p: [
        "On the MASAR platform, verification is a state attached to specific checks — company, identity, registration, capability, documents, inspection and history — each supported by evidence on file. A counterparty is never globally “trusted”; individual checks are verified, pending, under review or not verified.",
      ] },
      { h: "What it never means", bullets: [
        "It is not a payment or performance guarantee",
        "It is not a quality warranty across every future lot",
        "It is not a regulatory license or certification",
        "It does not replace inspection on a specific shipment",
      ]},
      { h: "Why it matters for finance", p: [
        "Banks assess transactions on evidence. Verification, inspection and a complete transaction dossier turn an opaque promise between strangers into a record that institutions can evaluate — which is why MASAR describes verified trade as financeable trade.",
      ] },
    ],
    disclaimer: "Framework statement; verification scope is defined per transaction and documented in the record.",
  },
];

export function getArticle(slug) {
  return articles.find((a) => a.slug === slug);
}
