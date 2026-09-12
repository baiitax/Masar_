"use client";

import { useEffect, useMemo, useState } from "react";
import { geoNaturalEarth1, geoGraticule10, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import world from "world-atlas/countries-110m.json";

const W = 1000;
const H = 540;

const NODES = [
  { id: "lagos", name: "Lagos", coords: [3.4, 6.46], role: "origin" },
  { id: "kano", name: "Kano", coords: [8.52, 12.0], role: "origin" },
  { id: "jeddah", name: "Jeddah", coords: [39.18, 21.48], role: "dest" },
  { id: "riyadh", name: "Riyadh", coords: [46.72, 24.71], role: "dest" },
  { id: "dammam", name: "Dammam", coords: [50.1, 26.43], role: "dest" },
];

const ROUTES = [
  { from: "kano", to: "riyadh", primary: true },
  { from: "lagos", to: "jeddah", primary: false },
];

function arcPath(a, b) {
  const [x1, y1] = a;
  const [x2, y2] = b;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.hypot(dx, dy);
  const ox = -dy / dist;
  const oy = dx / dist;
  const lift = dist * 0.24;
  const cx = mx + ox * lift;
  const cy = my + oy * lift - dist * 0.06;
  return { d: `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`, cx, cy };
}

export default function CorridorMap({
  className = "",
  animated = true,
  labels = true,
  showFuture = false,
  note = true,
}) {
  const [motion, setMotion] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMotion(false);
    } else {
      setMotion(animated);
    }
  }, [animated]);

  const geo = useMemo(() => {
    const countriesFC = feature(world, world.objects.countries);
    const projection = geoNaturalEarth1()
      .rotate([-18, 0])
      .fitExtent(
        [
          [10, 14],
          [W - 10, H - 14],
        ],
        { type: "Sphere" }
      );
    const path = geoPath(projection);
    const countries = countriesFC.features.map((f) => ({
      d: path(f),
      name: f.properties?.name || "",
      id: f.id || f.properties?.name,
    }));
    const sphere = path({ type: "Sphere" });
    const graticule = path(geoGraticule10());
    const nodeById = {};
    const nodes = NODES.map((n) => {
      const p = projection(n.coords);
      nodeById[n.id] = p;
      return { ...n, xy: p };
    });
    const highlightNames = ["Nigeria", "Saudi Arabia", ...(showFuture ? ["Niger", "Chad", "Sudan", "Ethiopia", "Kenya", "United Arab Emirates", "Qatar", "Kuwait", "Oman", "Bahrain", "Egypt"] : [])];
    const labelsGeo = [
      { name: "NIGERIA", xy: projection([8, 9.2]), role: "origin" },
      { name: "SAUDI ARABIA", xy: projection([44, 23.5]), role: "dest" },
    ];
    return { countries, sphere, graticule, nodes, nodeById, highlightNames, labelsGeo };
  }, [showFuture]);

  return (
    <figure className={`geo-visual relative m-0 ${className}`}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Illustrative map of the Nigeria to Saudi Arabia trade corridor with route arcs between Lagos, Kano, Jeddah and Riyadh. This is not live shipment data."
      >
        <defs>
          <radialGradient id="seaGlow" cx="62%" cy="38%" r="55%">
            <stop offset="0%" stopColor="#1E51A6" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#1E51A6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="routeGold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#A98136" />
            <stop offset="50%" stopColor="#E6BE5E" />
            <stop offset="100%" stopColor="#C2994B" />
          </linearGradient>
        </defs>

        <path d={geo.sphere} fill="url(#seaGlow)" stroke="rgb(var(--line))" strokeOpacity="0.18" />
        <path d={geo.graticule} fill="none" stroke="rgb(var(--line))" strokeOpacity="0.09" strokeWidth="0.6" />

        {geo.countries.map((c) => {
          const hot = geo.highlightNames.includes(c.name);
          return (
            <path
              key={c.id}
              d={c.d}
              fill={hot ? "#C2994B" : "rgb(var(--line))"}
              fillOpacity={hot ? 0.26 : 0.07}
              stroke={hot ? "#E6BE5E" : "rgb(var(--line))"}
              strokeOpacity={hot ? 0.75 : 0.22}
              strokeWidth={hot ? 1.1 : 0.5}
            />
          );
        })}

        {ROUTES.map((r, i) => {
          const arc = arcPath(geo.nodeById[r.from], geo.nodeById[r.to]);
          const id = `route-${i}`;
          return (
            <g key={id}>
              <path d={arc.d} fill="none" stroke="rgb(var(--line))" strokeOpacity="0.35" strokeWidth="1" />
              <path
                id={id}
                d={arc.d}
                fill="none"
                stroke="url(#routeGold)"
                strokeWidth={r.primary ? 2.4 : 1.6}
                strokeLinecap="round"
                className={motion ? (r.primary ? "route-line" : "route-line-slow") : ""}
                strokeDasharray={motion ? undefined : "6 8"}
              />
              {motion ? (
                <circle r={r.primary ? 4 : 3} fill="#E6BE5E">
                  <animateMotion dur={r.primary ? "5s" : "7s"} repeatCount="indefinite" path={arc.d} />
                </circle>
              ) : null}
            </g>
          );
        })}

        {geo.nodes.map((n) => (
          <g key={n.id}>
            {motion ? <circle cx={n.xy[0]} cy={n.xy[1]} r="7" fill="#E6BE5E" opacity="0.4" className="node-pulse" /> : null}
            <circle cx={n.xy[0]} cy={n.xy[1]} r="3.6" fill={n.role === "dest" ? "#E6BE5E" : "#fff"} stroke="#C2994B" strokeWidth="1.4" />
          </g>
        ))}

        {labels
          ? geo.nodes.map((n) => (
              <text
                key={`l-${n.id}`}
                x={n.xy[0]}
                y={n.xy[1] - 10}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="rgb(var(--ink))"
                fillOpacity="0.78"
                style={{ letterSpacing: "0.12em", textTransform: "uppercase" }}
              >
                {n.name}
              </text>
            ))
          : null}

        {labels
          ? geo.labelsGeo.map((l) => (
              <text
                key={l.name}
                x={l.xy[0]}
                y={l.xy[1]}
                textAnchor="middle"
                fontSize="15"
                fontWeight="800"
                fill="var(--gold)"
                fillOpacity="0.7"
                style={{ letterSpacing: "0.28em" }}
              >
                {l.name}
              </text>
            ))
          : null}
      </svg>
      {note ? (
        <figcaption className="mt-1 flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.14em] text-muted">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-warning" aria-hidden="true" />
          Illustrative trade corridor — not live transaction data
        </figcaption>
      ) : null}
    </figure>
  );
}
