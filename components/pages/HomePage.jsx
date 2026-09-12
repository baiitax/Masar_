"use client";

import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/components/AppProvider";
import {
  Container,
  Section,
  Eyebrow,
  GlassCard,
  LinkButton,
  CheckList,
  StatusPill,
  EvidenceTag,
  ImageFrame,
  IconBadge,
  EmptyState,
} from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Icon from "@/components/icons";
import CorridorMap from "@/components/maps/CorridorMap";
import { StageRail } from "@/components/interactive";
import CTASection from "@/components/CTASection";
import { commodities, COMMODITY_STATUS } from "@/content/commodities";
import { FUTURE_CORRIDORS } from "@/content/corridors";

const TRUST_ICONS = ["shield", "fileCheck", "stamp", "lock", "route", "bank"];
const WHAT_ICONS = ["search", "factory", "shield", "grain", "docs", "flask", "route", "lock"];
const INTEL_ICONS = ["bank", "users", "grain", "scale", "ship", "stamp", "grid", "database"];
const PARTNER_ICONS = ["flask", "ship", "bank", "shield", "layers", "network", "scale"];

export default function HomePage() {
  const { t, dict } = useApp();
  const H = dict.home;
  const byStatus = (s) => commodities.filter((c) => c.status === s);

  return (
    <>
      {/* 1 — HERO */}
      <header className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <div aria-hidden="true" className="hero-media absolute inset-0">
          <Image
            src="/images/origin-nigeria.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 end-[-10%] h-[620px] w-[620px] rounded-full opacity-60"
          style={{ background: "radial-gradient(circle, rgba(30,81,166,0.18), transparent 65%)" }}
        />
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div>
              <Reveal>
                <StatusPill tone="gold">
                  <Icon name="route" size={13} />
                  {H.badge}
                </StatusPill>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="h-display mt-6 text-[2.6rem] font-bold leading-[1.06] text-ink sm:text-6xl">
                  {H.titlePre}
                  <span className="text-gradient-gold">{H.titleAccent}</span>
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="lead mt-6 max-w-xl text-lg">{H.subtitle}</p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-9 flex flex-wrap gap-3.5">
                  <LinkButton href="/contact" className="btn-gold" data-event='{"event":"hero_talk_click"}'>
                    {t("common.talk")}
                    <Icon name="arrow" size={16} className="rtl:rotate-180" />
                  </LinkButton>
                  <LinkButton href="/corridors/nigeria-saudi" variant="ghost" data-event='{"event":"hero_explore_click"}'>
                    {t("common.explore")}
                  </LinkButton>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-6 flex gap-6 text-sm font-semibold">
                  <Link href="/buyers" className="inline-flex items-center gap-1.5 text-muted hover:text-gold-500">
                    <Icon name="bank" size={15} /> {t("common.forBuyers")}
                  </Link>
                  <Link href="/exporters" className="inline-flex items-center gap-1.5 text-muted hover:text-gold-500">
                    <Icon name="factory" size={15} /> {t("common.forExporters")}
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.12} className="geo-visual">
              <div className="glass-strong relative overflow-hidden rounded-[1.4rem] p-2 sm:p-3 shadow-glass-lg">
                <CorridorMap className="m-0" />
                <div className="pointer-events-none absolute start-5 top-5 flex flex-col gap-2 geo-visual">
                  <span className="pill !border-white/10 !bg-navy-900/80 !text-white">
                    <span className="dot dot-gold" /> NG Origin
                  </span>
                </div>
                <div className="pointer-events-none absolute end-5 top-5 geo-visual">
                  <span className="pill !border-white/10 !bg-navy-900/80 !text-white">
                    <span className="dot dot-success" /> KSA Demand
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <StageRail stages={H.rail} className="mt-12" note={t("common.illustrative")} />
          </Reveal>
          <Reveal delay={0.24} className="mt-6">
            <div className="glass flex flex-col gap-3 rounded-2xl px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3 sm:items-center">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-gold-500/12 text-gold-500">
                  <Icon name="bank" size={17} />
                </span>
                <p className="text-sm leading-6 text-muted">
                  <span className="font-bold text-ink">{t("backed.label")}</span>
                  {" — "}
                  {t("backed.text")}
                </p>
              </div>
              <a
                href="https://kgmlimited.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-none items-center gap-1.5 text-sm font-semibold text-gold-500 hover:underline"
              >
                kgmlimited.com <Icon name="arrow" size={14} className="rtl:rotate-180" />
              </a>
            </div>
          </Reveal>
        </Container>
      </header>

      {/* 2 — TRUST STATEMENT */}
      <Section className="!py-16">
        <Reveal>
          <div className="mb-12 max-w-3xl">
            <h2 className="h-display text-2xl font-bold text-ink sm:text-4xl">{H.trust.title}</h2>
            <p className="lead mt-4">{H.trust.lead}</p>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {H.trust.items.map((item, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <GlassCard hover className="h-full">
                <IconBadge name={TRUST_ICONS[i]} />
                <h3 className="mt-4 font-display text-base font-bold text-ink">{item.t}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3 — WHAT MASAR DOES */}
      <Section className="!py-20">
        <Reveal>
          <Eyebrow>{H.what.eyebrow}</Eyebrow>
          <h2 className="h-display max-w-3xl text-3xl font-bold text-ink sm:text-[2.6rem]">{H.what.title}</h2>
          <p className="lead mt-5 max-w-3xl">{H.what.lead}</p>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {H.what.cards.map((c, i) => (
            <Reveal key={i} delay={(i % 4) * 0.04}>
              <GlassCard hover level={4} className="h-full !p-5">
                <IconBadge name={WHAT_ICONS[i]} />
                <h3 className="mt-4 text-[0.98rem] font-bold text-ink">{c.t}</h3>
                <p className="mt-2 text-[0.83rem] leading-6 text-muted">{c.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4 — WHY TRADE BREAKS */}
      <Section className="!py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <Eyebrow>{H.breaks.eyebrow}</Eyebrow>
            <h2 className="h-display text-3xl font-bold text-ink sm:text-4xl">{H.breaks.title}</h2>
            <p className="lead mt-5">{H.breaks.lead}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {H.breaks.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 rounded-xl border border-line/12 bg-line/[0.03] p-3.5 text-sm text-ink/85">
                  <Icon name="xCircle" size={18} className="mt-0.5 flex-none text-muted" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <ImageFrame
              src="/images/port-logistics.jpg"
              alt="Container port at night along the trade corridor: gantry cranes and a loaded vessel under a deep navy sky."
              caption={t("captions.breaks")}
              className="mb-6"
            />
            <div className="glass-strong sticky top-28 h-fit rounded-2xl p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/12 text-gold-500">
                <Icon name="route" size={24} />
              </div>
              <p className="eyebrow mt-6">{H.breaks.answerLabel}</p>
              <p className="mt-2 text-lg font-semibold leading-8 text-ink">{H.breaks.answer}</p>
              <Link href="/how-it-works" className="btn btn-navy mt-7">
                {t("nav.how")} <Icon name="arrow" size={15} className="rtl:rotate-180" />
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 5 — TRANSACTION INFRASTRUCTURE */}
      <Section className="!py-20">
        <Reveal>
          <Eyebrow>{H.infra.eyebrow}</Eyebrow>
          <h2 className="h-display max-w-3xl text-3xl font-bold text-ink sm:text-[2.6rem]">{H.infra.title}</h2>
          <p className="lead mt-5 max-w-3xl">{H.infra.lead}</p>
        </Reveal>
        <Reveal delay={0.08} className="mt-10">
          <StageRail stages={H.infra.stages} note={t("common.illustrative")} />
        </Reveal>
        <Reveal className="mt-8">
          <Link href="/transactions" className="group inline-flex items-center gap-2 text-sm font-semibold text-gold-500">
            {t("nav.sub.transactions")}
            <Icon name="arrow" size={15} className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </Link>
        </Reveal>
      </Section>

      {/* 6 — SAUDI BUYERS */}
      <Section className="!py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <ImageFrame
              src="/images/saudi-distribution.jpg"
              alt="Saudi food distribution warehouse aisle with palletized goods near Riyadh."
              caption={H.buyers.eyebrow}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>{H.buyers.eyebrow}</Eyebrow>
            <h2 className="h-display text-3xl font-bold text-ink sm:text-4xl">{H.buyers.title}</h2>
            <p className="lead mt-5">{H.buyers.lead}</p>
            <CheckList items={H.buyers.points} className="mt-7" />
            <LinkButton href="/buyers/request" className="mt-8">
              {H.buyers.cta} <Icon name="arrow" size={16} className="rtl:rotate-180" />
            </LinkButton>
          </Reveal>
        </div>
      </Section>

      {/* 7 — AFRICAN EXPORTERS */}
      <Section className="!py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1" delay={0.1}>
            <Eyebrow>{H.exporters.eyebrow}</Eyebrow>
            <h2 className="h-display text-3xl font-bold text-ink sm:text-4xl">{H.exporters.title}</h2>
            <p className="lead mt-5">{H.exporters.lead}</p>
            <CheckList items={H.exporters.points} className="mt-7" tone="text-success" />
            <LinkButton href="/exporters/apply" variant="navy" className="mt-8">
              {H.exporters.cta} <Icon name="arrow" size={16} className="rtl:rotate-180" />
            </LinkButton>
          </Reveal>
          <Reveal className="order-1 lg:order-2">
            <ImageFrame src="/images/processing-nigeria.jpg" alt="Sesame and cashew sorting and bagging line at a Nigerian export processing facility." />
          </Reveal>
        </div>
      </Section>

      {/* 8 — CORRIDOR VISUALIZATION */}
      <Section className="!py-20">
        <Reveal>
          <Eyebrow>{H.corridor.eyebrow}</Eyebrow>
          <h2 className="h-display text-3xl font-bold text-ink sm:text-[2.6rem]">{H.corridor.title}</h2>
          <p className="lead mt-5 max-w-3xl">{H.corridor.lead}</p>
        </Reveal>
        <Reveal delay={0.08} className="geo-visual mt-10">
          <GlassCard level={4} className="!p-3 sm:!p-5">
            <CorridorMap showFuture />
          </GlassCard>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Reveal><GlassCard hover>
            <IconBadge name="pin" />
            <h3 className="mt-4 font-bold text-ink">{H.corridor.origin}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{H.corridor.originLead}</p>
          </GlassCard></Reveal>
          <Reveal delay={0.05}><GlassCard hover>
            <IconBadge name="route" />
            <h3 className="mt-4 font-bold text-ink">{H.railLabel}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{t("common.illustrative")}</p>
          </GlassCard></Reveal>
          <Reveal delay={0.1}><GlassCard hover>
            <IconBadge name="bank" />
            <h3 className="mt-4 font-bold text-ink">{H.corridor.dest}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{H.corridor.destLead}</p>
          </GlassCard></Reveal>
        </div>
        <Reveal className="mt-6">
          <div className="glass flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <StatusPill tone="gold">{H.corridor.future}</StatusPill>
              <h3 className="mt-3 font-display text-lg font-bold text-ink">{H.corridor.futureTitle}</h3>
              <p className="mt-1 text-sm text-muted">{H.corridor.futureLead}</p>
            </div>
            <LinkButton href="/corridors" variant="ghost" className="flex-none">
              {H.corridor.cta}
            </LinkButton>
          </div>
        </Reveal>
      </Section>

      {/* 9 — COMMODITY INTELLIGENCE */}
      <Section className="!py-20">
        <Reveal>
          <Eyebrow>{H.commodities.eyebrow}</Eyebrow>
          <h2 className="h-display max-w-3xl text-3xl font-bold text-ink sm:text-[2.6rem]">{H.commodities.title}</h2>
          <p className="lead mt-5 max-w-3xl">{H.commodities.lead}</p>
        </Reveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          <Reveal>
            <GlassCard className="h-full">
              <EvidenceTag status="VERIFIED" label="Active" />
              <div className="mt-4">
                <EmptyState
                  icon="grain"
                  title="No active commodities yet"
                >
                  Active status appears only once verified corridor transaction records exist.
                </EmptyState>
              </div>
            </GlassCard>
          </Reveal>
          {[
            { s: "VALIDATION", tag: "Under validation", list: byStatus("VALIDATION"), delay: 0.04 },
            { s: "INTELLIGENCE", tag: "Market intelligence", list: byStatus("INTELLIGENCE"), delay: 0.08 },
            { s: "FUTURE", tag: "Future opportunity", list: byStatus("FUTURE"), delay: 0.12 },
          ].map((col) => (
            <Reveal key={col.s} delay={col.delay}>
              <GlassCard hover className="h-full">
                <StatusPill tone={COMMODITY_STATUS[col.s].tone === "muted" ? "muted" : col.s === "FUTURE" ? "gold" : "warning"}>
                  {col.tag}
                </StatusPill>
                <ul className="mt-4 space-y-2">
                  {col.list.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/commodities/${c.slug}`} className="group flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm text-ink/85 transition-colors hover:bg-line/10">
                        <span className="flex items-center gap-2"><Icon name={c.icon === "bean" ? "grain" : c.icon} size={15} className="text-gold-500" />{c.name}</span>
                        <Icon name="chevronRight" size={13} className="opacity-40 rtl:rotate-180" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <LinkButton href="/commodities" variant="ghost">{H.commodities.cta}</LinkButton>
        </Reveal>
      </Section>

      {/* 10 — VERIFICATION */}
      <Section className="!py-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <Eyebrow>{H.verification.eyebrow}</Eyebrow>
            <h2 className="h-display text-3xl font-bold text-ink sm:text-4xl">{H.verification.title}</h2>
            <p className="lead mt-5">{H.verification.lead}</p>
            <LinkButton href="/verification" variant="navy" className="mt-8">{H.verification.cta}</LinkButton>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard level={4}>
              <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted">
                <Icon name="layers" size={14} className="text-gold-500" /> Verification stack
              </p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {H.verification.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 rounded-lg border border-line/12 bg-line/[0.03] px-3 py-2.5 text-[0.83rem] font-medium text-ink/90">
                    <Icon name="shield" size={15} className="flex-none text-gold-500" />
                    {item}
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      {/* 11 — COMPLIANCE */}
      <Section className="!py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <ImageFrame src="/images/inspection-lab.jpg" alt="Independent quality inspection: sampling sesame seed in a laboratory." evidence="ILLUSTRATIVE" />
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>{H.compliance.eyebrow}</Eyebrow>
            <h2 className="h-display text-3xl font-bold text-ink sm:text-4xl">{H.compliance.title}</h2>
            <p className="lead mt-5">{H.compliance.lead}</p>
            <CheckList items={H.compliance.items} icon="stamp" className="mt-7" />
            <LinkButton href="/compliance" variant="ghost" className="mt-8">{H.compliance.cta}</LinkButton>
          </Reveal>
        </div>
      </Section>

      {/* 12 — CONTROLLED RELEASE */}
      <Section className="!py-20">
        <Reveal>
          <Eyebrow>{H.release.eyebrow}</Eyebrow>
          <h2 className="h-display max-w-3xl text-3xl font-bold text-ink sm:text-[2.6rem]">{H.release.title}</h2>
          <p className="lead mt-5 max-w-3xl">{H.release.lead}</p>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {H.release.gates.map((g, i) => (
            <Reveal key={i} delay={(i % 3) * 0.05}>
              <GlassCard hover className="h-full">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-gold-500/40 font-mono text-xs font-bold text-gold-500">
                    G{i + 1}
                  </span>
                  <Icon name="lock" size={16} className="ms-auto text-muted" />
                </div>
                <p className="mt-4 text-sm font-semibold leading-6 text-ink">{g}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1} className="mt-8">
          <ImageFrame
            src="/images/cold-chain-jeddah.jpg"
            alt="Refrigerated cold-chain containers at a Saudi distribution hub on arrival."
            caption={t("captions.release")}
            ratio="21/9"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </Reveal>
        <Reveal className="mt-8">
          <Link href="/transactions" className="group inline-flex items-center gap-2 text-sm font-semibold text-gold-500">
            {t("nav.sub.transactions")}
            <Icon name="arrow" size={15} className="transition-transform group-hover:translate-x-1 rtl:rotate-180" />
          </Link>
        </Reveal>
      </Section>

      {/* 13 — HOW IT WORKS */}
      <Section className="!py-20">
        <Reveal>
          <Eyebrow>{H.how.eyebrow}</Eyebrow>
          <h2 className="h-display max-w-3xl text-3xl font-bold text-ink sm:text-[2.6rem]">{H.how.title}</h2>
          <p className="lead mt-5 max-w-3xl">{H.how.lead}</p>
        </Reveal>
        <div className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {H.how.stages.map((stage, i) => (
            <Reveal key={i} delay={(i % 4) * 0.05}>
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-gold-500/40 bg-gold-500/10 font-mono text-sm font-semibold text-gold-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display font-bold text-ink">{stage}</h3>
                </div>
                <p className="mt-3 text-[0.83rem] leading-6 text-muted">{H.how.stageBody[i]}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12">
          <LinkButton href="/how-it-works">{H.how.cta}</LinkButton>
        </Reveal>
      </Section>

      {/* 14 — WHY MASAR */}
      <Section className="!py-20">
        <Reveal>
          <Eyebrow>{H.why.eyebrow}</Eyebrow>
          <h2 className="h-display text-3xl font-bold text-ink sm:text-[2.6rem]">{H.why.title}</h2>
          <p className="lead mt-5 max-w-3xl">{H.why.lead}</p>
        </Reveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-muted">
                <Icon name="xCircle" size={18} /> {H.why.isNotTitle}
              </h3>
              <ul className="mt-5 space-y-3">
                {H.why.isNot.map((x, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted">
                    <Icon name="close" size={16} className="mt-1 flex-none text-danger" /> {x}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.08}>
            <GlassCard level={4} className="h-full">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                <Icon name="checkCircle" size={18} className="text-success" /> {H.why.isTitle}
              </h3>
              <ul className="mt-5 space-y-3">
                {H.why.is.map((x, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-ink/90">
                    <Icon name="check" size={16} className="mt-1 flex-none text-success" strokeWidth={2.2} /> {x}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      {/* 14b — LEADERSHIP */}
      <Section className="!py-20">
        <Reveal>
          <Eyebrow>{t("leadership.eyebrow")}</Eyebrow>
          <h2 className="h-display text-3xl font-bold text-ink sm:text-[2.6rem]">{t("leadership.title")}</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <GlassCard level={4} className="h-full !p-7">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 flex-none overflow-hidden rounded-2xl border border-gold-500/40">
                  <Image
                    src="/images/team/ceo.jpg"
                    alt="Portrait of Lukman Suleiman Kura, Chief Executive Officer of MASAR."
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">Lukman Suleiman Kura</h3>
                  <p className="mt-0.5 text-sm font-medium text-gold-500">{t("leadership.ceoRole")}</p>
                </div>
              </div>
              <blockquote className="mt-6 border-s-2 border-gold-500/50 ps-4 text-[0.95rem] leading-7 text-ink/90">
                “{t("leadership.ceoQuote")}”
              </blockquote>
              <p className="mt-4 text-xs leading-5 text-muted">{t("leadership.ceoMeta")}</p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.08}>
            <GlassCard level={4} className="h-full !p-7">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 flex-none overflow-hidden rounded-2xl border border-gold-500/40">
                  <Image
                    src="/images/team/cto.jpg"
                    alt="Portrait of Mujahid Yakub Baita, Chief Technology Officer of MASAR."
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">Mujahid Yakub Baita</h3>
                  <p className="mt-0.5 text-sm font-medium text-gold-500">{t("leadership.ctoRole")}</p>
                </div>
              </div>
              <blockquote className="mt-6 border-s-2 border-gold-500/50 ps-4 text-[0.95rem] leading-7 text-ink/90">
                “{t("leadership.ctoQuote")}”
              </blockquote>
              <p className="mt-4 text-xs leading-5 text-muted">{t("leadership.ctoMeta")}</p>
            </GlassCard>
          </Reveal>
        </div>
        <Reveal delay={0.12}>
          <p className="mt-5 text-xs text-muted">
            {t("leadership.source")}{" · "}
            {t("backed.label")} — {t("backed.text")}
          </p>
        </Reveal>
      </Section>

      {/* 15 — TRADE INTELLIGENCE */}
      <Section className="!py-20">
        <Reveal>
          <Eyebrow>{H.intel.eyebrow}</Eyebrow>
          <h2 className="h-display max-w-3xl text-3xl font-bold text-ink sm:text-[2.6rem]">{H.intel.title}</h2>
          <p className="lead mt-5 max-w-3xl">{H.intel.lead}</p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {H.intel.cats.map((c, i) => (
            <Reveal key={i} delay={(i % 4) * 0.04}>
              <GlassCard hover className="h-full !p-5">
                <IconBadge name={INTEL_ICONS[i]} />
                <p className="mt-4 text-sm font-semibold leading-6 text-ink">{c}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <LinkButton href="/intelligence" variant="ghost">{H.intel.cta}</LinkButton>
        </Reveal>
      </Section>

      {/* 16 — PARTNERSHIPS */}
      <Section className="!py-20">
        <div className="glass-strong overflow-hidden rounded-[1.5rem]">
          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <Eyebrow>{H.partners.eyebrow}</Eyebrow>
              <h2 className="h-display text-3xl font-bold text-ink">{H.partners.title}</h2>
              <p className="lead mt-5">{H.partners.lead}</p>
              <StatusPill tone="warning" className="mt-6">
                <Icon name="clock" size={13} /> {H.partners.developing}
              </StatusPill>
              <div className="mt-7">
                <LinkButton href="/strategic-partners">{H.partners.cta}</LinkButton>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid gap-3 sm:grid-cols-2">
                {H.partners.cats.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl border border-line/12 bg-line/[0.03] px-4 py-3.5">
                    <Icon name={PARTNER_ICONS[i]} size={18} className="flex-none text-gold-500" />
                    <span className="text-sm font-medium text-ink/90">{c}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 17 — CTA */}
      <CTASection primary="buyer" />
    </>
  );
}
