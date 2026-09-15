import { Play, Bookmark, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { TierBadge, Skeleton } from "@/components/ui/badges";
import { HealthCheck } from "@/components/system/health-check";

/**
 * Temporary showcase page — verifies the design system renders correctly.
 * Replaced by the real home feed in a later step.
 */
export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <div className="mb-6">
        <HealthCheck />
      </div>
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-cyan">
        Design system
      </p>
      <h1 className="mb-4 text-5xl font-bold tracking-tight">
        The Genesis of{" "}
        <span className="text-gradient-violet">Digital Realms</span>
      </h1>
      <p className="mb-12 max-w-xl font-light leading-relaxed text-white/60">
        Foundation tokens and core components are wired up. Everything below
        pulls from the same theme variables.
      </p>

      {/* Buttons */}
      <section className="mb-12">
        <h2 className="mb-4 text-sm font-semibold text-white/50">Buttons</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button>
            <Play size={16} className="fill-black" /> Stream now
          </Button>
          <Button variant="glass">
            <Bookmark size={16} /> Add to vault
          </Button>
          <Button variant="violet">
            <Sparkles size={16} /> Go VIP
          </Button>
          <Button variant="ghost" size="sm">
            Learn more
          </Button>
        </div>
      </section>

      {/* Cards + badges */}
      <section className="mb-12">
        <h2 className="mb-4 text-sm font-semibold text-white/50">
          Surfaces & tiers
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <GlassPanel interactive className="p-5">
            <TierBadge tier="free" />
            <h3 className="mt-2 font-semibold">Free content</h3>
            <p className="mt-1 text-sm text-white/50">Open to everyone.</p>
          </GlassPanel>
          <GlassPanel interactive className="p-5">
            <TierBadge tier="gems" priceGems={300} />
            <h3 className="mt-2 font-semibold">Gem unlock</h3>
            <p className="mt-1 text-sm text-white/50">Pay once with gems.</p>
          </GlassPanel>
          <GlassPanel interactive className="p-5">
            <TierBadge tier="vip" />
            <h3 className="mt-2 font-semibold">VIP exclusive</h3>
            <p className="mt-1 text-sm text-white/50">Members only.</p>
          </GlassPanel>
        </div>
      </section>

      {/* Loading state */}
      <section>
        <h2 className="mb-4 text-sm font-semibold text-white/50">
          Loading state
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-video" />
          ))}
        </div>
      </section>
    </main>
  );
}
