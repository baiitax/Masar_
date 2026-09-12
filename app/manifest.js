import { SITE } from "@/lib/site";

export default function manifest() {
  return {
    name: "MASAR — Saudi–Africa trade infrastructure",
    short_name: "MASAR",
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#040916",
    theme_color: "#061A3F",
    icons: [
      { src: "/brand/logo-mark.png", sizes: "1254x1254", type: "image/png", purpose: "any" },
    ],
  };
}
