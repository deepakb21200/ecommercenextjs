// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "./user/store/api";

// export default function LoginPage() {
//   const router = useRouter();
//   const setUser = useAuthStore((s) => s.setUser);

//   const [form, setForm] = useState({
//     username: "",
//     password: "",
//   });

//   const handleSubmit = async () => {
//     try {
//       const res = await fetch("/api/users/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include", // ✅ important (cookie set hone ke liye)
//         body: JSON.stringify(form),
//       });

//       if (!res.ok) throw new Error("Login failed");

//       const user = await res.json();

//       // zustand store
//       setUser({
//         _id: user._id,
//         username: user.username,
//         email: user.email,
//         role: user.role,
//       });

//       alert("Login success");

//       // role redirect
//       if (user.role === "admin") {
//         router.push("/admin");
//       } else {
//         router.push("/");
//       }
//     } catch {
//       alert("Login failed");
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center">
//       <div className="space-y-3 border p-5 w-[300px]">
//         <input
//           placeholder="username"
//           className="border p-2 w-full"
//           onChange={(e) =>
//             setForm({ ...form, username: e.target.value })
//           }
//         />

//         <input
//           type="password"
//           placeholder="password"
//           className="border p-2 w-full"
//           onChange={(e) =>
//             setForm({ ...form, password: e.target.value })
//           }
//         />

//         <button
//           onClick={handleSubmit}
//           className="bg-black text-white p-2 w-full"
//         >
//           Login Account
//         </button>
//       </div>
//     </div>
//   );
// }











// LoginPage.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "./user/store/api";
import Link from "next/link";
import { RiLockLine, RiUserLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Login failed");

      const user = await res.json();
      setUser({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      });

      if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch {
      setError("Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-12"
      style={{ background: "hsl(40, 33%, 98%)" }}
    >
      <div className="w-full max-w-md">

        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <div
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ background: "linear-gradient(135deg, hsl(174, 62%, 38%), hsl(190, 60%, 45%))" }}
          >
            <RiLockLine className="text-2xl text-white" />
          </div>
          <h1 className="text-2xl font-bold" style={{ color: "hsl(220, 20%, 15%)" }}>
            Welcome back
          </h1>
          <p className="mt-1 text-sm" style={{ color: "hsl(220, 10%, 45%)" }}>
            Sign in to your account to continue
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8 shadow-sm"
          style={{
            background: "hsl(0, 0%, 100%)",
            border: "1px solid hsl(40, 20%, 88%)",
          }}
        >
          <div className="space-y-5">

            {/* Error */}
            {error && (
              <div
                className="rounded-xl px-4 py-3 text-sm"
                style={{
                  background: "hsl(0, 84%, 60%, 0.08)",
                  border: "1px solid hsl(0, 84%, 60%, 0.2)",
                  color: "hsl(0, 84%, 50%)",
                }}
              >
                {error}
              </div>
            )}

            {/* Username */}
            <div className="space-y-1.5">
              <label
                className="block text-xs font-semibold uppercase tracking-wider"
                style={{ color: "hsl(220, 10%, 45%)" }}
              >
                Username
              </label>
              <div className="relative">
                <RiUserLine
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-base"
                  style={{ color: "hsl(220, 10%, 45%)" }}
                />
                <input
                  placeholder="Enter your username"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="w-full rounded-xl py-3 pl-10 pr-4 text-sm outline-none transition-all"
                  style={{
                    background: "hsl(40, 33%, 98%)",
                    border: "1px solid hsl(40, 20%, 88%)",
                    color: "hsl(220, 20%, 15%)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "hsl(174, 62%, 38%)";
                    e.target.style.boxShadow = "0 0 0 3px hsl(174, 62%, 38%, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "hsl(40, 20%, 88%)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                className="block text-xs font-semibold uppercase tracking-wider"
                style={{ color: "hsl(220, 10%, 45%)" }}
              >
                Password
              </label>
              <div className="relative">
                <RiLockLine
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-base"
                  style={{ color: "hsl(220, 10%, 45%)" }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="w-full rounded-xl py-3 pl-10 pr-11 text-sm outline-none transition-all"
                  style={{
                    background: "hsl(40, 33%, 98%)",
                    border: "1px solid hsl(40, 20%, 88%)",
                    color: "hsl(220, 20%, 15%)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "hsl(174, 62%, 38%)";
                    e.target.style.boxShadow = "0 0 0 3px hsl(174, 62%, 38%, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "hsl(40, 20%, 88%)";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "hsl(220, 10%, 45%)" }}
                >
                  {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading || !form.username || !form.password}
              className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: loading
                  ? "hsl(174, 62%, 32%)"
                  : "linear-gradient(135deg, hsl(174, 62%, 38%), hsl(190, 60%, 45%))",
              }}
              onMouseEnter={(e) => {
                if (!loading) (e.target as HTMLElement).style.background = "hsl(174, 62%, 32%)";
              }}
              onMouseLeave={(e) => {
                if (!loading) (e.target as HTMLElement).style.background =
                  "linear-gradient(135deg, hsl(174, 62%, 38%), hsl(190, 60%, 45%))";
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 border-t" style={{ borderColor: "hsl(40, 20%, 88%)" }} />
            <span className="text-xs" style={{ color: "hsl(220, 10%, 45%)" }}>or</span>
            <div className="flex-1 border-t" style={{ borderColor: "hsl(40, 20%, 88%)" }} />
          </div>

          {/* Signup link */}
          <p className="text-center text-sm" style={{ color: "hsl(220, 10%, 45%)" }}>
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold transition-colors"
              style={{ color: "hsl(174, 62%, 38%)" }}
            >
              Create one
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}