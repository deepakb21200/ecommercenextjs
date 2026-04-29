"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "./user/store/api";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ important (cookie set hone ke liye)
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Login failed");

      const user = await res.json();

      // zustand store
      setUser({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      });

      alert("Login success");

      // role redirect
      if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-3 border p-5 w-[300px]">
        <input
          placeholder="username"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="password"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={handleSubmit}
          className="bg-black text-white p-2 w-full"
        >
          Login Account
        </button>
      </div>
    </div>
  );
}