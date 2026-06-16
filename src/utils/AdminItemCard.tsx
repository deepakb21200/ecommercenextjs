"use client";

import { ReactNode } from "react";
import {
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";

type DetailItem = {
  label: string;
  value: ReactNode;
};

type Props = {
  title: string;
  subtitle: string;
  icon: ReactNode;
  badge?: ReactNode;
  details: DetailItem[];

  onEdit: () => void;
  onDelete: () => void;

  isDeleting?: boolean;
};

export default function AdminItemCard({
  title,
  subtitle,
  icon,
  badge,
  details,
  onEdit,
  onDelete,
  isDeleting = false,
}: Props) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-[#111827]/60 p-4 backdrop-blur-xl">
      {/* TOP */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* ICON / IMAGE */}
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#0B1120]">
            {icon}
          </div>

          {/* INFO */}
          <div>
            <p className="font-mono text-sm font-bold tracking-[0.2em] text-white">
              {title}
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              {subtitle}
            </p>
          </div>
        </div>

        {/* BADGE */}
        {badge}
      </div>

      {/* DETAILS */}
      <div className="mt-4 space-y-2 text-xs text-zinc-400">
        {details.map((detail) => (
          <div
            key={detail.label}
            className="flex justify-between "
          >
            <span>{detail.label}</span>
            <span className="  text-white">
              {detail.value}
            </span>
          </div>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="mt-4 flex items-center justify-start gap-2 sm:justify-end">
       
          <button
            onClick={onEdit}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300 hover:bg-violet-500/10 hover:text-violet-300"
          >
            <HiOutlinePencilSquare className="text-sm" />
            Edit
          </button>
       

     
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="inline-flex  cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
          >
       
              <HiOutlineTrash className="text-sm" />
            
            Delete
          </button>
        
      </div>
    </div>
  );
}