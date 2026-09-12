import { pageMeta } from "@/lib/seo";
import {
  PageHero,
  Section,
  SectionHeader,
  GlassCard,
  LinkButton,
  CheckList,
  Disclaim,
  EvidenceTag,
} from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Icon from "@/components/icons";
import Image from "next/image";
import CTASection from "@/components/CTASection";

export const metadata = pageMeta({
  title: "Compliance center — compliance before cargo",
  path: "/compliance",
  description:
    "Saudi food-import requirements, Nigerian export documentation, origin, customs, inspection, product documentation and a compliance checklist for the Nigeria–Saudi Arabia corridor. Operational guidance, not legal advice.",
});

const SAUDI = [
  { t: "SFDA framework", d: "Food imports operate under Saudi Food & Drug Authority requirements, including product registration/listing where applicable and defined food-safety and labeling conditions." },
  { t: "Labeling", d: "Arabic-language labeling obligations apply to food products, with rules on ingredient, origin, date and nutrition presentation that vary by product form." },
  { t: "Conformity", d: "Conformity and certification expectations differ by commodity, processing level and importer status; they must be confirmed per shipment." },
  { t: "Clearance", d: "Clearance is coordinated through national import systems including FASAH and Saudi Customs (ZATCA), with documentation presented at the port of entry." },
  { t: "Special categories", d: "Processed, packaged, animal-origin or halal-relevant products carry additional requirements beyond raw agricultural commodities." },
];

const NIGERIA = [
  { t: "Exporter registration", d: "Exporters register through the Nigerian Export Promotion Council framework, the anchor for formal agricultural export activity." },
  { t: "Phytosanitary", d: "Plant and plant-product exports require phytosanitary certification through the Nigerian Agricultural Quarantine Service where applicable." },
  { t: "Customs", d: "Formal export processing proceeds through Nigeria Customs with the appropriate commercial and transport documentation." },
  { t: "Origin", d: "Certificates of origin are issued through the recognized chamber/trade documentation system." },
  { t: "Regulated products", d: "Processed or regulated food products may engage NAFDAC or additional agency requirements depending on the product." },
];

const DOC_ROWS = [
  { doc: "Proforma / commercial contract", side: "Both parties", stage: "Commercial agreement" },
  { doc: "Commercial invoice & packing list", side: "Exporter", stage: "Pre-shipment" },
  { doc: "Certificate of origin", side: "Origin authority / chamber", stage: "Pre-shipment" },
  { doc: "Phytosanitary certificate", side: "Origin quarantine authority", stage: "Pre-shipment" },
  { doc: "Inspection / sampling report", side: "Independent inspection partner", stage: "Evidence" },
  { doc: "Laboratory analysis", side: "Qualified laboratory", stage: "Evidence, where required" },
  { doc: "Bill of lading / transport document", side: "Carrier / forwarder", stage: "Shipment" },
  { doc: "Import-side registration & conformity", side: "Importer / destination", stage: "Clearance" },
];

const WORKFLOW = [
  { t: "Identify the applicable regime", d: "By commodity, processing level, importer status and destination port." },
  { t: "Fix the specification", d: "Grade, tolerances, packing, marking and labeling agreed in the contract." },
  { t: "Open the document checklist", d: "Each document has an owner, an issuing party and a deadline." },
  { t: "Verify the counterparties", d: "Exporter and importer standing confirmed before cargo is prepared." },
  { t: "Commission evidence", d: "Sampling, inspection and laboratory work scheduled before shipment." },
  { t: "Assemble the export package", d: "Origin, phytosanitary, commercial and transport documents completed." },
  { t: "Prepare destination clearance", d: "Registration/listing, conformity and Arabic labeling confirmed." },
  { t: "Gate release on evidence", d: "Shipment proceeds only when the defined conditions are satisfied and recorded." },
];

const BUYER_CHECK = [
  "Import registration and listing status for the product confirmed",
  "Arabic labeling requirements specified to the supplier",
  "Conformity and certification expectations documented",
  "Inspection scope and laboratory parameters agreed",
  "Destination port and clearance pathway identified",
];
const SUPPLIER_CHECK = [
  "Exporter registration complete and current",
  "Phytosanitary pathway confirmed for the commodity",
  "Origin documentation available",
  "Capability to meet packing, marking and labeling requirements",
  "Inspection access and sampling procedures agreed",
];

export default function CompliancePage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Compliance" }]}
        eyebrow="Compliance center"
        title={<>Compliance <span className="text-gradient-gold">before cargo.</span></>}
        lead="Compliance at MASAR is a workflow sequenced into every transaction: requirements identified early, documents owned and dated, evidence collected before shipment and destination clearance prepared in parallel with origin work."
      >
        <LinkButton href="/buyers/request">Start a compliant transaction</LinkButton>
        <LinkButton href="/inspection" variant="ghost">Inspection & evidence</LinkButton>
      </PageHero>

      <Section className="!pt-4">
        <Reveal>
          <SectionHeader
            eyebrow="Why compliance matters"
            title="Late documentation is where corridor trade fails."
            lead="Compliance failures are rarely regulatory technicalities — they are sequencing failures discovered at the port, after costs are already incurred."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: "ship", t: "Cargo delay", d: "Missing certificates or conformity evidence hold goods at origin or destination." },
            { icon: "xCircle", t: "Rejection risk", d: "Specification, labeling or contamination failures can make goods unlandable." },
            { icon: "bank", t: "Settlement friction", d: "Banks and buyers cannot complete against incomplete documentary evidence." },
            { icon: "shield", t: "Lost repeat trade", d: "A single failed shipment removes a buyer from an exporter's future." },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.05}>
              <GlassCard hover className="h-full !p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-danger/30 bg-danger/10 text-danger">
                  <Icon name={c.icon} size={19} />
                </span>
                <h3 className="mt-4 text-sm font-bold text-ink">{c.t}</h3>
                <p className="mt-1.5 text-xs leading-5 text-muted">{c.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <GlassCard level={4} className="h-full">
              <p className="eyebrow">Destination</p>
              <h2 className="h-display text-2xl font-bold text-ink">Saudi food-import requirements</h2>
              <div className="mt-6 space-y-5">
                {SAUDI.map((s) => (
                  <div key={s.t} className="flex gap-3">
                    <Icon name="stamp" size={18} className="mt-1 flex-none text-gold-500" />
                    <div>
                      <h3 className="text-sm font-bold text-ink">{s.t}</h3>
                      <p className="mt-1 text-[0.83rem] leading-6 text-muted">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard level={4} className="h-full">
              <p className="eyebrow">Origin</p>
              <h2 className="h-display text-2xl font-bold text-ink">Nigerian export requirements</h2>
              <div className="mt-6 space-y-5">
                {NIGERIA.map((s) => (
                  <div key={s.t} className="flex gap-3">
                    <Icon name="leaf" size={18} className="mt-1 flex-none text-gold-500" />
                    <div>
                      <h3 className="text-sm font-bold text-ink">{s.t}</h3>
                      <p className="mt-1 text-[0.83rem] leading-6 text-muted">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader eyebrow="Product documentation" title="The core corridor document set." />
        </Reveal>
        <Reveal className="mt-8">
          <GlassCard>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Document</th>
                    <th>Responsible party</th>
                    <th>Transaction stage</th>
                  </tr>
                </thead>
                <tbody>
                  {DOC_ROWS.map((r) => (
                    <tr key={r.doc}>
                      <td className="font-medium text-ink">{r.doc}</td>
                      <td className="text-muted">{r.side}</td>
                      <td><span className="pill !normal-case !tracking-normal">{r.stage}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="Documentation workflow"
            title="Eight steps, sequenced before movement."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {WORKFLOW.map((w, i) => (
            <Reveal key={w.t} delay={(i % 4) * 0.05}>
              <GlassCard hover className="h-full">
                <span className="font-mono text-xs tracking-widest text-gold-500">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-sm font-bold text-ink">{w.t}</h3>
                <p className="mt-1.5 text-xs leading-5 text-muted">{w.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard>
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                <Icon name="bank" size={18} className="text-gold-500" /> Buyer checklist
              </h2>
              <CheckList items={BUYER_CHECK} className="mt-5" />
            </GlassCard>
          </Reveal>
          <Reveal delay={0.08}>
            <GlassCard>
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                <Icon name="factory" size={18} className="text-gold-500" /> Supplier checklist
              </h2>
              <CheckList items={SUPPLIER_CHECK} className="mt-5" tone="text-success" />
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-start">
          <Reveal>
            <figure className="glass overflow-hidden rounded-2xl">
              <div className="relative aspect-[16/9]">
                <Image src="/images/inspection-lab.jpg" alt="Sampling and laboratory testing of agricultural commodities." fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
              </div>
              <figcaption className="px-5 py-3.5 text-xs text-muted">
                Independent inspection and laboratory evidence feed the compliance workflow before cargo moves.
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <Disclaim title="Important — operational guidance">
              <p>
                Requirements vary by commodity, destination, importer status and transaction
                structure. Information provided by MASAR is for operational guidance and does not
                replace advice from the relevant authorities or qualified professionals.
              </p>
              <p className="mt-2">
                Always confirm current requirements with the Saudi Food &amp; Drug Authority,
                Saudi Customs/FASAH, the Nigerian Export Promotion Council, the Nigerian
                Agricultural Quarantine Service and other competent bodies for each shipment.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <EvidenceTag status="SECONDARY" />
                <span className="text-xs">Last reviewed: 2026-09-01</span>
              </div>
            </Disclaim>
          </Reveal>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
