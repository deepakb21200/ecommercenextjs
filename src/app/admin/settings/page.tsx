"use client";

import AdminSettingsBannersTable from "@/components/admin/orders/BannerTable";
import { deleteAdminBanner, getAdminBanners, uploadAdminBanners } from "@/components/admin/settings/api";
import { AdminHero } from "@/utils/AdminHero";
import { useEffect, useMemo, useState } from "react";
import {
  RiImageAddLine,
  RiRefreshLine,
  RiUploadCloud2Line,
  RiImageLine,
  RiSparklingLine,
} from "react-icons/ri";

type AdminBanner = {
  _id: string;
  imageUrl: string;
  imagePublicId: string;
  createdAt: string;
};

export default function AdminSettings() {
  const [items, setItems]       = useState<AdminBanner[]>([]);
  const [files, setFiles]       = useState<File[]>([]);
  const [loading, setLoading]   = useState(true); 
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await getAdminBanners();
      setItems(res.items || []);
    } catch (err: unknown) {
      console.error("Failed to fetch banners:", err instanceof Error ? err.message : err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   fetchBanners();
  }, []);

  const handleUpload = async () => {
    if (!files.length) return;
    try {
      setUploading(true);
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));
      const res = await uploadAdminBanners(formData);
      setItems(res.items || []);
      setFiles([]);
    } catch (err: unknown) {
      console.error("Failed to upload banners:", err instanceof Error ? err.message : err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Delete this banner?");
    if (!confirmed) return;
    try {
      setDeletingId(id);
      const res = await deleteAdminBanner(id);
      setItems(res.items || []);
    } catch (err: unknown) {
      console.error("Failed to delete banner:", err instanceof Error ? err.message : err);
    } finally {
      setDeletingId("");
    }
  };

  const fileLabel = useMemo(() => {
    if (!files.length) return "No files selected";
    if (files.length === 1) return files[0].name;
    return `${files.length} files selected`;
  }, [files]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1600px] space-y-8">

        <AdminHero
          badgeText="Nova Banners"
          title="Banner Settings"
          description="Upload homepage banners, manage visual campaigns and organize storefront media assets from one premium dashboard."
          rightText="Media Control Center"
          icon={<RiImageLine className="text-3xl text-white" />}
          rightIcon={<RiSparklingLine className="text-lg text-fuchsia-300" />}
        />

        <div className="grid gap-7 items-start 2xl:grid-cols-[380px_1fr]">

          {/* ── Upload Card ── */}
          <div className="rounded-[30px] bg-[#111827]/70 p-5 shadow-2xl backdrop-blur-xl">
            <div className="mb-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">Upload Center</p>
              <h2 className="mt-2 text-2xl font-bold text-white">Upload Banners</h2>
            </div>

            <div className="space-y-5">
              {/* Drop zone */}
              <label
                htmlFor="banner-upload"
                className="group flex cursor-pointer flex-col items-center justify-center gap-4 rounded-[28px] border border-dashed border-white/10 bg-[#0B1120]/70 p-10 transition-all duration-300 hover:border-fuchsia-500/30 hover:bg-fuchsia-500/[0.03]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/5 transition-all duration-300 group-hover:scale-105 group-hover:bg-fuchsia-500/10">
                  <RiImageAddLine className="text-4xl text-zinc-400 transition-colors group-hover:text-fuchsia-300" />
                </div>
                <div className="text-center">
                  <p className="text-base font-semibold text-white">Click to choose banners</p>
                  <p className="mt-1 text-sm text-zinc-500">JPG, PNG, WEBP supported</p>
                </div>
                <input
                  id="banner-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFiles(Array.from(e.target.files || []))}
                />
              </label>

              {/* Selected files info */}
              {files.length > 0 && (
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0B1120] px-4 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-500/10">
                    <RiImageLine className="text-lg text-fuchsia-300" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">{fileLabel}</p>
                    <p className="mt-0.5 text-xs text-zinc-500">Ready for upload</p>
                  </div>
                </div>
              )}

              {/* Upload button */}
              <button
                onClick={() => void handleUpload()}
                disabled={uploading || !files.length}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-sky-500 px-5 py-4 text-sm font-semibold text-white shadow-xl shadow-fuchsia-500/20 transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <RiUploadCloud2Line className="text-lg" />
                {uploading ? "Uploading..." : "Upload Banners"}
              </button>
            </div>
          </div>

          {/* ── Banner Table ── */}
          <div className="rounded-[30px] bg-[#111827]/70 p-5 shadow-2xl backdrop-blur-xl lg:p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">Media Library</p>
                <h2 className="mt-2 text-2xl font-bold text-white">Banner Collection</h2>
              </div>
              <button
                onClick={() => void fetchBanners()}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-zinc-300 transition-all hover:bg-white/[0.05]"
              >
                <RiRefreshLine className={loading ? "animate-spin" : ""} />
                Refresh
              </button>
            </div>

            {/* ✅ Loading pehle check hoga — No Banners sirf tab jab loading false aur items empty */}
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-4 py-24">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-700 border-t-fuchsia-500" />
                <p className="text-sm text-zinc-500">Loading banners...</p>
              </div>
            ) : !items.length ? (
              <div className="flex flex-col items-center gap-5 py-24">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/5">
                  <RiImageLine className="text-4xl text-zinc-500" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-white">No Banners Found</p>
                  <p className="mt-1 text-sm text-zinc-500">Upload your first banner to begin</p>
                </div>
              </div>
            ) : (
              <AdminSettingsBannersTable
                items={items}
                deletingId={deletingId}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}








