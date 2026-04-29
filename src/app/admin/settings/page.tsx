



"use client";

import AdminSettingsBannersTable from "@/components/admin/orders/BannerTable";
import { deleteAdminBanner, getAdminBanners, uploadAdminBanners } from "@/components/admin/settings/api";
import { useEffect, useMemo, useState } from "react";
import { RiImageAddLine, RiRefreshLine, RiUploadCloud2Line, RiImageLine } from "react-icons/ri";

type AdminBanner = {
  _id: string;
  imageUrl: string;
  imagePublicId: string;
  createdAt: string;
};

export default function AdminSettings() {
  const [items, setItems] = useState<AdminBanner[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await getAdminBanners();
      setItems(res.items || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBanners(); }, []);

  const handleUpload = async () => {
    if (!files.length) return;
    try {
      setUploading(true);
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));
      const res = await uploadAdminBanners(formData);
      setItems(res.items || []);
      setFiles([]);
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
    <div className=" bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto   space-y-6">

        {/* Page Header */}
        {/* <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">Configuration</p>
          <div className="mt-1 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <RiImageLine className="text-sm text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-slate-800">Settings</h1>
          </div>
          <p className="mt-0.5 text-sm text-slate-400">Manage your store banners</p>
        </div> */}

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">

          {/* Upload Card */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 px-5 py-4">
              <p className="text-sm font-semibold text-slate-700">Upload Banners</p>
              <p className="mt-0.5 text-xs text-slate-400">JPG, PNG, WEBP supported</p>
            </div>

            <div className="space-y-4 p-5">
              {/* Drop zone */}
              <label
                htmlFor="banner-upload"
                className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-200 p-8 transition-all hover:border-indigo-300 hover:bg-indigo-50/30 group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 transition-colors group-hover:bg-indigo-100">
                  <RiImageAddLine className="text-2xl text-slate-400 group-hover:text-indigo-500" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-700">Click to choose files</p>
                  <p className="mt-0.5 text-xs text-slate-400">or drag and drop here</p>
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

              {/* File label */}
              {files.length > 0 && (
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                  <RiImageLine className="shrink-0 text-slate-400" />
                  <span className="truncate text-xs text-slate-600">{fileLabel}</span>
                  <span className="ml-auto shrink-0 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-xs font-medium text-slate-500">
                    {files.length}
                  </span>
                </div>
              )}

              {/* Upload button */}
              <button
                onClick={handleUpload}
                disabled={uploading || !files.length}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <RiUploadCloud2Line className="text-base" />
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>

          {/* Table Card */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-slate-700">Banners</p>
                <p className="mt-0.5 text-xs text-slate-400">{items.length} total</p>
              </div>
              <button
                onClick={fetchBanners}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
              >
                <RiRefreshLine className={loading ? "animate-spin" : ""} />
                Refresh
              </button>
            </div>

            <div className="p-5">
              {loading ? (
                <div className="flex flex-col items-center justify-center gap-3 py-16">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-500" />
                  <p className="text-sm text-slate-400">Loading banners...</p>
                </div>
              ) : !items.length ? (
                <div className="flex flex-col items-center justify-center gap-2 py-16">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                    <RiImageLine className="text-2xl text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-500">No banners found</p>
                  <p className="text-xs text-slate-400">Upload images to get started</p>
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
    </div>
  );
}