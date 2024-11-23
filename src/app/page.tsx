import { Hero } from "@/components/hero/Hero";
import { Languages } from "@/components/languages/Languages";

export default function Home() {
  return (
    <div className="bg-zinc-900">
      <Hero />
      <Languages />
    </div>
  );
}
