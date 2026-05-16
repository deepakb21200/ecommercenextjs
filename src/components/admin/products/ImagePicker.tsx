


// ye chat gpt ka hai  isme defualt values props me dia ha 


// "use client";

// import { useEffect, useMemo } from "react";
// import { FaImage, FaStar, FaTimes } from "react-icons/fa";

// export type ProductImage = {
//   url: string;
//   publicId: string;
//   isCover: boolean;
// };

// export type NewImageItem = {
//   id: string;
//   file: File;
//   isCover: boolean;
// };

// type Props = {
//   newImages: NewImageItem[];
//   setNewImages: React.Dispatch<React.SetStateAction<NewImageItem[]>>;

//   existingImages?: ProductImage[];
//   setExistingImages?: React.Dispatch<React.SetStateAction<ProductImage[]>>;

//   existingCoverPublicId?: string;
//   setExistingCoverPublicId?: React.Dispatch<React.SetStateAction<string>>;
// };

// export function ImagePicker({
//   newImages,
//   setNewImages,
//   existingImages = [],
//   setExistingImages = () => {},
//   existingCoverPublicId = "",
//   setExistingCoverPublicId = () => {},
// }: Props) {

//   // ✅ preview generate
//   const previews = useMemo(
//     () =>
//       newImages.map((item) => ({
//         ...item,
//         url: URL.createObjectURL(item.file),
//       })),
//     [newImages]
//   );

//   // ✅ cleanup memory
//   useEffect(() => {
//     return () => previews.forEach((p) => URL.revokeObjectURL(p.url));
//   }, [previews]);

//   // ✅ add files
//   const handleFilesAdd = (files: FileList | null) => {
//     if (!files) return;

//     const items: NewImageItem[] = Array.from(files).map((file) => ({
//       id: crypto.randomUUID(),
//       file,
//       isCover: false,
//     }));

//     setNewImages((prev) => [...prev, ...items]);
//   };


//   useEffect(()=>{
// console.log("image", newImages);

//   },[newImages])
  

//   // ✅ remove new
//   const handleNewRemove = (id: string) => {
//     setNewImages((prev) => prev.filter((img) => img.id !== id));
//   };

//   // ✅ set new cover (ONLY ONE)
//   // const handleNewCover = (id: string) => {
//   //   setNewImages((prev) =>
//   //     prev.map((img) => ({
//   //       ...img,
//   //       isCover: img.id === id,
//   //     }))
//   //   );

//   //   // existing cover reset
//   //   setExistingCoverPublicId("");
//   // };

//   const handleNewCover = (id: string) => {
//   setNewImages((prev) =>
//     prev.map((img) =>
//       img.id === id
//         ? { ...img, isCover: !img.isCover } // 🔥 toggle
//         : { ...img, isCover: false }
//     )
//   );

//   // agar sab false ho gaye to existing cover allow ho sakta hai
//   setExistingCoverPublicId("");
// };

//   // ✅ remove existing
//   const handleExistingRemove = (publicId: string) => {
//     setExistingImages((prev) =>
//       prev.filter((img) => img.publicId !== publicId)
//     );

//     if (existingCoverPublicId === publicId) {
//       setExistingCoverPublicId("");
//     }
//   };

//   // ✅ set existing cover
//   // const handleExistingCover = (publicId: string) => {
//   //   setExistingCoverPublicId(publicId);

//   //   // reset new cover
//   //   setNewImages((prev) =>
//   //     prev.map((img) => ({
//   //       ...img,
//   //       isCover: false,
//   //     }))
//   //   );
//   // };

//   const handleExistingCover = (publicId: string) => {
//   setExistingCoverPublicId((prev) =>
//     prev === publicId ? "" : publicId // 🔥 toggle
//   );

//   // agar existing cover remove hua to new images unaffected
//   setNewImages((prev) =>
//     prev.map((img) => ({
//       ...img,
//       isCover: false,
//     }))
//   );
// };

//   return (
//     <div className="space-y-4">

//       {/* Upload */}
//       <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer hover:bg-gray-50 transition">
//         <FaImage className="text-gray-400 text-xl mb-2" />
//         <span className="text-sm font-medium">Upload Images</span>

//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           className="hidden"
//           onChange={(e) => {
//             handleFilesAdd(e.target.files);
//             e.target.value = "";
//           }}
//         />
//       </label>

//       {/* EXISTING IMAGES */}
//       {existingImages.length > 0 && (
//         <div>
//           <p className="text-sm font-medium mb-2">Existing Images</p>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//             {existingImages.map((img) => {
//               const isCover = existingCoverPublicId === img.publicId;

//               return (
//                 <div key={img.publicId} className="border rounded-xl overflow-hidden">
//                   <img src={img.url} className="h-28 w-full object-cover" />

//                   <div className="flex justify-between p-2">
//                     <button
//                       type="button"
//                       onClick={() => handleExistingCover(img.publicId)}
//                       className={`text-xs px-2 py-1 rounded flex items-center gap-1
//                         ${isCover ? "bg-green-100 text-green-700" : "bg-gray-100"}`}
//                     >
//                       <FaStar />
//                       {isCover ? "Cover" : "Set"}
//                     </button>

//                     <button
//                       type="button"
//                       onClick={() => handleExistingRemove(img.publicId)}
//                       className="text-red-500"
//                     >
//                       <FaTimes />
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* NEW IMAGES */}
//       {previews.length > 0 && (
//         <div>
//           <p className="text-sm font-medium mb-2">New Uploads</p>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//             {previews.map((item) => (
//               <div key={item.id} className="border rounded-xl overflow-hidden">
//                 <img src={item.url} className="h-28 w-full object-cover" />

//                 <div className="flex justify-between p-2">
//                   <button
//                     type="button"
//                     onClick={() => handleNewCover(item.id)}
//                     className={`text-xs px-2 py-1 rounded flex items-center gap-1
//                       ${item.isCover ? "bg-green-100 text-green-700" : "bg-gray-100"}`}
//                   >
//                     <FaStar />
//                     {item.isCover ? "Cover" : "Set"}
//                   </button>

//                   <button
//                     type="button"
//                     onClick={() => handleNewRemove(item.id)}
//                     className="text-red-500"
//                   >
//                     <FaTimes />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





















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
    () =>
      newImages.map((item) => ({
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

    const items: NewImageItem[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      file,
      isCover: false,
    }));

    setNewImages((prev) => [...prev, ...items]);
  };

  // ✅ remove new
  const handleNewRemove = (id: string) => {
    setNewImages((prev) => prev.filter((img) => img.id !== id));
  };

  // ✅ toggle new cover
  const handleNewCover = (id: string) => {
    setNewImages((prev) =>
      prev.map((img) =>
        img.id === id
          ? { ...img, isCover: !img.isCover }
          : { ...img, isCover: false }
      )
    );

    // reset existing cover
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
      <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer hover:bg-gray-50 transition">
        <FaImage className="text-gray-400 text-xl mb-2" />
        <span className="text-sm font-medium">Upload Images</span>

        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            handleFilesAdd(e.target.files);
            e.target.value = "";
          }}
        />
      </label>

      {/* EXISTING */}
      {existingImages && existingImages.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">Existing Images</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {existingImages.map((img) => {
              const isCover = existingCoverPublicId === img.publicId;

              return (
                <div key={img.publicId} className="border rounded-xl overflow-hidden">
                  <img src={img.url} className="h-28 w-full object-cover" />

                  <div className="flex justify-between p-2">
                    <button
                      type="button"
                      onClick={() => handleExistingCover(img.publicId)}
                      className={`text-xs px-2 py-1 rounded flex items-center gap-1
                        ${isCover ? "bg-green-100 text-green-700" : "bg-gray-100"}`}
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {previews.map((item) => (
              <div key={item.id} className="border rounded-xl overflow-hidden">
                <img src={item.url} className="h-28 w-full object-cover" />

                <div className="flex justify-between p-2">
                  <button
                    type="button"
                    onClick={() => handleNewCover(item.id)}
                    className={`text-xs px-2 py-1 rounded flex items-center gap-1
                      ${item.isCover ? "bg-green-100 text-green-700" : "bg-gray-100"}`}
                  >
                    <FaStar />
                    {item.isCover ? "Uncover" : "Set Cover"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNewRemove(item.id)}
                    className="text-red-500"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}




