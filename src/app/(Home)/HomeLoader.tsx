"use client"

export function HomeLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[hsl(40,33%,98%)]">

      {/* Logo */}
      <div className="flex flex-col items-center gap-3 mb-10">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-white shadow-lg"
          style={{
            background: "linear-gradient(135deg, hsl(174,62%,38%), hsl(190,60%,45%), hsl(200,55%,50%))",
          }}
        >
          V
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#222831]">VELVET</h2>
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#6b7280] mt-0.5">Fashion Store</p>
        </div>
      </div>

      {/* Dots loader */}
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-2 w-2 rounded-full animate-bounce"
            style={{
              background: "hsl(174,62%,38%)",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>

      <p className="mt-6 text-xs tracking-widest uppercase text-[#6b7280]">
        Loading store...
      </p>
    </div>
  );
}