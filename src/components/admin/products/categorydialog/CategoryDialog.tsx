
"use client";

import { useRef, useState } from "react";
import {
  FiX,
  FiPlus,
  FiTag,
  FiEdit2,
  FiTrash2,
  FiImage,
} from "react-icons/fi";
import { Category } from "../productstable/types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  onSaved: () => Promise<void>;
};

export function CategoryDialog({
  open,
  onOpenChange,
  categories,
  onSaved,
}: Props) {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setName("");
    setImage(null);
    setEditingId(null);
      setExistingImage(""); // <-- ye zaroor clear karo
    setSaving(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =========================
  // CLOSE DIALOG
  // =========================
  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  // =========================
  // ADD CATEGORY
  // =========================
  const handleAdd = async () => {
    if (!name.trim()) return;

    if (!image) {
      alert("Category image is required");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("image", image);

      const res = await fetch("/api/admin/categories", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to create category");
      }

      resetForm();
      await onSaved();
    } catch (error: any) {
      alert(error.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // UPDATE CATEGORY
  // =========================
 

  const handleUpdate = async (categoryId: string) => {
  if (!name.trim()) return;

  try {
    setSaving(true);

    const formData = new FormData();
    formData.append("name", name.trim());

    // Sirf tab image bhejo jab user ne new image select ki ho
    if (image instanceof File) {
      formData.append("image", image);
    }

    const res = await fetch(`/api/admin/categories/${categoryId}`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to update category");
    }

    // Updated category se existing image URL dobara set karo
    setEditingId(data._id);
    setName(data.name);
    setImage(null); // file clear

    // Existing image preview dikhane ke liye
    setExistingImage(data.image || "");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    await onSaved();
  } catch (error: any) {
    alert(error.message || "Something went wrong");
  } finally {
    setSaving(false);
  }
};

  // =========================
  // DELETE CATEGORY
  // =========================
  const handleDelete = async (categoryId: string) => {
    const confirmed = confirm("Delete this category?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/categories/${categoryId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to delete category");
      }

      // If deleting currently edited category
      if (editingId === categoryId) {
        resetForm();
      }

      await onSaved();
    } catch (error: any) {
      alert(error.message || "Something went wrong");
    }
  };

  // =========================
  // START EDIT
 
  const startEdit = (category: Category) => {
  setEditingId(category._id);
  setName(category.name);

  // New file abhi selected nahi hai
  setImage(null);

  // Existing image URL save karo
  setExistingImage(category.image || "");

  // File input reset
  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};
  // =========================
  // CANCEL EDIT
  // =========================
  const cancelEdit = () => {
    resetForm();
  };

  if (!open) return null;

  return (

    <>
    {/* Overlay */}
<div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070B14]/80 p-4 backdrop-blur-md">
  {/* Dialog */}
  <div className="relative w-full max-w-2xl overflow-hidden rounded-[30px] border border-white/10 bg-[#111827]
   shadow-2xl backdrop-blur-xl">

    {/* Glow Effects */}
    <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />
    <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />

    {/* Header */}
    <div className="relative flex items-center justify-between border-b border-white/10 px-6 py-5 lg:px-8">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-xl shadow-violet-500/20">
          <FiTag className="h-5 w-5 text-white" />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Category Management
          </p>
          <h2 className="mt-1 text-xl font-bold text-white">
            Manage Categories
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Create, update and organize your store categories
          </p>
        </div>
      </div>

      <button
        onClick={handleClose}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition hover:bg-white/10 hover:text-white"
      >
        <FiX className="h-5 w-5" />
      </button>
    </div>

    {/* Body */}
    <div className="relative space-y-6 p-6 lg:p-8">

      {/* Form */}
      <div className="rounded-[24px] border border-white/10 bg-[#0B1120]/70 p-5 backdrop-blur-xl space-y-4">

        {/* Name */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Category Name
          </label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="w-full rounded-2xl border border-white/10 bg-[#0B1120] px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition-all focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10"
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Category Image
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-white/10 bg-[#0B1120] px-4 py-3 text-sm text-zinc-400 transition hover:bg-white/[0.03]">
            <FiImage className="h-4 w-4 text-cyan-400" />

            {(image || existingImage) && (
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : existingImage
                }
                alt="Preview"
                className="h-10 w-10 rounded-xl object-cover border border-white/10"
              />
            )}

            <span>
              {image
                ? image.name
                : existingImage
                ? "Current image"
                : editingId
                ? "Choose new image (optional)"
                : "Upload category image"}
            </span>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setImage(file);
              }}
            />
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 pt-2">
          {editingId ? (
            <>
              <button
                onClick={() => handleUpdate(editingId)}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:opacity-90 disabled:opacity-50"
              >
                <FiEdit2 className="h-4 w-4" />
                {saving ? "Updating..." : "Update Category"}
              </button>

              <button
                onClick={cancelEdit}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleAdd}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:opacity-90 disabled:opacity-50"
            >
              <FiPlus className="h-4 w-4" />
              {saving ? "Adding..." : "Add Category"}
            </button>
          )}
        </div>
      </div>

      {/* Categories List */}
      <div className="max-h-60 space-y-3 overflow-y-auto pr-1">
        {categories.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-16">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/5">
              <FiTag className="text-4xl text-zinc-500" />
            </div>

            <div className="text-center">
              <p className="text-lg font-semibold text-white">
                No Categories Found
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                Create your first product category
              </p>
            </div>
          </div>
        ) : (
          categories.map((category) => (
            <div
              key={category._id}
              className="rounded-[20px] border border-white/10 bg-[#111827]/60 p-3 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between gap-3">

                {/* Left */}
                <div className="flex items-center gap-3 min-w-0">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-14 w-14 flex-shrink-0 rounded-xl border border-white/10 object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0B1120]">
                      <FiImage className="text-zinc-500" />
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {category.name}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Product Category
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEdit(category)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition hover:bg-violet-500/10 hover:text-violet-300"
                  >
                    <FiEdit2 className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(category._id)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition hover:bg-red-500/10 hover:text-red-400"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>

    {/* Footer */}
    <div className="relative border-t border-white/10 bg-[#0B1120]/70 px-6 py-5 lg:px-8">
      <button
        onClick={handleClose}
        className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white"
      >
        Done
      </button>
    </div>
  </div>
</div>
    </>
  );
}
 