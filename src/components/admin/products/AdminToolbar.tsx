// "use client";

// import {
//   HiOutlineMagnifyingGlass,
//   HiOutlinePlus,
// } from "react-icons/hi2";
// import type { IconType } from "react-icons";

// type SecondaryAction = {
//   label: string;
//   onClick: () => void;
//   icon: IconType;
// };

// type ToolbarProps = {
//   search: string;
//   searchPlaceholder: string;
//   onSearchChange: (value: string) => void;

//   primaryActionLabel: string;
//   primaryActionIcon?: IconType;
//   onPrimaryAction: () => void;

//   secondaryAction?: SecondaryAction;
// };

// export default function AdminToolbar({
//   search,
//   searchPlaceholder,
//   onSearchChange,
//   primaryActionLabel,
//   primaryActionIcon: PrimaryIcon = HiOutlinePlus,
//   onPrimaryAction,
//   secondaryAction,
// }: ToolbarProps) {
//   return (
//     <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//       {/* Search */}
//       <div className="relative w-full lg:max-w-md">
//         <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-lg text-zinc-500" />

//         <input
//           value={search}
//           onChange={(e) => onSearchChange(e.target.value)}
//           placeholder={searchPlaceholder}
//           className="h-14 w-full rounded-2xl border border-white/10 bg-[#0B1120] pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10"
//         />
//       </div>

//       {/* Actions */}
//       <div className="flex flex-col gap-3 sm:flex-row">
//         {/* Secondary Action */}
//         {secondaryAction && (
//           <button
//             onClick={secondaryAction.onClick}
//             className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-zinc-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
//           >
//             <secondaryAction.icon className="text-lg" />
//             {secondaryAction.label}
//           </button>
//         )}

//         {/* Primary Action */}
//         <button
//           onClick={onPrimaryAction}
//           className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 text-sm font-semibold text-white shadow-xl shadow-violet-500/20 transition-all duration-300 hover:scale-[1.02]"
//         >
//           <PrimaryIcon className="text-lg" />
//           {primaryActionLabel}
//         </button>
//       </div>
//     </div>
//   );
// }







"use client";
 
import { useRouter } from "next/navigation";
 
import { IconType } from "react-icons";
import {
    HiOutlineMagnifyingGlass,
    HiOutlinePlus,
} from "react-icons/hi2";
import { RiRefreshLine } from "react-icons/ri";

type ExtraAction = {
    label: string;
    icon: IconType;
    onClick: () => void;
};

type AdminToolbarProps = {
    search: string;
    onSearchChange: (value: string) => void;
    item: number

    // Search input placeholder
    placeholder: string;

    // Primary button
    primaryButtonLabel?: string;
    primaryButtonIcon?: IconType;
    primaryButtonHref?: string;
    onPrimaryButtonClick?: () => void;
    sectionLabel: string;
    heading: string;

    // Optional secondary button
    extraAction?: ExtraAction;
    refreshAll?: () => void; // optional prop 
    
    error: string


};

export default function AdminToolbar({
    search,
    onSearchChange,
    placeholder = "Search...",
    primaryButtonLabel,
    primaryButtonIcon: PrimaryIcon = HiOutlinePlus,
    primaryButtonHref,
    onPrimaryButtonClick,
    extraAction,
    item,
    sectionLabel,
    heading,
    refreshAll,
    error
}: AdminToolbarProps) {

    // =========================
    const router = useRouter();

    const handlePrimaryClick = () => {
        if (onPrimaryButtonClick) {
            onPrimaryButtonClick();
            return;
        }

        if (primaryButtonHref) {
            router.push(primaryButtonHref);
        }
    };


    return (

        <>
            {/* <div className="rounded-[30px] border-4  border border-white/10 bg-[#111827]/70  p-5 shadow-2xl backdrop-blur-xl lg:p-6"> */}
               <div className="rounded-[30px] border-4  border-red-400  bg-[#111827]/70  p-5 shadow-2xl backdrop-blur-xl lg:p-6">

                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                            {sectionLabel}
                        </p>

                        <h2 className="mt-2 text-2xl font-bold text-white">
                            {heading}
                        </h2>
                    </div>


                    <div className="hidden md:flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300">
                        {/* Refresh button */}
                        {refreshAll && (
                            <button type="button" onClick={refreshAll}
                                title="Refresh" className="inline-flex h-8 w-8 items-center justify-center rounded-lg border
                                 border-emerald-400/20 bg-emerald-500/10 text-emerald-300 transition-colors
                                  hover:bg-emerald-500/20 hover:text-white">
                                <RiRefreshLine className="text-base" />
                            </button>
                        )}

                        {/* Product count */}
 
                        <span>{item} Products</span>
                    </div>




                </div>



                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    {/* Search */}
                    <div className="relative w-full lg:max-w-md">
                        <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-lg text-zinc-500" />

                        <input value={search}
                            onChange={(e) => {
                                if (error) {
                                    alert("refresh again to get the data");
                                    return
                                }
                                onSearchChange(e.target.value)
                            }}


                            placeholder={placeholder}
                            className="h-14 w-full rounded-2xl border border-white/10 bg-[#0B1120] pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10"
                        />
                    </div>

                    {/* Actions */}
                    {
                        heading != "Order Controls" &&
                        <div className="flex flex-col gap-3 sm:flex-row">
                            {/* Optional Secondary Button */}
                            {extraAction && (
                                <button
                                    onClick={extraAction.onClick}
                                    className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-zinc-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
                                >
                                    <extraAction.icon className="text-lg" />
                                    {extraAction.label}
                                </button>
                            )}

                            {/* Primary Button */}
                            <button
                                onClick={handlePrimaryClick}
                                className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 text-sm font-semibold text-white shadow-xl shadow-violet-500/20 transition-all duration-300 hover:scale-[1.02]"
                            >
                                <PrimaryIcon className="text-lg" />
                                {primaryButtonLabel}
                            </button>
                        </div>
                    }
                </div>

            </div>






        </>





    );
}


{/* <div className="hidden flex rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 md:block">
                      
        {refreshAll && (
          <button
            type="button"
            onClick={refreshAll}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
             <RiRefreshLine className="text-lg" />
          </button>
        )}
                        {item} Products
                    </div> */}

