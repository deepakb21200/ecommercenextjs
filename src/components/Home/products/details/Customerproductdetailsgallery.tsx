
import { useCustomerProductDetailsStore } from "@/store/home/products/store";
import { getCoverImage } from "../productListShared";
import { CustomerProduct } from "../types";

 
type CustomerProductDetailsGalleryProps = {
  product: CustomerProduct;
 
};

function CustomerProductDetailsGallery({product }: CustomerProductDetailsGalleryProps) {


    const {selectedImage, setSelectedImage } = useCustomerProductDetailsStore((state) => state);
  
  const galleryImages = product.images || [];
  const displayImage = selectedImage || getCoverImage(product);

  return (
    <div className="flex flex-col gap-4">

      {/* Main image */}
      <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
        <div className="aspect-[4/5] w-full">
          {displayImage ? (
            <img
              src={displayImage}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-neutral-400 dark:text-neutral-600">
              No Image
            </div>
          )}
        </div>
      </div>

      {/* Thumbnails */}
      {galleryImages.length ? (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
          {galleryImages.map((item) => {
            const isActive = displayImage === item.url;
            return (
              <button
                key={item.publicId}
                type="button"
                onClick={() => setSelectedImage(item.url)}
                className={`overflow-hidden rounded-lg border transition-all ${
                  isActive
                    ? "border-neutral-900 dark:border-neutral-100 ring-2 ring-neutral-900/20 dark:ring-neutral-100/20"
                    : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600"
                }`}
              >
                <div className="aspect-square bg-neutral-100 dark:bg-neutral-900">
                  <img
                    src={item.url}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default CustomerProductDetailsGallery;

































// import { getCoverImage } from "../productListShared";
// import { CustomerProduct } from "../types";

 
// type CustomerProductDetailsGalleryProps = {
//   product: CustomerProduct;
//   selectedImage: string;
//   setSelectedImage: (value: string) => void;
// };

// function CustomerProductDetailsGallery({product,selectedImage,setSelectedImage}: CustomerProductDetailsGalleryProps) {
//   const galleryImages = product.images || [];
//   const displayImage = selectedImage || getCoverImage(product);

//   return (
//     <div className="flex flex-col gap-4">

//       {/* Main image */}
//       <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
//         <div className="aspect-[4/5] w-full">
//           {displayImage ? (
//             <img
//               src={displayImage}
//               alt={product.title}
//               className="h-full w-full object-cover"
//             />
//           ) : (
//             <div className="flex h-full items-center justify-center text-sm text-neutral-400 dark:text-neutral-600">
//               No Image
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Thumbnails */}
//       {galleryImages.length ? (
//         <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
//           {galleryImages.map((item) => {
//             const isActive = displayImage === item.url;
//             return (
//               <button
//                 key={item.publicId}
//                 type="button"
//                 onClick={() => setSelectedImage(item.url)}
//                 className={`overflow-hidden rounded-lg border transition-all ${
//                   isActive
//                     ? "border-neutral-900 dark:border-neutral-100 ring-2 ring-neutral-900/20 dark:ring-neutral-100/20"
//                     : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600"
//                 }`}
//               >
//                 <div className="aspect-square bg-neutral-100 dark:bg-neutral-900">
//                   <img
//                     src={item.url}
//                     alt={product.title}
//                     className="h-full w-full object-cover"
//                   />
//                 </div>
//               </button>
//             );
//           })}
//         </div>
//       ) : null}
//     </div>
//   );
// }

// export default CustomerProductDetailsGallery;


