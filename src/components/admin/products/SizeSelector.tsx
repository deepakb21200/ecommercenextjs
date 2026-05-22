"use client";
import { SIZE_OPTIONS } from "@/config/constants";
type Props = {
  sizes: string[];
  setSizes:React.Dispatch<React.SetStateAction<string[]>>;
};

export function SizeSelector({ sizes, setSizes}: Props) {
  const toggleSize = (size: string) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };


  return (
    <div className="space-y-3  ">
   

      <div className="grid sm:grid-cols-4 gap-2  ">
        {SIZE_OPTIONS.map((size) => {
          const active = sizes.includes(size);

          return (
            <button key={size} onClick={() => toggleSize(size)}
             type="button" className={`py-2 rounded-lg text-sm border transition
                ${ active ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}




 

 