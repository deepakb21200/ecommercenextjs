"use client";

import { ReactNode } from "react";

type AdminHeroProps = {
  badgeText: string;
  title: string;
  description: string;
  rightText: string;

  // Left large icon
  icon: ReactNode;

  // Right small badge icon
  rightIcon?: ReactNode;
};

export function AdminHero({
  badgeText,
  title,
  description,
  rightText,
  icon,
  rightIcon,
}: AdminHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-gradient-to-br from-[#111827] via-[#0F172A] to-[#111827] p-6 sm:p-8 lg:p-10">
      {/* Background Blurs */}
      <div className="absolute left-[-80px] top-[-80px] h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="absolute bottom-[-100px] right-[-40px] h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Content */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-xl shadow-violet-500/20">
              {icon}
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
                {badgeText}
              </p>

              <h1 className="mt-1 text-3xl font-black text-white sm:text-4xl">
                {title}
              </h1>
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
            {description}
          </p>
        </div>

        {/* Right Badge */}
        <div className="flex w-fit items-center gap-3 rounded-2xl border border-violet-500/20 bg-violet-500/10 px-5 py-3 backdrop-blur-xl">
          {rightIcon}

          <p className="text-sm font-medium text-violet-200">
            {rightText}
          </p>
        </div>
      </div>
    </div>
  );
}