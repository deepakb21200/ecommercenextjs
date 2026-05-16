"use client";

import { useState } from "react";

import {
    RiFilterLine,
    RiCloseLine,
    RiArrowDownSLine,
    RiFireLine,
} from "react-icons/ri";

// ───────────────── TYPES ─────────────────

type FilterOptions = {
    categories: { _id: string; name: string }[];
    brands: { name: string; count: number }[];
    sizes: string[];
    colors: { label: string; count: number }[];
};

type Filters = {
    categories: string[];
    sizes: string[];
    colors: string[];
    brands: string[];
    sort: string;
    onSale: boolean;
};

type Props = {
    filters: Filters;
    filterOptions: FilterOptions;
    activeFilterCount: number;
  applyFilter: (filters: Filters) => void;

    clearFilters: () => void;
};

// ───────────────── HELPERS ─────────────────

function toggle(arr: string[], val: string) {
    return arr.includes(val) ? arr.filter((v) => v !== val): [...arr, val];
}

// ───────────────── FILTER SECTION ─────────────────

function FilterSection({ title, children}: {title: string;children: React.ReactNode}) {
    const [open, setOpen] = useState(true);
    return (
        // <div className="py-4 border-b border-[hsl(40,20%,88%)]">
        <div className="py-4 border-4 border-amber-300">
            <button onClick={() => setOpen((p) => !p)} className="flex w-full items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-[hsl(220,10%,45%)]">
                    {title}
                </span>

                <RiArrowDownSLine
                    className="text-[hsl(220,10%,55%)] transition-transform duration-200 border-2 border-blue-400"
                    style={{ transform: open   ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                />
            </button>

            {open && (
                <div className="mt-3 space-y-1">
                    {children}
                </div>
            )}
        </div>
    );
}

// ───────────────── CHECK ITEM ─────────────────

function CheckItem({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
    return (
        <label  className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 transition-all 
        border-4 border-red-500" style={{ background: checked ? "hsl(174,62%,38%,0.08)" : "transparent" }}
            onMouseEnter={(e) => {
                if (!checked) {
                    (e.currentTarget as HTMLElement).style.background = "hsl(40,33%,96%)"
                }
            }}
            onMouseLeave={(e) => {
                if (!checked) { (e.currentTarget as HTMLElement).style.background = "transparent" }
            }}
            onClick={onChange}>

            <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border-2 transition-all 
            ${checked ? "border-[hsl(174,62%,38%)] bg-[hsl(174,62%,38%)]"  : "border-[hsl(40,20%,78%)] bg-transparent"}`}>

                {checked && (
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" >
                        <path d="M1 4L3 6L7 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </div>

            <span
                className="text-sm"
                style={{ color: checked ? "hsl(174,62%,38%)" : "hsl(220,20%,25%)", fontWeight: checked ? 600 : 400, }}>
                {label}
            </span>
        </label>
    );
}

// ───────────────── COMPONENT ─────────────────

export default function ShopSidebar({ filters, filterOptions, activeFilterCount, applyFilter, clearFilters }: Props) {
    return (
        <aside>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[hsl(40,20%,88%)]">
                <div className="flex items-center gap-2">
                    <RiFilterLine className="text-[hsl(174,62%,38%)]" />

                    <h2 className="font-bold text-sm text-[hsl(220,20%,15%)]">
                        Filters
                    </h2>
                </div>

                {activeFilterCount > 0 && (
                    <button  onClick={clearFilters}
                        className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all"
                        style={{  background: "hsl(0,84%,60%,0.08)", color: "hsl(0,84%,50%)",
                             border: "1px solid hsl(0,84%,60%,0.2)"}}>
                        <RiCloseLine />
                        Clear {activeFilterCount}
                    </button>
                )}
            </div>

            {/* Sale */}
            <div className="py-4 border-b border-[hsl(40,20%,88%)]">
                <button
                    onClick={() => applyFilter({ ...filters, onSale: !filters.onSale })}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all"
                    style={{
                        background: filters.onSale ? "linear-gradient(135deg, hsl(15,85%,60%), hsl(25,85%,55%))"
                            : "hsl(40,33%,96%)",
                        color: filters.onSale
                            ? "white"
                            : "hsl(220,20%,35%)",
                    }}
                >
                    <RiFireLine />
                    On Sale Only
                </button>
            </div>

            {/* Categories */}
            <FilterSection title="Categories">
                {filterOptions.categories.map((cat) => (
                    <CheckItem     key={cat._id}     label={cat.name}
                     checked={filters.categories.includes(cat.name.toLowerCase())}
                   onChange={() => applyFilter({...filters, categories: toggle(filters.categories,cat.name.toLowerCase())})}         
                  />
                ))}
            </FilterSection>

            {/* Sizes */}
            <FilterSection title="Sizes">
                <div className="grid grid-cols-4 gap-2">
                    {filterOptions.sizes.map((size) => {
                        const active = filters.sizes.includes(size);
                        return (
                            <button
                                key={size}
                                 onClick={() => applyFilter({ ...filters, sizes: toggle(filters.sizes, size) })}

                                className="rounded-xl py-2 text-xs font-bold transition-all"
                                style={{
                                    background: active ? "hsl(174,62%,38%)" : "hsl(40,33%,96%)",
                                    color: active ? "white" : "hsl(220,20%,35%)"
                                }}>
                                {size}
                            </button>
                        );
                    })}
                </div>
            </FilterSection>

            {/* Colors */}
            {/* <FilterSection
        title={`Colors (${filterOptions.colors.length})`}
      >
        <div className="space-y-1">
          {filterOptions.colors.map((item) => (
            <label   key={item.label} className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5
             hover:bg-gray-50 transition-colors">
              <input   type="checkbox"
                checked={filters.colors.includes(
                  item.label
                )}
                onChange={() => applyFilter({ ...filters,  colors: toggle( filters.colors,item.label )})}
                className="h-3.5 w-3.5 accent-gray-900 rounded" />

              <span className="text-sm text-gray-700 flex-1 capitalize">
                {item.label}
              </span>

              <span className="text-xs text-gray-400">
                ({item.count})
              </span>
            </label>
          ))}
        </div>
      </FilterSection> */}

            <FilterSection title={`Colors (${filterOptions.colors.length})`}>
                {filterOptions.colors.map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                        <CheckItem label={item.label} checked={filters.colors.includes(item.label)}
                             onChange={() => applyFilter({ ...filters, colors: toggle(filters.colors, item.label) })}     />

                        <span className="text-xs text-gray-400">
                            ({item.count})
                        </span>
                    </div>
                ))}
            </FilterSection>

            {/* Brands */}
            <FilterSection title="Brands">
                {filterOptions.brands.map((brand) => (
                    <div key={brand.name} className="flex items-center justify-between">
                        <CheckItem   label={brand.name}   checked={filters.brands.includes(brand.name)}
                         onChange={() => applyFilter({ ...filters, brands: toggle(filters.brands, brand.name) })}

                          />
                        <span className="text-xs text-gray-400 ml-2">
                            ({brand.count})
                        </span>
                    </div>
                ))}
            </FilterSection>
        </aside>
    );
}



















