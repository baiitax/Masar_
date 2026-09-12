"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useApp } from "./AppProvider";
import Icon from "./icons";

/**
 * Interior page copy is being professionally localized. We do not present
 * machine-translated legal/commercial text, so non-English readers on deep
 * pages see an explicit, dismissible notice instead of silently mixed content.
 */
export default function LangNotice() {
  const { lang, mounted } = useApp();
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);

  if (!mounted || lang === "en" || dismissed) return null;
  // Fully localized surfaces at this phase: homepage only.
  if (pathname === "/") return null;

  const text =
    lang === "ar"
      ? "أنت تتصفح محتوى هذه الصفحة باللغة الإنجليزية حالياً. تجري MASAR ترجمة احترافية كاملة للصفحات الداخلية إلى العربية. الواجهة والتنقل متاحان بالعربية."
      : "Vous consultez actuellement cette page en anglais. Une traduction professionnelle complète des pages intérieures en français est en préparation chez MASAR. L’interface et la navigation sont disponibles en français.";

  return (
    <div className="fixed inset-x-0 top-[4.6rem] z-30 px-4 pt-2 xl:px-8" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="glass-strong mx-auto flex max-w-[84rem] items-center gap-3 rounded-xl px-4 py-2.5 text-xs leading-5 text-muted shadow-glass">
        <Icon name="globe" size={15} className="flex-none text-gold-500" />
        <p>{text}</p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss language notice"
          className="ms-auto flex-none rounded-md p-1 text-muted hover:text-ink"
        >
          <Icon name="close" size={14} />
        </button>
      </div>
    </div>
  );
}
