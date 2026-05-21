"use client";

import { FaSpinner } from "react-icons/fa";

// export function Commonloader() {
//   return (
//     <div className="flex   w-full items-center justify-center bg-gray-50">
//       <div className="flex flex-col items-center gap-3">
        
//         <FaSpinner className="h-8 w-8 animate-spin text-gray-700" />
        
//         <p className="text-sm text-gray-500">
//           Loading...
//         </p>

//       </div>
//     </div>
//   );
// }


export function Commonloader() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <FaSpinner className="h-8 w-8 animate-spin text-gray-700" />
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
}