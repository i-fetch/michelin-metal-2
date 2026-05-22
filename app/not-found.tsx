// app/not-found.tsx

"use client";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Home,
  Recycle,
  TriangleAlert,
  Search,
} from "lucide-react";

// remove this if using client component metadata issue
// export const metadata: Metadata = {
//   title: "404 | Page Not Found",
// };

const floating = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1] as const,
    },
  }),
};

export default function NotFoundPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090b]">
      {/* BACKGROUND IMAGE */}
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1.15 }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80"
          alt="Industrial metal recycling"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* DARK OVERLAY */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(9,9,11,0.94) 35%, rgba(9,9,11,0.68) 65%, rgba(9,9,11,0.96) 100%)",
        }}
      />

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* GLOW EFFECTS */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-72 h-72 bg-green-500/20 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"
      />

      {/* CONTENT */}
      <section className="relative z-10 flex min-h-screen items-center">
        <div className="wrap py-5 px-5 w-full">
          <div className="max-w-3xl">
            {/* TAG */}
            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-2 mb-8"
            >
              <Recycle size={14} className="text-green-400" />

              <span className="text-xs uppercase tracking-[0.25em] text-white/60">
                Metal Recycle Industry · West Africa
              </span>
            </motion.div>

            {/* HUGE 404 */}
            <div className="relative mb-6">
              <motion.h1
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/10"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(7rem, 22vw, 16rem)",
                  letterSpacing: "-0.08em",
                }}
              >
                404
              </motion.h1>

              {/* FLOATING ICON */}
              <motion.div
                {...floating}
                className="absolute top-5 right-0 md:right-10"
              >
                <div className="w-16 h-16 rounded-2xl border border-[#16a34a]/20 bg-[#16a34a]/10 backdrop-blur-md flex items-center justify-center shadow-2xl">
                  <TriangleAlert
                    size={28}
                    className="text-[#4ade80]"
                  />
                </div>
              </motion.div>
            </div>

            {/* TITLE */}
            <motion.h2
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-white mb-5 leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
                letterSpacing: "0.03em",
              }}
            >
              PAGE NOT FOUND
            </motion.h2>

            {/* TEXT */}
            <motion.p
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-white/65 text-lg leading-relaxed max-w-xl mb-10"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
              }}
            >
              The page you are trying to access does not exist or may have
              been moved. Continue exploring Mechelin Metals Nigeria&apos;s
              industrial recycling solutions.
            </motion.p>

            {/* BUTTONS */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4 mb-16"
            >
              <Link href="/products" className="btn btn-green">
                Explore Products
                <ArrowRight size={15} />
              </Link>

              <Link
                href="/"
                className="btn btn-outline"
                style={{
                  borderColor: "rgba(255,255,255,0.20)",
                  color: "#fff",
                }}
              >
                Back Home
                <Home size={15} />
              </Link>
            </motion.div>

            {/* CARDS */}
            <motion.div
              custom={6}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="hidden  sm:grid-cols-3 gap-5"
            >
              {[
                {
                  title: "Industrial Recycling",
                  body: "Premium ferrous and non-ferrous metal recovery.",
                },
                {
                  title: "Global Distribution",
                  body: "Supplying manufacturers across Africa and globally.",
                },
                {
                  title: "Need Assistance?",
                  body: "Reach our support team for quick help and guidance.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#16a34a]/10 flex items-center justify-center mb-4">
                    <Search size={18} className="text-[#4ade80]" />
                  </div>

                  <h3
                    className="text-white mb-2 text-lg"
                    style={{
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-white/50">
                    {item.body}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}