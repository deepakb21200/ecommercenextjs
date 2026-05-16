
  // const [form, setForm] = useState({
  //   title: "",
  //   description: "",
  //   category: "",
  //   brand: "",
  //   price: "",
  //   salePercentage: "",
  //   stock: "",
  //   status: "active" as ProductStatus,
  //   colors: [] as string[],
  //   sizes: [] as string[],
  // });



 
"use client";

import { useEffect, useState } from "react";
import { FiX, FiSave, FiPackage } from "react-icons/fi";
import { Category, Product, ProductImage, ProductStatus } from "./productstable/types";
import { createAdminProduct, updateAdminProduct } from "./api";
import { BRANDS } from "@/config/constants";
import { ColorPicker } from "./ColorPicker";
import { SizeSelector } from "./SizeSelector";
import { ImagePicker } from "./ImagePicker";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  product: Product | null;
  onSaved: () => Promise<void>;
};


type ProductForm = {
  title: string;
  description: string;
  category: string;
  brand: string;
  price: string;
  salePercentage: string;
  stock: string;
  status: ProductStatus;
  colors: string[];
  sizes: string[];
};




const inputClass =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100";

const labelClass =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400";

export function ProductDialog({ open, onOpenChange, categories, product, onSaved }: Props) {


  const [form, setForm] = useState<ProductForm>({
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePercentage: "",
  stock: "",
  status: "active",
  colors: [],
  sizes: [],
});


  const [files, setFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
  const [coverImagePublicId, setCoverImagePublicId] = useState("");
  const [saving, setSaving] = useState(false);

  const isEditMode = !!product;

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title,
        description: product.description,
        category: product.category._id,
        brand: product.brand,
        price: String(product.price),
        salePercentage: String(product.salePercentage),
        stock: String(product.stock),
        status: product.status,
        colors: product.colors || [],
        sizes: product.sizes || [],
      });
      setExistingImages(product.images || []);
      const cover = product.images?.find((img) => img.isCover);
      setCoverImagePublicId(cover?.publicId || "");
    }
  }, [product]);

  if (!open) return null;

  const handleChange = (key: string, value: unknown) => setForm((prev) => ({ ...prev, [key]: value }));

  const toggleSize = (size: string) =>
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size) ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
    }));

  const addColor = (color: string) =>
    setForm((prev) => ({ ...prev, colors: prev.colors.includes(color) ? prev.colors : [...prev.colors, color] }));

  const removeColor = (color: string) =>
    setForm((prev) => ({ ...prev, colors: prev.colors.filter((c) => c !== color) }));

  const handleClose = () => {
    onOpenChange(false);
    setForm({ title: "", description: "", category: "", brand: "", price: "", salePercentage: "", stock: "", status: "active", colors: [], sizes: [] });
    setFiles([]);
    setExistingImages([]);
    setCoverImagePublicId("");
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      const payload = {
        ...form,
        price: Number(form.price),
        salePercentage: Number(form.salePercentage) || 0,
        stock: Number(form.stock),
        existingImages,
        coverImagePublicId,
      };
      if (product) await updateAdminProduct(product._id, payload, files);
      else await createAdminProduct(payload, files);
      await onSaved();
      handleClose();
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
      <div
        className="flex w-full max-w-4xl flex-col rounded-2xl border border-slate-200 bg-white shadow-xl"
        style={{ maxHeight: "92vh" }}
      >

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600">
              <FiPackage className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-800">
                {isEditMode ? "Update Product" : "Create Product"}
              </h2>
              <p className="text-xs text-slate-400">
                {isEditMode ? "Edit product details below" : "Fill in product details below"}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">

          {/* Title + Brand */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>Title</label>
              <input value={form.title} onChange={(e) => handleChange("title", e.target.value)} placeholder="Product title" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Brand</label>
              <select value={form.brand} onChange={(e) => handleChange("brand", e.target.value)} className={inputClass}>
                <option value="">Select brand</option>
                {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Description</label>
            <textarea value={form.description} onChange={(e) => handleChange("description", e.target.value)} placeholder="Product description..." rows={3} className={`${inputClass} resize-none`} />
          </div>

          {/* Category + Status */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>Category</label>
              <select value={form.category} onChange={(e) => handleChange("category", e.target.value)} className={inputClass}>
                <option value="">Select category</option>
                {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select value={form.status} onChange={(e) => handleChange("status", e.target.value as ProductStatus)} className={inputClass}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Price + Sale + Stock */}
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className={labelClass}>Price (₹)</label>
              <input type="number" value={form.price} onChange={(e) => handleChange("price", e.target.value)} placeholder="0" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Sale %</label>
              <input type="number" value={form.salePercentage} onChange={(e) => handleChange("salePercentage", e.target.value)} placeholder="0" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Stock</label>
              <input type="number" value={form.stock} onChange={(e) => handleChange("stock", e.target.value)} placeholder="0" className={inputClass} />
            </div>
          </div>

          {/* Colors + Sizes */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className={labelClass}>Colors</label>
              <ColorPicker colors={form.colors} onAdd={addColor} onRemove={removeColor} />
            </div>
            <div>
              <label className={labelClass}>Sizes</label>
              <SizeSelector selectedSizes={form.sizes} onToggle={toggleSize} />
            </div>
          </div>

          {/* Images */}
          <div>
            <label className={labelClass}>Images</label>
            <ImagePicker
              existingImages={existingImages}
              newFiles={files}
              coverImagePublicId={coverImagePublicId}
              onFilesAdd={(f) => { if (!f) return; setFiles(Array.from(f)); }}

              onExistingRemove={(id) => setExistingImages((prev) => prev.filter((img) => img.publicId !== id))}
              onCoverImageChange={setCoverImagePublicId}
            />
          </div>

        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button
            onClick={handleClose}
            className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <FiSave className="h-4 w-4" />
            )}
            {saving ? "Saving..." : isEditMode ? "Update" : "Create"}
          </button>
        </div>

      </div>
    </div>
  );
}