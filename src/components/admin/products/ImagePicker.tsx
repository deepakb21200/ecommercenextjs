

// ye bhi chatgpt ka isme prps me default valeus nhi hia 



"use client";

import { useEffect, useMemo } from "react";
import { FaImage, FaStar, FaTimes } from "react-icons/fa";

export type ProductImage = {
  url: string;
  publicId: string;
  isCover: boolean;
};

export type NewImageItem = {
  id: string;
  file: File;
  isCover: boolean;
};

type Props = {
  newImages: NewImageItem[];
  setNewImages: React.Dispatch<React.SetStateAction<NewImageItem[]>>;

  existingImages?: ProductImage[];
  setExistingImages?: React.Dispatch<React.SetStateAction<ProductImage[]>>;

  existingCoverPublicId?: string;
  setExistingCoverPublicId?: React.Dispatch<React.SetStateAction<string>>;
};

export function ImagePicker({
  newImages,
  setNewImages,
  existingImages,
  setExistingImages,
  existingCoverPublicId,
  setExistingCoverPublicId,
}: Props) {

  // ✅ previews
  const previews = useMemo(
    () => newImages.map((item) => ({
      ...item,
      url: URL.createObjectURL(item.file),
    })),
    [newImages]
  );

  useEffect(() => {
    return () => previews.forEach((p) => URL.revokeObjectURL(p.url));
  }, [previews]);

  // ✅ add files
  const handleFilesAdd = (files: FileList | null) => {
    if (!files) return;

    const items: NewImageItem[] = [];

    for (const file of Array.from(files)) {
      items.push({
        id: crypto.randomUUID(),
        file,
        isCover: false,
      });
    }

    setNewImages((prev) => [...prev, ...items]);
  };

  // ✅ remove new
  const handleNewRemove = (id: string) => {
    setNewImages((prev) => prev.filter((img) => img.id !== id));
  };

  // ✅ toggle new cover

  const handleNewCover = (id: string) => {
    setNewImages((prev) =>
      prev.map((img) => ({
        ...img,
        isCover: img.id === id,
      }))
    );

    setExistingCoverPublicId?.("");
  };



  // ✅ remove existing
  const handleExistingRemove = (publicId: string) => {
    if (!setExistingImages) return;

    setExistingImages((prev) =>
      prev.filter((img) => img.publicId !== publicId)
    );

    if (existingCoverPublicId === publicId) {
      setExistingCoverPublicId?.("");
    }
  };

  // ✅ toggle existing cover
  const handleExistingCover = (publicId: string) => {
    if (!setExistingCoverPublicId) return;

    setExistingCoverPublicId((prev) =>
      prev === publicId ? "" : publicId
    );

    // reset new covers
    setNewImages((prev) =>
      prev.map((img) => ({ ...img, isCover: false }))
    );
  };



  return (
    <div className="space-y-4">

      {/* Upload */}
      <label className="flex text-white flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer hover:bg-violet-500/10 transition">
        <FaImage className=" text-xl mb-2" />
        <span className="text-sm font-medium">Upload Images</span>

        <input
          type="file" multiple accept="image/*" className="hidden"
          onChange={(e) => {
            handleFilesAdd(e.target.files);
          }} />
      </label>

      {/* EXISTING */}
      {existingImages && existingImages.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">Existing Images</p>

          <div className="grid   xl:grid-cols-3 gap-5">
            {existingImages.map((img) => {
              const isCover = existingCoverPublicId === img.publicId;

              return (
                <div key={img.publicId} className="border rounded-xl   h-[700px] pb-10 ">
                  <div className="flex justify-between p-2  ">
                    <button
                      type="button"
                      onClick={() => handleExistingCover(img.publicId)}
                      className={`text-md px-2 py-1 rounded flex items-center gap-1
                        ${isCover ? "bg-green-100 text-green-700" : ""}`}
                    >
                      <FaStar />
                      {isCover ? "Uncover" : "Set Cover"}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleExistingRemove(img.publicId)}
                      className="text-red-500"
                    >
                      <FaTimes />
                    </button>
                  </div>
                  <img src={img.url} className="h-full w-full object-cover  " />


                </div>
              );
            })}
          </div>
        </div>
      )}





      {/* NEW */}
      {previews.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">New Uploads</p>

          <div className="grid   xl:grid-cols-3 gap-5">
            {previews.map((item) => (
              <div key={item.id} className="border rounded-xl overflow-hidden h-[700px] pb-10">
                <div className="flex justify-between p-2">
                  <button type="button" onClick={() => handleNewCover(item.id)} className={`text-xs px-2 py-1 rounded flex
                   items-center gap-1  ${item.isCover ? "bg-green-100 text-green-700" : " "}`} >
                    <FaStar />
                    {item.isCover ? "Uncover" : "Set Cover"}
                  </button>

                  <button type="button" onClick={() => handleNewRemove(item.id)} className="text-red-500" >
                    <FaTimes />
                  </button>
                </div>
                <img src={item.url} className="h-full w-full object-cover" />


              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}




