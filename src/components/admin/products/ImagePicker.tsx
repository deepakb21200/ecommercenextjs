"use client";

import { useEffect, useMemo } from "react";
import { FaImage, FaStar, FaTimes } from "react-icons/fa";
import { ProductImage } from "./productstable/types";
 

type Props = {
  existingImages: ProductImage[];
  newFiles: File[];
  coverImagePublicId: string;
  onFilesAdd: (files: FileList | null) => void;
  onExistingRemove: (id: string) => void;
  onCoverImageChange: (id: string) => void;
};

export function ImagePicker({
  existingImages,
  newFiles,
  coverImagePublicId,
  onFilesAdd,
  onExistingRemove,
  onCoverImageChange,
}: Props) {
  const previews = useMemo(
    () => newFiles.map((f) => ({ file: f, url: URL.createObjectURL(f) })),
    [newFiles]
  );

  useEffect(() => {
    return () => previews.forEach((p) => URL.revokeObjectURL(p.url));
  }, [previews]);

  return (
    <div className="space-y-4">
      
      {/* Upload */}
      <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer hover:bg-gray-50 transition">
        <FaImage className="text-gray-400 text-xl mb-2" />
        <span className="text-sm font-medium">Upload Images</span>
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => onFilesAdd(e.target.files)}
        />
      </label>

      {/* Existing */}
      {existingImages.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">Existing Images</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {existingImages.map((img) => {
              const isCover = coverImagePublicId === img.publicId;

              return (
                <div key={img.publicId} className="border rounded-xl overflow-hidden">
                  <img src={img.url} className="h-28 w-full object-cover" />

                  <div className="flex justify-between p-2">
                    <button
                      onClick={() => onCoverImageChange(img.publicId)}
                      className={`text-xs px-2 py-1 rounded flex items-center gap-1
                        ${isCover ? "bg-green-100 text-green-700" : "bg-gray-100"}
                      `}
                    >
                      <FaStar />
                      {isCover ? "Cover" : "Set"}
                    </button>

                    <button
                      onClick={() => onExistingRemove(img.publicId)}
                      className="text-red-500"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* New Files */}
      {previews.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">New Uploads</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {previews.map((p, i) => (
              <div key={i} className="border rounded-xl overflow-hidden">
                <img src={p.url} className="h-28 w-full object-cover" />
                <p className="text-xs p-2 truncate">{p.file.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}