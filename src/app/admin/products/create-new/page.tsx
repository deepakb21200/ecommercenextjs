

// ========================= CREATE PRODUCT PAGE =========================

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  HiOutlineCheckCircle} from "react-icons/hi2";

import { BRANDS } from "@/config/constants";
import { ProductStatus } from "@/models/Product";

import { Category } from "@/components/admin/products/productstable/types";

import {
  createAdminProduct,
  getAdminCategories,
} from "@/components/admin/products/api";

import { ColorPicker } from "@/components/admin/products/ColorPicker";
import { SizeSelector } from "@/components/admin/products/SizeSelector";

import {
  ImagePicker,
  NewImageItem,
} from "@/components/admin/products/ImagePicker";

type ProductForm = {
  title: string;
  description: string;
  category: string;
  brand: string;
  price: string;
  salePercentage: string;
  stock: string;
  status: ProductStatus;
};

const defaultForm: ProductForm = {
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePercentage: "",
  stock: "",
  status: "active",
};

export default function CreateProductPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);

  const [form, setForm] = useState<ProductForm>(defaultForm);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [sizes, setSizes] = useState<string[]>([]);

  const [colors, setColors] = useState<any[]>([]);

  const [newImages, setNewImages] = useState<NewImageItem[]>([]);

  useEffect(() => {
    getAdminCategories().then((res) =>
      setCategories(res || [])
    );
  }, []);

  const handleChange = ( key: string,value: unknown) =>
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

  const toggleSize = (size: string) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  const handleSubmit = async ( e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!form.title.trim())
      return setError("Title is required");

    if (!form.category)
      return setError("Category is required");

    if (!form.brand)
      return setError("Brand is required");

    if (!form.price)
      return setError("Price is required");

    if (!form.stock)
      return setError("Stock is required");

    if (sizes.length === 0)
      return setError(
        "At least one size is required"
      );

    if (colors.length === 0)
      return setError(
        "At least one color is required"
      );

    if (newImages.length === 0)
      return setError(
        "At least one image is required"
      );

    const hasCover = newImages.some(
      (img) => img.isCover
    );

    if (!hasCover)
      return setError(
        "Please select a cover image"
      );

    try {
      setSaving(true);

      const coverImage = newImages.find( (img) => img.isCover)!;

      const coverIndex = newImages.indexOf(coverImage);

      const payload = {
        ...form,
        price: Number(form.price),
        salePercentage:
          Number(form.salePercentage) || 0,
        stock: Number(form.stock),
        existingImages: [],
        coverImagePublicId: `new-${coverIndex}`,
        colors,
        sizes,
      };

      await createAdminProduct( payload, newImages.map((img) => img.file));

      router.push("/admin/products");
    } catch (err: any) {
      setError(
        err.message || "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen">

      {/* <div className="mx-auto max-w-[1600px] space-y-8"> */}
         <div className="mx-auto   space-y-8">

        {/* HERO */}
        {/* <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#111827] via-[#0F172A] to-[#111827] p-6 sm:p-8 lg:p-10">

          <div className="absolute left-[-80px] top-[-80px] h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

          <div className="absolute bottom-[-100px] right-[-40px] h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <button
                onClick={() => router.back()}
                className="mb-5 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition-all hover:bg-white/10 hover:text-white"
              >
                <HiOutlineArrowLeft className="text-lg" />
                Back
              </button>

              <div className="flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-2xl shadow-violet-500/20">
                  <HiOutlineCube className="text-3xl text-white" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
                    Velvet Inventory
                  </p>

                  <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                    Create New Product
                  </h1>
                </div>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                Add premium products with colors,
                variants, pricing and inventory
                management.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 rounded-2xl border border-violet-500/20 bg-violet-500/10 px-5 py-3 backdrop-blur-xl">
              <HiOutlineSparkles className="text-lg text-violet-300" />

              <p className="text-sm font-medium text-violet-200">
                Premium Product Setup
              </p>
            </div>
          </div>
        </div> */}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-8"
        >

          {/* BASIC INFO */}
          <div className="rounded-[30px] border border-white/10 bg-[#111827]/70 p-6 backdrop-blur-xl lg:p-8">

            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                Product Information
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                Basic Details
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Product Title
                </label>

                <input  value={form.title}
                  onChange={(e) =>
                    handleChange("title", e.target.value) }
                  placeholder="Enter product title"
                  className="h-14 w-full rounded-2xl border border-white/10 bg-[#0B1120] px-4 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Brand
                </label>

                <select
                  value={form.brand}
                  onChange={(e) =>
                    handleChange(
                      "brand",
                      e.target.value
                    )
                  }
                  className="h-14 w-full rounded-2xl border border-white/10 bg-[#0B1120] px-4 text-sm text-white outline-none transition-all focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10"
                >
                  <option value="">
                    Select Brand
                  </option>

                  {BRANDS.map((b) => (
                    <option  key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Description
              </label>

              <textarea
                value={form.description}
                onChange={(e) =>
                  handleChange(
                    "description",  e.target.value )
                }
                placeholder="Write product description..."
                rows={5}
                className="w-full resize-none rounded-2xl border border-white/10 bg-[#0B1120] px-4 py-4 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10"
              />
            </div>
          </div>

          {/* CATEGORY */}
          <div className="grid gap-8 lg:grid-cols-2">

            <div className="rounded-[30px] border border-white/10 bg-[#111827]/70 p-6 backdrop-blur-xl lg:p-8">

              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                  Product Setup
                </p>

                <h2 className="mt-2 text-2xl font-bold text-white">
                  Category & Status
                </h2>
              </div>

              <div className="space-y-5">

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Category
                  </label>

                  <select
                    value={form.category}
                    onChange={(e) =>
                      handleChange(
                        "category",
                        e.target.value
                      )
                    }
                    className="h-14 w-full rounded-2xl border border-white/10 bg-[#0B1120] px-4 text-sm text-white outline-none transition-all focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10"
                  >
                    <option value="">
                      Select Category
                    </option>

                    {categories.map((c) => (
                      <option
                        key={c._id}
                        value={c._id}
                      >
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Product Status
                  </label>

                  <select
                    value={form.status}
                    onChange={(e) =>
                      handleChange(
                        "status",
                        e.target
                          .value as ProductStatus
                      )
                    }
                    className="h-14 w-full rounded-2xl border border-white/10 bg-[#0B1120] px-4 text-sm text-white outline-none transition-all focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10"
                  >
                    <option value="active">
                      Active
                    </option>

                    <option value="inactive">
                      Inactive
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* PRICING */}
            <div className="rounded-[30px] border border-white/10 bg-[#111827]/70 p-6 backdrop-blur-xl lg:p-8">

              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                  Pricing Setup
                </p>

                <h2 className="mt-2 text-2xl font-bold text-white">
                  Pricing & Stock
                </h2>
              </div>

              <div className="grid gap-5">

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Price (₹)
                  </label>

                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      handleChange(
                        "price",
                        e.target.value
                      )
                    }
                    placeholder="0"
                    className="h-14 w-full rounded-2xl border border-white/10 bg-[#0B1120] px-4 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Sale Percentage
                  </label>

                  <input
                    type="number"
                    value={form.salePercentage}
                    onChange={(e) =>
                      handleChange(
                        "salePercentage",
                        e.target.value
                      )
                    }
                    placeholder="0"
                    className="h-14 w-full rounded-2xl border border-white/10 bg-[#0B1120] px-4 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Stock
                  </label>

                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) =>
                      handleChange(
                        "stock",
                        e.target.value
                      )
                    }
                    placeholder="0"
                    className="h-14 w-full rounded-2xl border border-white/10 bg-[#0B1120] px-4 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* VARIANTS */}
          <div className="rounded-[30px] border border-white/10 bg-[#111827]/70 p-6 backdrop-blur-xl lg:p-8">

            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                Product Variants
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                Colors & Sizes
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2  ">

              <div className="">
                <label className="mb-4 block text-sm font-medium text-zinc-300">
                  Colors
                </label>

                <ColorPicker
                  colors={colors}
                  setColors={setColors}
                />
              </div>

              <div className="">
                <label className="mb-4 block text-sm font-medium text-zinc-300">
                  Sizes
                </label>

                <SizeSelector
                  selectedSizes={sizes}
                  onToggle={toggleSize}
                />
              </div>
            </div>
          </div>

          {/* IMAGES */}
          <div className="rounded-[30px] border border-white/10 bg-[#111827]/70 p-6 backdrop-blur-xl lg:p-8">

            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                Product Gallery
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                Upload Images
              </h2>
            </div>

            <ImagePicker
              newImages={newImages}
              setNewImages={setNewImages}
            />
          </div>

          {/* FOOTER */}
          <div className="sticky bottom-0 z-20 rounded-[28px] border border-white/10 bg-[#111827]/90 p-5 backdrop-blur-2xl">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>
                {error && (
                  <p className="text-sm font-medium text-red-400">
                    {error}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">

                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      "/admin/products"
                    )
                  }
                  className="h-14 rounded-2xl border border-white/10 bg-white/5 px-6 text-sm font-medium text-zinc-300 transition-all hover:bg-white/10 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-7 text-sm font-semibold text-white shadow-2xl shadow-violet-500/20 transition-all hover:scale-[1.01] disabled:opacity-50"
                >
                  {saving ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                  ) : (
                    <HiOutlineCheckCircle className="text-lg" />
                  )}

                  {saving
                    ? "Creating Product..."
                    : "Create Product"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}




