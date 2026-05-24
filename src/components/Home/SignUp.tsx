
// SignupPage.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  RiLockLine,
  RiUserLine,
  RiMailLine,
  RiEyeLine,
  RiEyeOffLine,
  RiSparklingLine,
} from "react-icons/ri";

export default function SignupPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Signup failed");

      setSuccess(true);

      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.log(err);
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
            style={{
              background:
                "linear-gradient(135deg, hsl(174, 62%, 38%), hsl(190, 60%, 45%))",
            }}
          >
            <RiSparklingLine className="text-2xl text-white" />
          </div>

          <h1
            className="text-2xl font-bold"
            style={{ color: "hsl(220, 20%, 15%)" }}
          >
            Create your account
          </h1>

          <p
            className="mt-1 text-sm"
            style={{ color: "hsl(220, 10%, 45%)" }}
          >
            Join us and start shopping today
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

            {/* Success */}
            {success && (
              <div
                className="rounded-xl px-4 py-3 text-sm"
                style={{
                  background: "hsl(174, 62%, 38%, 0.08)",
                  border: "1px solid hsl(174, 62%, 38%, 0.2)",
                  color: "hsl(174, 62%, 32%)",
                }}
              >
                Account created! Redirecting to login...
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
                  placeholder="Choose a username"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  className="w-full rounded-xl py-3 pl-10 pr-4 text-sm outline-none transition-all"
                  style={{
                    background: "hsl(40, 33%, 98%)",
                    border: "1px solid hsl(40, 20%, 88%)",
                    color: "hsl(220, 20%, 15%)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "hsl(174, 62%, 38%)";
                    e.target.style.boxShadow =
                      "0 0 0 3px hsl(174, 62%, 38%, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "hsl(40, 20%, 88%)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label
                className="block text-xs font-semibold uppercase tracking-wider"
                style={{ color: "hsl(220, 10%, 45%)" }}
              >
                Email
              </label>

              <div className="relative">
                <RiMailLine
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-base"
                  style={{ color: "hsl(220, 10%, 45%)" }}
                />

                <input
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="w-full rounded-xl py-3 pl-10 pr-4 text-sm outline-none transition-all"
                  style={{
                    background: "hsl(40, 33%, 98%)",
                    border: "1px solid hsl(40, 20%, 88%)",
                    color: "hsl(220, 20%, 15%)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "hsl(174, 62%, 38%)";
                    e.target.style.boxShadow =
                      "0 0 0 3px hsl(174, 62%, 38%, 0.1)";
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
                  placeholder="Create a password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="w-full rounded-xl py-3 pl-10 pr-11 text-sm outline-none transition-all"
                  style={{
                    background: "hsl(40, 33%, 98%)",
                    border: "1px solid hsl(40, 20%, 88%)",
                    color: "hsl(220, 20%, 15%)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "hsl(174, 62%, 38%)";
                    e.target.style.boxShadow =
                      "0 0 0 3px hsl(174, 62%, 38%, 0.1)";
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
              disabled={
                loading ||
                !form.username ||
                !form.email ||
                !form.password
              }
              className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                background: loading
                  ? "hsl(174, 62%, 32%)"
                  : "linear-gradient(135deg, hsl(174, 62%, 38%), hsl(190, 60%, 45%))",
              }}
              onMouseEnter={(e) => {
                if (!loading)
                  (e.target as HTMLElement).style.background =
                    "hsl(174, 62%, 32%)";
              }}
              onMouseLeave={(e) => {
                if (!loading)
                  (e.target as HTMLElement).style.background =
                    "linear-gradient(135deg, hsl(174, 62%, 38%), hsl(190, 60%, 45%))";
              }}
            >
              {loading ? "Creating account..." : "Get Started"}
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div
              className="flex-1 border-t"
              style={{ borderColor: "hsl(40, 20%, 88%)" }}
            />

            <span
              className="text-xs"
              style={{ color: "hsl(220, 10%, 45%)" }}
            >
              or
            </span>

            <div
              className="flex-1 border-t"
              style={{ borderColor: "hsl(40, 20%, 88%)" }}
            />
          </div>

          {/* Login link */}
          <p
            className="text-center text-sm"
            style={{ color: "hsl(220, 10%, 45%)" }}
          >
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold transition-colors"
              style={{ color: "hsl(174, 62%, 38%)" }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}