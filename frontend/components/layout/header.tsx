"use client";

import { useEffect, useState } from "react";
import { Menu, Search, Bell, Gem, Crown, Zap } from "lucide-react";

export function Header({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-4 transition-all duration-500 sm:h-20 sm:px-6 ${
        scrolled
          ? "border-b border-white/5 bg-black/80 backdrop-blur-2xl"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="flex w-1/4 items-center gap-4 sm:gap-6">
        <button
          onClick={onToggleSidebar}
          className="group hidden rounded-full p-2 text-white transition-colors hover:bg-white/10 sm:block"
          aria-label="Toggle sidebar"
        >
          <Menu size={22} className="transition-transform group-hover:scale-95" />
        </button>

        <div className="group flex cursor-pointer items-center gap-2.5">
          <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-black">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-cyan-500 opacity-20 transition-opacity duration-500 group-hover:opacity-100" />
            <Zap size={16} className="relative z-10 fill-white text-white" />
          </div>
          <span className="hidden text-xl font-bold tracking-tighter text-white md:block">
            NEXUS<span className="font-light text-white/30">PRO</span>
          </span>
        </div>
      </div>

      <div className="hidden max-w-2xl flex-1 items-center justify-center sm:flex">
        <div className="group flex w-full max-w-lg items-center rounded-full glass-pill px-4 py-2 transition-all duration-300 hover:bg-white/5 focus-within:border-white/20 focus-within:bg-white/10">
          <Search
            size={16}
            className="text-white/40 transition-colors group-focus-within:text-cyan"
          />
          <input
            type="text"
            placeholder="Search the universe..."
            className="w-full border-none bg-transparent px-3 text-sm font-light text-white outline-none placeholder:text-white/30"
          />
          <div className="hidden items-center gap-1 lg:flex">
            <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/50">⌘</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/50">K</span>
          </div>
        </div>
      </div>

      <div className="flex w-1/4 items-center justify-end gap-3 sm:gap-5">
        <button className="rounded-full p-2 text-white hover:bg-white/10 sm:hidden" aria-label="Search">
          <Search size={20} />
        </button>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="group flex cursor-pointer items-center gap-1.5">
            <Gem size={14} className="text-gold transition-all group-hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
            <span className="text-sm font-semibold text-white">1,250</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="group flex cursor-pointer items-center gap-1.5">
            <Crown size={14} className="text-fuchsia transition-all group-hover:drop-shadow-[0_0_8px_rgba(232,121,249,0.6)]" />
            <span className="text-gradient-violet text-sm font-bold">VIP</span>
          </div>
        </div>

        <button className="group relative rounded-full p-2 transition-colors hover:bg-white/10" aria-label="Notifications">
          <Bell size={20} className="text-white/80 transition-colors group-hover:text-white" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 animate-pulse rounded-full bg-rose shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
        </button>

        <div className="group cursor-pointer rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 p-0.5 transition-all hover:shadow-glow-cyan">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150"
            alt="Profile"
            className="h-8 w-8 rounded-full border-2 border-black object-cover sm:h-9 sm:w-9"
          />
        </div>
      </div>
    </header>
  );
}
