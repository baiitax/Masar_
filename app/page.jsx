import HomePage from "@/components/pages/HomePage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/",
  description:
    "MASAR connects verified African agricultural supply with qualified Saudi demand — verification, compliance, independent evidence and controlled transaction execution on the Nigeria–Saudi Arabia corridor.",
});

export default function Page() {
  return <HomePage />;
}
