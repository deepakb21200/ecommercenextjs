











"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiPackage, FiSave } from "react-icons/fi";
import { BRANDS } from "@/config/constants";
import { ProductStatus } from "@/models/Product";
import { Category } from "@/components/admin/products/productstable/types";
import { getAdminCategories, getAdminProductById, updateAdminProduct } from "@/components/admin/products/api";
import { ImagePicker, NewImageItem, ProductImage } from "@/components/admin/products/ImagePicker";
import { ColorPicker } from "@/components/admin/products/ColorPicker";
import { SizeSelector } from "@/components/admin/products/SizeSelector";

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

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [form, setForm] = useState<ProductForm>({
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePercentage: "",
    stock: "",
    status: "active",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<NewImageItem[]>([]);
  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
  const [existingCoverPublicId, setExistingCoverPublicId] = useState("");



  const handleChange = (key: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleSize = (size: string) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

    useEffect(() => {
    if (!id) return;
    Promise.all([
      getAdminProductById(id),
      getAdminCategories(),
    ]).then(([product, categoriesRes]) => {
      setCategories(categoriesRes || []);
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
        });
        setColors(product.colors || []);
        setSizes(product.sizes || []);
        setExistingImages(product.images || []);
        const cover = product.images?.find((img: ProductImage) => img.isCover);
        setExistingCoverPublicId(cover?.publicId || "");
      }
    }).finally(() => setLoading(false));
  }, [id]);
  const handleSubmit = async () => {
    setError("");

    if (!form.title.trim()) return setError("Title is required");
    if (!form.category) return setError("Category is required");
    if (!form.brand) return setError("Brand is required");
    if (!form.price) return setError("Price is required");
    if (!form.stock) return setError("Stock is required");
    if (sizes.length === 0) return setError("At least one size is required");
    if (colors.length === 0) return setError("At least one color is required");

    const totalImages = existingImages.length + newImages.length;
    if (totalImages === 0) return setError("At least one image is required");

    const coverInExisting = existingImages.some((img) => img.publicId === existingCoverPublicId);
    const coverInNew = newImages.some((img) => img.isCover);
    if (!coverInExisting && !coverInNew) return setError("Please select a cover image");

    try {
      setSaving(true);

      const coverNewImage = newImages.find((img) => img.isCover);
      const coverNewIndex = coverNewImage ? newImages.indexOf(coverNewImage) : -1;
      const finalCoverPublicId = coverNewImage ? `new-${coverNewIndex}` : existingCoverPublicId;

      const payload = {
        ...form,
        price: Number(form.price),
        salePercentage: Number(form.salePercentage) || 0,
        stock: Number(form.stock),
        existingImages,
        coverImagePublicId: finalCoverPublicId,
        colors,
        sizes,
  
      };

      console.log("update paylod hai ", payload, id);
      

      await updateAdminProduct(id, payload, newImages.map((img) => img.file));
      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-800" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top bar */}
      <div className="sticky top-0 z-10 border-b border-gray-100 bg-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition"
          >
            <FiArrowLeft className="h-4 w-4" />
            Back
          </button>
          <span className="text-gray-300">/</span>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-900">
              <FiPackage className="h-3.5 w-3.5 text-white" />
            </div>
            <h1 className="text-sm font-semibold text-gray-800">Edit Product</h1>
          </div>
          <span className="text-xs text-gray-400 font-mono">{id}</span>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-4xl px-6 py-8 space-y-6">

        <div className="rounded-xl border border-gray-100 bg-white p-6 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Basic Info</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">Title</label>
              <input
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Product title"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400 transition"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">Brand</label>
              <select
                value={form.brand}
                onChange={(e) => handleChange("brand", e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400 transition"
              >
                <option value="">Select brand</option>
                {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-600">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Product description..."
              rows={3}
              className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400 transition"
            />
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Category & Status</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">Category</label>
              <select
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400 transition"
              >
                <option value="">Select category</option>
                {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">Status</label>
              <select
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value as ProductStatus)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400 transition"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Pricing & Stock</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">Price (₹)</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)}
                placeholder="0"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400 transition"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">Sale %</label>
              <input
                type="number"
                value={form.salePercentage}
                onChange={(e) => handleChange("salePercentage", e.target.value)}
                placeholder="0"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400 transition"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">Stock</label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => handleChange("stock", e.target.value)}
                placeholder="0"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400 transition"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Variants</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">Colors</label>
              <ColorPicker colors={colors} setColors={setColors} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">Sizes</label>
              <SizeSelector selectedSizes={sizes} onToggle={toggleSize} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Images</h2>
          <ImagePicker
            newImages={newImages}
            setNewImages={setNewImages}
            existingImages={existingImages}
            setExistingImages={setExistingImages}
            existingCoverPublicId={existingCoverPublicId}
            setExistingCoverPublicId={setExistingCoverPublicId}
          />
        </div>

        <div className="flex items-center gap-3">
          {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
          <button
            onClick={() => router.push("/admin/products")}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50 transition"
          >
            {saving ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <FiSave className="h-4 w-4" />
            )}
            {saving ? "Updating..." : "Update Product"}
          </button>
        </div>

      </div>
    </div>
  );
}