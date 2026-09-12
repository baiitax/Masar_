const paths = {
  shield: <><path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  checkCircle: <><circle cx="12" cy="12" r="9" /><path d="M8.5 12.2l2.4 2.4 4.6-5" /></>,
  xCircle: <><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
  doc: <><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4M9.5 12h6M9.5 16h6" /></>,
  docs: <><path d="M6 4h8l4 4v12H6z" /><path d="M14 4v4h4" /><path d="M9 14h6M9 17h4" /></>,
  stamp: <><path d="M5 21h14M7 17h10l-1-4H8z" /><path d="M9 13V9a3 3 0 016 0v4" /></>,
  ship: <><path d="M3 16l1.6 1.2a2.5 2.5 0 003 0L10 16a2.5 2.5 0 014 0l1.4 1.2a2.5 2.5 0 003 0L20 16" /><path d="M5 14h14l-1.6-6H6.6z" /><path d="M12 8V4M9 4h6" /></>,
  truck: <><path d="M3 6h11v9H3z" /><path d="M14 9h4l3 3v3h-7" /><circle cx="7" cy="18" r="1.8" /><circle cx="17" cy="18" r="1.8" /></>,
  container: <><path d="M3 7h18v10H3z" /><path d="M7 7v10M11 7v10M15 7v10M3 10h18M3 14h18" /></>,
  route: <><circle cx="6" cy="6" r="2.6" /><circle cx="18" cy="18" r="2.6" /><path d="M8.6 6H15a3 3 0 010 6H9a3 3 0 000 6h6.4" /></>,
  network: <><circle cx="12" cy="5" r="2.4" /><circle cx="5" cy="18" r="2.4" /><circle cx="19" cy="18" r="2.4" /><path d="M12 7.4v4.2M10.6 14L6.4 16.2M13.4 14l4.2 2.2M8 11.6h8" /></>,
  layers: <><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5M3 16l9 5 9-5" transform="translate(0,-3)" /></>,
  flask: <><path d="M10 3h4M11 3v6l-5 8.2A2 2 0 007.7 20h8.6a2 2 0 001.7-2.8L13 9V3" /><path d="M8.4 15h7.2" /></>,
  lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /><path d="M12 14v2.5" /></>,
  bank: <><path d="M3 9l9-5 9 5" /><path d="M4 9h16M6 9v8M10 9v8M14 9v8M18 9v8M3 19h18M3 21h18" /></>,
  factory: <><path d="M3 21V10l6 4v-4l6 4V7l6 3v11z" /><path d="M7 17h2M12 17h2M17 17h.01" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" /></>,
  pin: <><path d="M12 21s7-6.1 7-11a7 7 0 10-14 0c0 4.9 7 11 7 11z" /><circle cx="12" cy="10" r="2.6" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3.5 20a5.5 5.5 0 0111 0" /><path d="M16 5.2a3.2 3.2 0 010 6M17.5 14.6A5.5 5.5 0 0121 20" /></>,
  user: <><circle cx="12" cy="8" r="3.6" /><path d="M4.5 20a7.5 7.5 0 0115 0" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="M16.5 16.5L21 21" /></>,
  scale: <><path d="M12 4v16M6 20h12M5 8h14M12 4l-7 4 2.2 5a2.6 2.6 0 005.1 0L12 8M12 4l7 4-2.2 5a2.6 2.6 0 01-5.1 0" /></>,
  leaf: <><path d="M5 19c0-8 6-13 14-13 0 9-6 14-14 13z" /><path d="M5 19c2.5-4.5 6-7.5 10-9" /></>,
  grain: <><path d="M12 22V8" /><path d="M12 8c-2.5-1-3.5-3-3-5 2.5.2 4 2 3 5zM12 8c2.5-1 3.5-3 3-5-2.5.2-4 2-3 5zM12 13c-2.5-1-3.5-3-3-5 2.5.2 4 2 3 5zM12 13c2.5-1 3.5-3 3-5-2.5.2-4 2-3 5zM12 18c-2.5-1-3.5-3-3-5 2.5.2 4 2 3 5zM12 18c2.5-1 3.5-3 3-5-2.5.2-4 2-3 5z" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17L17 7M8 7h9v9" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  chevronRight: <path d="M9 6l6 6-6 6" />,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5L3.6 3.6M20.4 20.4L19 19M19 5l1.4-1.4M3.6 20.4L5 19" /></>,
  moon: <path d="M20 14.5A8.5 8.5 0 019.5 4 8.5 8.5 0 1020 14.5z" />,
  globe2: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /></>,
  download: <><path d="M12 4v10M8 11l4 4 4-4" /><path d="M5 19h14" /></>,
  upload: <><path d="M12 16V6M8 9l4-4 4 4" /><path d="M5 19h14" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 7l8.5 6 8.5-6" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a12 12 0 005 5L16 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />,
  flag: <><path d="M5 21V4" /><path d="M5 4h12l-2 4 2 4H5" /></>,
  bell: <><path d="M6 16V11a6 6 0 1112 0v5l1.5 2H4.5z" /><path d="M10 20a2 2 0 004 0" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" /></>,
  building: <><rect x="5" y="3" width="14" height="18" rx="1" /><path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h.01M15 15h.01M10 21v-3h4v3" /></>,
  clipboard: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4a3 3 0 016 0M9 11h6M9 15h4" /></>,
  handshake: <><path d="M3 12l4-3 5 2 4-2 5 3" /><path d="M7 9l5 4 2-1M14 12l3 3-2 2-2-2M7 13l3 3-2 2-2-2" /></>,
  fileCheck: <><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4" /><path d="M9.5 13.5l1.8 1.8 3.4-3.6" /></>,
  eye: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="2.8" /></>,
  target: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" /></>,
  spark: <path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z" />,
  database: <><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" /><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>,
  grid: <><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></>,
  audit: <><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v4h4" /><path d="M9 12l2 2 4-4" transform="translate(0,2)" /></>,
  camera: <><path d="M4 8h3l2-2h6l2 2h3v11H4z" /><circle cx="12" cy="13" r="3.4" /></>,
  thermometer: <><path d="M10 13V5a2 2 0 114 0v8a4 4 0 11-4 0z" /></>,
  scale2: <><path d="M12 3v18M7 21h10" /><path d="M12 6l-7 3 2 5h3M12 6l7 3-2 5h-3" /></>,
};

export default function Icon({ name, size = 22, className = "", strokeWidth = 1.6, ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {paths[name] || paths.grid}
    </svg>
  );
}
