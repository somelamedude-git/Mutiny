"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const valid = /.+@.+/.test(email)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid) return
    await new Promise((r) => setTimeout(r, 500))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200"
      >
        You&apos;re on the list. We&apos;ll reach out soon.
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <label htmlFor="email" className="sr-only">
        Email
      </label>
      <Input
        id="email"
        type="email"
        placeholder="you@domain.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-full bg-black/30 border-white/15 text-white placeholder:text-white/40"
        required
      />
      <Button type="submit" disabled={!valid} className="rounded-full bg-white text-black hover:bg-[#e3c27a]">
        Join
      </Button>
    </form>
  )
}




// Soft Code
// import { useState } from "react";
// import axios from "axios";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function JoinForm() {
//   const [email, setEmail] = useState("");
//   const [valid, setValid] = useState(false);

//   // Allowed email domains
//   const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];

//   const validateEmail = (value) => {
//     // Basic email format check
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(value)) return false;

//     // Extract domain and check against allowed list
//     const domain = value.split("@")[1]?.toLowerCase();
//     return allowedDomains.includes(domain);
//   };

//   const onChangeEmail = (e) => {
//     const value = e.target.value;
//     setEmail(value);
//     setValid(validateEmail(value));
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send POST request
//       const res = await axios.post("#", { email });
//       console.log("Email submitted:", res.data);

//       // Optional: reset field after success
//       setEmail("");
//       setValid(false);
//       alert("You have been added to the list!");
//     } catch (error) {
//       console.error("Failed to send email:", error);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <form onSubmit={onSubmit} className="flex gap-2">
//       <label htmlFor="email" className="sr-only">
//         Email
//       </label>
//       <Input
//         id="email"
//         type="email"
//         placeholder="you@domain.com"
//         value={email}
//         onChange={onChangeEmail}
//         className="rounded-full bg-black/30 border-white/15 text-white placeholder:text-white/40"
//         required
//       />
//       <Button type="submit" disabled={!valid} className="rounded-full bg-white text-black hover:bg-[#e3c27a]">
//         Join
//       </Button>
//     </form>
//   );
// }
