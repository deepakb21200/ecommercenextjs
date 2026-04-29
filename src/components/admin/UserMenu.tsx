
// import { useState } from "react";
// import { FaUserCircle } from "react-icons/fa";

// export function UserMenu() {
//   const [open, setOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/sign-in";
//   };

//   return (
//     <div className="relative">
//       {/* Button */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 hover:bg-gray-200 transition"
//       >
//         <FaUserCircle className="text-xl text-gray-600" />
//         <span className="text-sm font-medium text-gray-700">Admin</span>
//       </button>

//       {/* Dropdown */}
//       {open && (
//         <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white shadow-lg border overflow-hidden">
//           <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
//             Profile
//           </button>

//           <button
//             onClick={handleLogout}
//             className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }





"use client";

import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/sign-in";
  };

  // ✅ outside click detect
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      
      {/* Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 hover:bg-gray-200 transition"
      >
        <FaUserCircle className="text-xl text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Admin</span>
      </button>

      {/* Dropdown */}
      {/* {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white shadow-lg border overflow-hidden transition-all duration-200">
 */}
{open && (
 <div
  className={`absolute right-0 mt-2 w-44 rounded-xl bg-white shadow-lg border overflow-hidden transition-all duration-200 ${
    open
      ? "opacity-100 scale-100"
      : "opacity-0 scale-95 pointer-events-none"
  }`}
>


          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
            Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}