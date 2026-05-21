 

"use client";

import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

type Color = {
  hex: string;
  name: string;
};

type Props = {
  colors: Color[];
  setColors: React.Dispatch<React.SetStateAction<Color[]>>;
};

export function ColorPicker({ colors, setColors }: Props) {
  const [color, setColor] = useState("#111111");
  const [name, setName] = useState("");
  const [editingColor, setEditingColor] = useState<string | null>(null);

  const handleAddOrUpdate = () => {
    // ❌ BLOCK IF NAME EMPTY
    if (!name.trim()) {
      alert("Color name is required!");
      return;
    }

    // UPDATE
    if (editingColor) {
      setColors((prev) =>
        prev.map((c) =>
          c.hex === editingColor
            ? { hex: color, name: name.trim() }
            : c
        )
      );

      setEditingColor(null);
      setColor("#111111");
      setName("");
      return;
    }

    // DUPLICATE CHECK
    if (colors.some((c) => c.hex === color)) {
      alert("Color already exists!");
      return;
    }

    setColors((prev) => [
      ...prev,
      { hex: color, name: name.trim() },
    ]);

    setColor("#111111");
    setName("");
  };

  const handleRemove = (hex: string) => {
    setColors((prev) => prev.filter((c) => c.hex !== hex));

    if (editingColor === hex) {
      setEditingColor(null);
      setColor("#111111");
      setName("");
    }
  };

  const handleSelectForEdit = (c: Color) => {
    setEditingColor(c.hex);
    setColor(c.hex);
    setName(c.name);
  };


  useEffect(()=>{
console.log(colors);

  },[colors])
  return (
    <div className="space-y-4">

      {/* INPUT */}
      <div className="flex items-center gap-3 flex-wrap">

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-11 w-16 cursor-pointer border rounded"
        />

        <input
          type="text"
          placeholder="Enter color name (required)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded-lg text-sm"
        />

        <button
          onClick={handleAddOrUpdate}
          type="button"
          className="px-4 py-2 text-sm  bg-gradient-to-r from-violet-600 to-cyan-500 text-white rounded-lg"
        >
          {editingColor ? "Update" : "Add"}
        </button>

      </div>

      {/* LIST */}
      <div className="flex flex-wrap gap-2">
        {colors.map((c) => (
          <div
            key={c.hex}
            className={`flex items-center gap-2 px-3 py-2 rounded-full border ${
              editingColor === c.hex ? "border-black bg-gray-100" : ""
            }`}
          >

            <button
              type="button"
              onClick={() => handleSelectForEdit(c)}
              className="flex items-center gap-2"
            >
              <span
                className="h-5 w-5 rounded-full border"
                style={{ background: c.hex }}
              />

              <span className="text-sm font-medium">
                {c.name}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleRemove(c.hex)}
              className="text-gray-500 hover:text-red-500"
            >
              <FaTimes className="text-xs" />
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}