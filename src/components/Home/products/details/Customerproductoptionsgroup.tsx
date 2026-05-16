// import { getSwatchColor } from "../productListShared";
// import { ProductSize } from "../types";

import { ProductSize } from "../types";

 
// type CustomerProductOptionsGroupProps = {
//   values: string[];
//   selectedValue: string;
//   onSelect: (value: ProductSize) => void;
//   variant: "color" | "size";
// };

// function CustomerProductOptionsGroup({
//   values,
//   variant,
//   selectedValue,
//   onSelect,
// }: CustomerProductOptionsGroupProps) {
//   return (
//     <div role="group" className="flex flex-wrap gap-2">
//       {values.map((value) => {
//         const isActive = selectedValue === value;

//         if (variant === "color") {
//           return (
//             <button
//               key={value}
//               type="button"
//               title={value}
//               onClick={() => onSelect(value as ProductSize)}
//               className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
//                 isActive
//                   ? "border-neutral-900 dark:border-neutral-100 bg-neutral-100 dark:bg-neutral-800 ring-2 ring-neutral-900/20 dark:ring-neutral-100/20"
//                   : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-500"
//               }`}
//             >
//               <span
//                 className="h-4 w-4 rounded-sm border border-neutral-200 dark:border-neutral-700"
//                 style={{ backgroundColor: getSwatchColor(value) }}
//               />
//               {/* <span className="text-neutral-700 dark:text-neutral-300 capitalize">{value}</span> */}
//             </button>
//           );
//         }

//         return (
//           <button
//             key={value}
//             type="button"
//             onClick={() => onSelect(value as ProductSize)}
//             className={`min-w-12 rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
//               isActive
//                 ? "border-neutral-900 dark:border-neutral-100 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
//                 : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
//             }`}
//           >
//             {value}
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// export default CustomerProductOptionsGroup;













type ColorOption = {
  name: string;
  hex: string;
};

type CustomerProductOptionsGroupProps = {
  values: string[] | ColorOption[];
  selectedValue: string;
  onSelect: (value: ProductSize) => void;
  variant: "color" | "size";
};

function CustomerProductOptionsGroup({
  values,
  variant,
  selectedValue,
  onSelect,
}: CustomerProductOptionsGroupProps) {

    console.log("values", values);
  console.log("selected value", selectedValue);
  
  return (
    <div role="group" className="flex flex-wrap gap-2">
      {variant === "color"
        ? (values as ColorOption[]).map((color) => {
            const isActive = selectedValue === color.name;

            return (
              <button
                key={color.name}
                type="button"
                title={color.name}
                onClick={() => onSelect(color.name as ProductSize)}
                className={`flex items-center gap-2 rounded-lg border-4 px-3 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "  dark:border-neutral-100 bg-neutral-100 dark:bg-neutral-800 ring-2 ring-neutral-900/20 dark:ring-neutral-100/20"
                    : "    bg-white dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-500"
                }`}
              >
                <span
                  className="h-4 w-4 rounded-sm border border-neutral-200 dark:border-neutral-700"
                  style={{ backgroundColor: color.hex }}
                />
              </button>
            );
          })
        : (values as string[]).map((value) => {
            const isActive = selectedValue === value;

            return (
              <button
                key={value}
                type="button"
                onClick={() => onSelect(value as ProductSize)}
                className={`min-w-12 rounded-lg border-4 px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "border-red-500 dark:border-neutral-100 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                    : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
                }`}
              >
                {value}
              </button>
            );
          })}
    </div>
  );
}

export default CustomerProductOptionsGroup;