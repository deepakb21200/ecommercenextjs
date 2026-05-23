

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
 
import {
    RiFilterLine, RiCloseLine, RiArrowDownSLine,
    RiFireLine, RiGridFill, RiListCheck, RiSparklingLine,
} from "react-icons/ri";
 
import Products from "@/components/Home/ProductCarfs";




// Type update karo
type Product = {
    _id: string;
    title: string;
    description: string;
    brand: string;
    price: number;
    finalPrice: number;
    salePercentage: number;
    stock: number;
    sizes: string[];
    colors: { hex: string; name: string }[]; // ← object ab
    image: string;
    category: { _id: string; name: string };
};


const SORT_OPTIONS = [
    { value: "newest", label: "Newest First" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
];

type FilterOptions = {
    categories: { _id: string; name: string }[];
    brands: { name: string; count: number }[];
    sizes: string[];
    colors: { label: string; count: number }[]; // ← colors array nahi ab
};

type Filters = {
    categories: string[];
    sizes: string[];
    colors: string[];
    brands: string[];
    sort: string;
    onSale: boolean;
};


function toggle(arr: string[], val: string) {
    return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

function slugify(text: string) {
    return text.toLowerCase().replace(/\s+/g, "-");
}

function buildURL(filters: Filters) {
    const params = new URLSearchParams();
    if (filters.sort !== "newest") params.set("sort", filters.sort);
    if (filters.onSale) params.set("onSale", "true");
    filters.categories.forEach((cat) => params.append("category", slugify(cat)));
    filters.sizes.forEach((size) => params.append("size", size));
    filters.colors.forEach((color) => params.append("color", slugify(color)));
    filters.brands.forEach((brand) => params.append("brand", brand));
    const query = params.toString();
    return query ? `/shop?${query}` : "/shop";
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(true);
    return (
        <div className="py-4 border-b border-[hsl(40,20%,88%)]">
            <button onClick={() => setOpen((p) => !p)} className="flex w-full items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-[hsl(220,10%,45%)]">
                    {title}
                </span>
                <RiArrowDownSLine
                    className="text-[hsl(220,10%,55%)] transition-transform duration-200"
                    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
                />
            </button>
            {open && <div className="mt-3 space-y-1">{children}</div>}
        </div>
    );
}

function CheckItem({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
    return (
        <label
            className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 transition-all "
            style={{ background: checked ? "hsl(174,62%,38%,0.08)" : "transparent" }}
            onMouseEnter={(e) => { if (!checked) (e.currentTarget as HTMLElement).style.background = "hsl(40,33%,96%)"; }}
            onMouseLeave={(e) => { if (!checked) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            onClick={onChange}
        >
            <div
                className="flex h-4 w-4 shrink-0 items-center justify-center rounded-md transition-all"
                style={{
                    background: checked ? "hsl(174,62%,38%)" : "transparent",
                    border: checked ? "2px solid hsl(174,62%,38%)" : "2px solid hsl(40,20%,78%)",
                }}
            >
                {checked && (
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1 4L3 6L7 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </div>
            <span
                className="text-sm"
                style={{ color: checked ? "hsl(174,62%,38%)" : "hsl(220,20%,25%)", fontWeight: checked ? 600 : 400 }}
            >
                {label}
            </span>
        </label>
    );
}

export default function ShopPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialFilters: Filters = useMemo(() => ({
        sort: searchParams.get("sort") || "newest",
        onSale: searchParams.get("onSale") === "true",

        categories: searchParams.getAll("category").map((c) => c.replace(/-/g, " ").toLowerCase()),
        sizes: searchParams.getAll("size"),

        colors: searchParams.getAll("color").map((c) => c.replace(/-/g, " ").toLowerCase()),
        brands: searchParams.getAll("brand"),
    }), [searchParams]);



    const [filters, setFilters] = useState<Filters>(initialFilters);

    const [products, setProducts] = useState<Product[]>([]);//done

    const [filterOptions, setFilterOptions] = useState<FilterOptions>(
        {
            categories: [],
            brands: [],
            sizes: [],
            colors: [],
        });
    const [loading, setLoading] = useState(true);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [gridCols, setGridCols] = useState<3 | 4>(4);

    const activeFilterCount = filters.categories.length + filters.sizes.length +
        filters.colors.length + filters.brands.length + (filters.onSale ? 1 : 0);

 

    const fetchProducts = useCallback(async (f: Filters, signal?: AbortSignal) => {
        setLoading(true);

        try {
            const params = new URLSearchParams();

            if (f.sort !== "newest") params.set("sort", f.sort);
            if (f.onSale) params.set("onSale", "true");

            f.categories.forEach((cat) => params.append("category", slugify(cat)));
            f.sizes.forEach((size) => params.append("size", size));
            f.colors.forEach((color) => params.append("color", slugify(color)));
            f.brands.forEach((brand) => params.append("brand", brand));

            const query = params.toString();
            const url = query
                ? `/api/customer/catsection?${query}`
                : `/api/customer/catsection`;

            const res = await fetch(url, { signal });

            if (!res.ok) return;

            const data = await res.json();

            setProducts(data.products || []);
            setFilterOptions(
                data.filterOptions || {
                    categories: [],
                    brands: [],
                    sizes: [],
                    colors: [],
                }
            );
        } catch (error: any) {
            if (error.name === "AbortError") return;
            console.log(error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, []);


    useEffect(() => {
        const controller = new AbortController();
        fetchProducts(filters, controller.signal);
        return () => controller.abort(); // cleanup — purana request cancel
    }, [filters, fetchProducts]);

    const applyFilter = (newFilters: Filters) => {
        setFilters(newFilters);
        router.replace(buildURL(newFilters), { scroll: false });
    };


    useEffect(() => {
        console.log("products", products);

    }, [products])

    const clearFilters = () => applyFilter({
        sort: "newest", onSale: false,
        categories: [],
        sizes: [],
        colors: [],
        brands: [],
    });


    useEffect(() => {
        console.log("filteroptions", filterOptions);
        console.log("filters", filters);


    }, [filterOptions, filters])

    const sidebar = (
        <aside>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[hsl(40,20%,88%)]">
                <div className="flex items-center gap-2">
                    <RiFilterLine className="text-[hsl(174,62%,38%)]" />
                    <h2 className="font-bold text-sm text-[hsl(220,20%,15%)]">Filters</h2>
                </div>
                {activeFilterCount > 0 && (
                    <button
                        onClick={clearFilters}
                        className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all"
                        style={{
                            background: "hsl(0,84%,60%,0.08)",
                            color: "hsl(0,84%,50%)",
                            border: "1px solid hsl(0,84%,60%,0.2)",
                        }}
                    >
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
                        background: filters.onSale
                            ? "linear-gradient(135deg, hsl(15,85%,60%), hsl(25,85%,55%))"
                            : "hsl(40,33%,96%)",
                        color: filters.onSale ? "white" : "hsl(220,20%,35%)",
                    }}
                >
                    <RiFireLine />
                    On Sale Only
                </button>
            </div>

            {/* Categories */}
            <FilterSection title="Categories">
                {filterOptions.categories.map((cat) => (
                    <CheckItem
                        key={cat._id}
                        label={cat.name}
                        checked={filters.categories.includes(cat.name.toLowerCase())}
                        onChange={() => applyFilter({
                            ...filters,
                            categories: toggle(filters.categories, cat.name.toLowerCase()),
                        })}
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
                                    color: active ? "white" : "hsl(220,20%,35%)",
                                }}
                            >
                                {size}
                            </button>
                        );
                    })}
                </div>
            </FilterSection>

            {/* Colors */}
            <FilterSection title={`Colors (${filterOptions.colors.length})`}>
                <div className="space-y-1">
                    {filterOptions.colors.map((item) => (
                        <label
                            key={item.label}
                            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-gray-50 transition-colors"
                        >
                            <input
                                type="checkbox"
                                checked={filters.colors.includes(item.label)}
                                onChange={() => applyFilter({
                                    ...filters,
                                    colors: toggle(filters.colors, item.label),
                                })}
                                className="h-3.5 w-3.5 accent-gray-900 rounded"
                            />
                            {/* color swatch hata do — ab sirf label hai */}
                            <span className="text-sm text-gray-700 flex-1 capitalize">{item.label}</span>
                            <span className="text-xs text-gray-400">({item.count})</span>
                        </label>
                    ))}
                </div>
            </FilterSection>

            {/* Brands */}
            <FilterSection title="Brands">
                {filterOptions.brands.map((brand) => (
                    <div key={brand.name} className="flex items-center justify-between">
                        <CheckItem
                            label={brand.name}
                            checked={filters.brands.includes(brand.name)}
                            onChange={() => applyFilter({
                                ...filters,
                                brands: toggle(filters.brands, brand.name),
                            })}
                        />
                        <span className="text-xs text-gray-400 ml-2">({brand.count})</span>
                    </div>
                ))}
            </FilterSection>
        </aside>
    );

    return (
        <div className="min-h-screen" style={{ background: "hsl(40,33%,98%)" }}>

            {/* Top bar */}
            <div
                className="sticky top-0 z-30 px-4 py-3 sm:px-6 backdrop-blur-md"
                style={{ background: "hsl(40,33%,98%,0.92)", borderBottom: "1px solid hsl(40,20%,88%)" }}>
                <div className="mx-auto flex max-w-7xl items-center gap-3">
                    {/* Sort */}
                    <select
                        value={filters.sort}
                        onChange={(e) => applyFilter({ ...filters, sort: e.target.value })}

                        className="rounded-xl px-3 py-2.5 text-sm outline-none transition-all cursor-pointer"
                        style={{
                            background: "hsl(0,0%,100%)",
                            border: "1px solid hsl(40,20%,88%)",
                            color: "hsl(220,20%,15%)",
                        }}
                    >
                        {SORT_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                    </select>

                    {/* Grid toggle */}
                    <div className="hidden sm:flex items-center rounded-xl p-1 gap-1" style={{ background: "hsl(40,20%,92%)" }}>
                        {([3, 4] as const).map((n) => (
                            <button
                                key={n}
                                onClick={() => setGridCols(n)}
                                className="rounded-lg p-1.5 transition-all"
                                style={{
                                    background: gridCols === n ? "white" : "transparent",
                                    color: gridCols === n ? "hsl(174,62%,38%)" : "hsl(220,10%,55%)",
                                    boxShadow: gridCols === n ? "0 1px 4px hsl(220,20%,15%,0.1)" : "none",
                                }}
                            >
                                {n === 3 ? <RiListCheck className="text-base" /> : <RiGridFill className="text-base" />}
                            </button>
                        ))}
                    </div>

                    {/* Mobile filter */}
                    <button
                        onClick={() => setMobileSidebarOpen(true)}
                        className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all lg:hidden"
                        style={{
                            background: activeFilterCount > 0 ? "hsl(174,62%,38%)" : "hsl(0,0%,100%)",
                            color: activeFilterCount > 0 ? "white" : "hsl(220,20%,15%)",
                            border: "1px solid hsl(40,20%,88%)",
                        }}
                    >
                        <RiFilterLine />
                        Filters
                        {activeFilterCount > 0 && (
                            <span
                                className="flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold"
                                style={{ background: "white", color: "hsl(174,62%,38%)" }}
                            >
                                {activeFilterCount}
                            </span>
                        )}
                    </button>

                    {/* Result count */}
                    <span className="ml-auto hidden text-xs font-medium sm:block whitespace-nowrap" style={{ color: "hsl(220,10%,55%)" }}>
                        {products.length} results
                    </span>
                </div>
            </div>

            {/* Body */}
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6">
                <div className="flex gap-7">

                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block w-60 shrink-0">
                        <div
                            className="sticky top-20 rounded-2xl p-5"
                            style={{
                                background: "white",
                                border: "1px solid hsl(40,20%,88%)",
                                boxShadow: "0 2px 8px -2px hsl(220,20%,15%,0.08)",
                            }}
                        >
                            {sidebar}

                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1 min-w-0">

                        {/* Active filter chips */}
                        {activeFilterCount > 0 && (
                            <div className="mb-5 flex flex-wrap gap-2">
                                {filters.categories.map((name) => (
                                    <button
                                        key={name}
                                        onClick={() => applyFilter({ ...filters, categories: toggle(filters.categories, name) })}
                                        className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold capitalize"
                                        style={{
                                            background: "hsl(174,62%,38%,0.1)",
                                            color: "hsl(174,62%,35%)",
                                            border: "1px solid hsl(174,62%,38%,0.25)",
                                        }}
                                    >
                                        {name} <RiCloseLine />
                                    </button>
                                ))}
                                {filters.sizes.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => applyFilter({ ...filters, sizes: toggle(filters.sizes, s) })}
                                        className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                                        style={{
                                            background: "hsl(174,62%,38%,0.1)",
                                            color: "hsl(174,62%,35%)",
                                            border: "1px solid hsl(174,62%,38%,0.25)",
                                        }}
                                    >
                                        Size: {s} <RiCloseLine />
                                    </button>
                                ))}
                                {filters.colors.map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => applyFilter({ ...filters, colors: toggle(filters.colors, c) })}
                                        className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold capitalize"
                                        style={{
                                            background: "hsl(174,62%,38%,0.1)",
                                            color: "hsl(174,62%,35%)",
                                            border: "1px solid hsl(174,62%,38%,0.25)",
                                        }}
                                    >
                                        {c} <RiCloseLine />
                                    </button>
                                ))}
                                {filters.brands.map((b) => (
                                    <button
                                        key={b}
                                        onClick={() => applyFilter({ ...filters, brands: toggle(filters.brands, b) })}
                                        className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                                        style={{
                                            background: "hsl(174,62%,38%,0.1)",
                                            color: "hsl(174,62%,35%)",
                                            border: "1px solid hsl(174,62%,38%,0.25)",
                                        }}
                                    >
                                        {b} <RiCloseLine />
                                    </button>
                                ))}
                                {filters.onSale && (
                                    <button
                                        onClick={() => applyFilter({ ...filters, onSale: false })}
                                        className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                                        style={{
                                            background: "hsl(15,85%,60%,0.1)",
                                            color: "hsl(15,85%,45%)",
                                            border: "1px solid hsl(15,85%,60%,0.25)",
                                        }}
                                    >
                                        On Sale <RiCloseLine />
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Loading */}
                        {loading ? (
                            <div className={`grid gap-4 grid-cols-2 ${gridCols === 4 ? "sm:grid-cols-3 xl:grid-cols-4" : "sm:grid-cols-2 xl:grid-cols-3"}`}>
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div key={i} className="overflow-hidden rounded-2xl bg-white border border-[hsl(40,20%,88%)]">
                                        <div className="aspect-[4/5] animate-pulse bg-[hsl(40,20%,92%)]" />
                                        <div className="p-4 space-y-2">
                                            <div className="h-3 rounded-full animate-pulse w-16 bg-[hsl(40,20%,90%)]" />
                                            <div className="h-4 rounded-full animate-pulse bg-[hsl(40,20%,90%)]" />
                                            <div className="h-3 rounded-full animate-pulse w-20 bg-[hsl(40,20%,90%)]" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                        ) : !products.length ? (
                            <div className="flex flex-col items-center justify-center gap-4 py-28">
                                <div className="flex h-20 w-20 items-center justify-center rounded-3xl" style={{ background: "hsl(174,62%,38%,0.08)" }}>
                                    <RiSparklingLine className="text-3xl text-[hsl(174,62%,38%)]" />
                                </div>
                                <div className="text-center space-y-1">
                                    <p className="font-semibold text-[hsl(220,20%,15%)]">No products found</p>
                                    <p className="text-sm text-[hsl(220,10%,55%)]">Try adjusting your filters</p>
                                </div>
                                <button
                                    onClick={clearFilters}
                                    className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all bg-[hsl(174,62%,38%)]"
                                >
                                    Clear all filters
                                </button>
                            </div>

                        ) : (
                            <div className={`grid gap-4 grid-cols-2 ${gridCols === 4 ? "sm:grid-cols-3 xl:grid-cols-4" : "sm:grid-cols-2 xl:grid-cols-3"}`}>
                                
                                {products.map((product) => (
                                    <Products
                                        key={product._id} product={product} />
                                ))}


                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar Drawer */}
            <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${mobileSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <div
                    className="absolute inset-0 backdrop-blur-sm"
                    style={{ background: "hsl(220,20%,15%,0.5)" }}
                    onClick={() => setMobileSidebarOpen(false)}
                />
                <div
                    className={`absolute inset-y-0 left-0 overflow-y-auto p-5 transition-transform duration-300 ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
                    style={{ background: "white", maxWidth: "320px", width: "100%" }}
                >
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="font-bold text-base text-[hsl(220,20%,15%)]">Filters</h2>
                        <button
                            onClick={() => setMobileSidebarOpen(false)}
                            className="flex h-8 w-8 items-center justify-center rounded-xl transition-all bg-[hsl(40,20%,92%)]"
                        >
                            <RiCloseLine className="text-[hsl(220,20%,25%)]" />
                        </button>
                    </div>
                    {sidebar}


                </div>
            </div>
        </div>
    );
}



 