"use client";

import { SIZE_OPTIONS } from "@/config/constants";

 

type Props = {
  selectedSizes: string[];
  onToggle: (size: string) => void;
};

export function SizeSelector({ selectedSizes, onToggle }: Props) {
  return (
    <div className="space-y-3">
      {/* <h3 className="text-sm font-semibold">Sizes</h3> */}

      <div className="grid grid-cols-4 gap-2">
        {SIZE_OPTIONS.map((size) => {
          const active = selectedSizes.includes(size);

          return (
            <button
              key={size}
              onClick={() => onToggle(size)}
                type="button"
              className={`py-2 rounded-lg text-sm border transition
                ${
                  active
                    ? "bg-blue-600 text-white border-blue-600"
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





//try t his

 