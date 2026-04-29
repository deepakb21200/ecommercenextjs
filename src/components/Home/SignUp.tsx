"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Signup failed");
      }

      alert("Signup successful");
      router.push("/login");
    } catch (err) {
      alert("Signup failed");
      console.log(err);
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
          placeholder="email"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
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
          Get Started
        </button>
      </div>
    </div>
  );
}