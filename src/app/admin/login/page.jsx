"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const params = useSearchParams();
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  async function submit(event) {
    event.preventDefault();
    setPending(true); setStatus("");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const result = await signIn("credentials", { email: data.email, password: data.password, redirect: false, callbackUrl: params.get("callbackUrl") || "/admin" });
    if (result?.error) setStatus("The email or password is incorrect.");
    else if (result?.url) window.location.assign(result.url);
    setPending(false);
  }
  return <main className="min-h-screen bg-paper px-4 py-20"><div className="mx-auto max-w-md rounded-[20px] border border-line bg-white p-8 shadow-soft"><h1 className="mb-6 font-display text-3xl font-bold">Administrator login</h1><form onSubmit={submit}><div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required /></div><div className="field"><label htmlFor="password">Password</label><input id="password" name="password" type="password" required /></div><button className="button w-full" disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button>{status && <p role="alert" className="mt-4 text-sm text-red-700">{status}</p>}</form></div></main>;
}
export default function Login() { return <Suspense><LoginForm /></Suspense>; }
