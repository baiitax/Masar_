export const COUNTRIES = [
  "Saudi Arabia", "Nigeria", "United Arab Emirates", "Qatar", "Kuwait", "Bahrain", "Oman",
  "Egypt", "Jordan", "Turkey", "India", "Pakistan", "Bangladesh", "China", "Vietnam",
  "Thailand", "Indonesia", "Malaysia", "Kenya", "Tanzania", "Ethiopia", "Sudan",
  "Ghana", "Côte d’Ivoire", "Senegal", "Mali", "Burkina Faso", "Cameroon", "Benin",
  "Togo", "Niger", "Chad", "South Africa", "United Kingdom", "Germany", "France",
  "Netherlands", "United States", "Other",
];

export const UNITS = ["Metric tonnes (MT)", "Kilograms (kg)", "20ft container", "40ft container", "Bags", "Other"];
export const FREQUENCY = ["One-off spot purchase", "Monthly", "Quarterly", "Seasonal / annual contract", "To be discussed"];
export const ORIGINS = ["Nigeria", "Other West Africa", "East Africa", "Qualified origin — open", "Other"];
export const SOURCING = ["Direct from exporters", "Through agents / brokers", "Tenders", "Not currently importing this category", "Other"];
export const CAPACITY = ["Under 100 MT / year", "100–500 MT / year", "500–2,000 MT / year", "Over 2,000 MT / year", "To be discussed"];
export const WAREHOUSE = ["Owned warehouse", "Leased warehouse", "Third-party warehouse", "No warehouse at this stage"];
export const EXPORT_HISTORY = ["Regular exporter (multiple shipments)", "Some export shipments", "No prior exports", "Newly established"];
export const TERMS = ["EXW", "FOB", "CFR", "CIF", "DAP / DDP destination", "To be discussed"];
export const FREIGHT = ["Can arrange freight", "Require freight coordination", "Case by case"];

const EXPORTER_COMMODITIES = [
  "Sesame", "Cashew", "Ginger", "Hibiscus", "Gum Arabic", "Shea", "Groundnuts",
  "Soy", "Cocoa", "Coffee", "Fonio", "Millet", "Sorghum", "Maize", "Cowpeas", "Beans",
  "Spices", "Dried fruits", "Other",
];
const TARGET_MARKETS = ["Saudi Arabia", "UAE", "Other GCC", "Wider MENA", "Europe", "Asia", "Americas", "Other"];
const EXPORT_DOCS = [
  "Certificate of origin",
  "Phytosanitary certificate",
  "Commercial invoice & packing list",
  "Independent inspection reports",
  "Laboratory / quality test results",
  "Bill of lading experience",
  "None in place yet",
];

export const FORM_SCHEMAS = {
  buyer: {
    type: "BUYER",
    title: "Submit a buyer requirement",
    successTitle: "Requirement received",
    teams: "Saudi buyer development",
    groups: [
      {
        title: "Organization",
        fields: [
          { name: "companyName", label: "Company name", type: "text", required: true, width: "half" },
          { name: "country", label: "Country", type: "select", required: true, options: COUNTRIES, width: "half" },
          { name: "city", label: "City", type: "text", width: "half" },
          { name: "website", label: "Website", type: "url", width: "half", placeholder: "https://" },
        ],
      },
      {
        title: "Contact",
        fields: [
          { name: "contactPerson", label: "Contact person", type: "text", required: true, width: "half" },
          { name: "role", label: "Role / title", type: "text", width: "half" },
          { name: "email", label: "Business email", type: "email", required: true, width: "half" },
          { name: "phone", label: "Phone (with country code)", type: "tel", required: true, width: "half" },
        ],
      },
      {
        title: "Requirement",
        fields: [
          { name: "commodity", label: "Commodity", type: "commodity-select", required: true, width: "half" },
          { name: "grade", label: "Grade / quality standard", type: "text", width: "half", placeholder: "e.g. natural white sesame, 98/2" },
          { name: "quantity", label: "Quantity", type: "text", required: true, width: "third" },
          { name: "unit", label: "Unit", type: "select", required: true, options: UNITS, width: "third" },
          { name: "frequency", label: "Frequency", type: "select", required: true, options: FREQUENCY, width: "third" },
          { name: "deliveryPeriod", label: "Target delivery period", type: "text", width: "half", placeholder: "e.g. Q4 2026 / monthly from November" },
          { name: "preferredOrigin", label: "Preferred origin", type: "select", options: ORIGINS, width: "half" },
          { name: "packaging", label: "Packaging requirements", type: "text", width: "half" },
          { name: "destination", label: "Destination (city / port)", type: "text", width: "half" },
          { name: "certifications", label: "Certifications / conformity requirements", type: "text", width: "full" },
          { name: "currentSourcing", label: "Current sourcing method", type: "select", options: SOURCING, width: "half" },
          { name: "productSpecification", label: "Product specification", type: "textarea", required: true, width: "full", placeholder: "Describe the product, quality parameters, tolerances, labeling and any other requirements." },
          { name: "additionalRequirements", label: "Additional requirements", type: "textarea", width: "full" },
        ],
      },
    ],
    note: "MASAR may request additional verification before processing your request. Information is handled per our privacy and data-protection statements.",
  },

  exporter: {
    type: "EXPORTER",
    title: "Apply as an exporter",
    successTitle: "Application received",
    teams: "Origin operations",
    groups: [
      {
        title: "Company",
        fields: [
          { name: "legalName", label: "Legal company name", type: "text", required: true, width: "half" },
          { name: "registrationNumber", label: "Registration number", type: "text", width: "half" },
          { name: "country", label: "Country of registration", type: "select", required: true, options: COUNTRIES, width: "half" },
          { name: "location", label: "Location (city / state)", type: "text", required: true, width: "half" },
          { name: "website", label: "Website", type: "url", width: "half" },
          { name: "yearEstablished", label: "Year established", type: "text", width: "half" },
          { name: "contactPerson", label: "Contact person", type: "text", required: true, width: "half" },
          { name: "role", label: "Role / title", type: "text", width: "half" },
          { name: "email", label: "Business email", type: "email", required: true, width: "half" },
          { name: "phone", label: "Phone (with country code)", type: "tel", required: true, width: "half" },
        ],
      },
      {
        title: "Export capability",
        fields: [
          { name: "commodities", label: "Commodities you can supply", type: "checkboxes", required: true, options: EXPORTER_COMMODITIES, width: "full" },
          { name: "annualCapacity", label: "Annual export capacity", type: "select", options: CAPACITY, width: "half" },
          { name: "typicalVolume", label: "Typical available volume (MT / month)", type: "text", width: "half" },
          { name: "processingCapability", label: "Processing capability (cleaning, sorting, grading, bagging)", type: "textarea", width: "full" },
          { name: "packaging", label: "Packaging available", type: "text", width: "half" },
          { name: "warehouse", label: "Warehousing", type: "select", options: WAREHOUSE, width: "half" },
          { name: "exportHistory", label: "Export history", type: "select", options: EXPORT_HISTORY, width: "half" },
          { name: "targetMarkets", label: "Target markets", type: "checkboxes", options: TARGET_MARKETS, width: "half" },
        ],
      },
      {
        title: "Compliance & quality",
        fields: [
          { name: "certifications", label: "Certifications held (if any)", type: "textarea", width: "half", placeholder: "List only certifications actually held; do not claim unverified certification." },
          { name: "exportDocuments", label: "Export documents you can provide", type: "checkboxes", options: EXPORT_DOCS, width: "half" },
          { name: "qualitySystems", label: "Quality management practices", type: "textarea", width: "half" },
          { name: "labRelationships", label: "Laboratory / inspection relationships", type: "text", width: "half" },
        ],
      },
      {
        title: "Transaction terms",
        fields: [
          { name: "moq", label: "Minimum order quantity (MOQ)", type: "text", width: "half" },
          { name: "preferredTerms", label: "Preferred Incoterms", type: "select", options: TERMS, width: "half" },
          { name: "paymentExpectations", label: "Payment expectations (indicative)", type: "textarea", width: "half" },
          { name: "shipmentCapability", label: "Shipment capability", type: "select", options: FREIGHT, width: "half" },
        ],
      },
      {
        title: "Supporting documents (optional)",
        fields: [
          { name: "documents", label: "Upload certificate of registration, company profile or product/quality documents (PDF, JPG or PNG, up to 8 MB each)", type: "files", width: "full" },
        ],
      },
    ],
    note: "Submitting an application does not create verification. A company or capability is shown as verified only after MASAR completes the relevant checks. Documents are treated as confidential commercial information.",
  },

  partner: {
    type: "PARTNER",
    title: "Become a strategic partner",
    successTitle: "Partnership inquiry received",
    teams: "Partnerships",
    groups: [
      {
        title: "Organization",
        fields: [
          { name: "organization", label: "Organization name", type: "text", required: true, width: "half" },
          { name: "partnerType", label: "Partner category", type: "select", required: true, options: [
            "Inspection", "Logistics", "Financial institution", "Insurance", "Technology", "Regulatory ecosystem", "Trade organization", "Professional services", "Saudi distributor / processor", "Other",
          ], width: "half" },
          { name: "contactPerson", label: "Contact person", type: "text", required: true, width: "half" },
          { name: "role", label: "Role / title", type: "text", width: "half" },
          { name: "email", label: "Business email", type: "email", required: true, width: "half" },
          { name: "phone", label: "Phone", type: "tel", width: "half" },
          { name: "website", label: "Website", type: "url", width: "half" },
          { name: "markets", label: "Markets / geography served", type: "text", width: "half" },
          { name: "capabilities", label: "Capabilities relevant to the corridor", type: "textarea", required: true, width: "full" },
          { name: "message", label: "Proposed collaboration", type: "textarea", width: "full" },
        ],
      },
    ],
    note: "Partner identities and logos are published only after a relationship is verified.",
  },

  investor: {
    type: "INVESTOR",
    title: "Request strategic information",
    successTitle: "Request received",
    teams: "Strategic",
    groups: [
      {
        title: "Request",
        fields: [
          { name: "name", label: "Name", type: "text", required: true, width: "half" },
          { name: "organization", label: "Organization", type: "text", required: true, width: "half" },
          { name: "email", label: "Business email", type: "email", required: true, width: "half" },
          { name: "investorType", label: "Type", type: "select", required: true, options: ["Strategic corporate", "Institutional investor", "Fund / family office", "Trade-finance institution", "Advisor", "Other"], width: "half" },
          { name: "interest", label: "Area of interest", type: "text", width: "full", placeholder: "e.g. corridor infrastructure, trade finance, technology, geographic expansion" },
          { name: "message", label: "Message", type: "textarea", required: true, width: "full" },
        ],
      },
    ],
    note: "Confidential financial information is not published on this website. Strategic materials are shared following qualification and, where appropriate, under confidentiality.",
  },

  media: {
    type: "MEDIA",
    title: "Media inquiry",
    successTitle: "Inquiry received",
    teams: "Media",
    groups: [
      {
        title: "Inquiry",
        fields: [
          { name: "name", label: "Name", type: "text", required: true, width: "half" },
          { name: "outlet", label: "Outlet / publication", type: "text", required: true, width: "half" },
          { name: "email", label: "Email", type: "email", required: true, width: "half" },
          { name: "phone", label: "Phone", type: "tel", width: "half" },
          { name: "requestType", label: "Request type", type: "select", required: true, options: ["Interview", "Comment request", "Fact sheet", "Logo & brand assets", "Background briefing", "Other"], width: "half" },
          { name: "deadline", label: "Deadline", type: "text", width: "half" },
          { name: "message", label: "Details", type: "textarea", required: true, width: "full" },
        ],
      },
    ],
  },

  general: {
    type: "GENERAL",
    title: "Contact MASAR",
    successTitle: "Message received",
    teams: "General",
    groups: [
      {
        title: "Your details",
        fields: [
          { name: "name", label: "Name", type: "text", required: true, width: "half" },
          { name: "email", label: "Email", type: "email", required: true, width: "half" },
          { name: "company", label: "Company", type: "text", width: "half" },
          { name: "inquiryType", label: "Inquiry type", type: "select", required: true, options: ["General inquiry", "Buyer", "Exporter", "Partnership", "Media", "Investor / strategic", "Careers", "Other"], width: "half" },
          { name: "subject", label: "Subject", type: "text", required: true, width: "full" },
          { name: "message", label: "Message", type: "textarea", required: true, width: "full" },
        ],
      },
    ],
  },

  careers: {
    type: "GENERAL",
    title: "Express interest in joining MASAR",
    successTitle: "Expression received",
    teams: "People & operations",
    groups: [
      {
        title: "Your details",
        fields: [
          { name: "name", label: "Name", type: "text", required: true, width: "half" },
          { name: "email", label: "Email", type: "email", required: true, width: "half" },
          { name: "location", label: "Location", type: "text", width: "half" },
          { name: "role", label: "Team", type: "select", required: true, options: [
            "Trade Operations", "Saudi Buyer Development", "Export Operations", "Compliance",
            "Commodity Intelligence", "Technology", "Risk", "Partnerships", "Other",
          ], width: "half" },
          { name: "cv", label: "CV / résumé (PDF, up to 8 MB)", type: "files", width: "full" },
          { name: "message", label: "Why MASAR, and relevant experience", type: "textarea", required: true, width: "full" },
        ],
      },
    ],
    note: "Applications are assessed against corridor needs. No status is implied until the team responds.",
  },
};
