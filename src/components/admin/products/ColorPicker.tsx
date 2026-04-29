"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";

type Props = {
  colors: string[];
  onAdd: (color: string) => void;
  onRemove: (color: string) => void;
};

export function ColorPicker({ colors, onAdd, onRemove }: Props) {
  const [color, setColor] = useState("#111111");

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold">Colors</h3>

      {/* Add */}
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-10 w-14 rounded cursor-pointer"
        />

        <button
          onClick={() => onAdd(color)}
          className="px-3 py-2 text-sm bg-gray-800 text-white rounded-lg hover:bg-black"
        >
          Add
        </button>
      </div>

      {/* List */}
      <div className="flex flex-wrap gap-2">
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => onRemove(c)}
            className="flex items-center gap-2 px-3 py-1 rounded-full border hover:bg-gray-100"
          >
            <span
              className="h-4 w-4 rounded-full"
              style={{ background: c }}
            />
            <FaTimes className="text-xs text-gray-500" />
          </button>
        ))}
      </div>
    </div>
  );
}