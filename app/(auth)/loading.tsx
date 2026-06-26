// app/loading.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center"
            style={{ background: "var(--bg-surface)" }}
        >
            <div className="flex flex-col items-center gap-6">

                {/* ── Logo ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: [0, 1, 1, 0.4, 1], scale: [0.88, 1, 1, 0.96, 1] }}
                    transition={{
                        duration: 2.6,
                        times: [0, 0.18, 0.5, 0.75, 1],
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <Image
                        src="/logo.png"         // ← swap to your real logo path
                        alt="Mechelin Metals Nigeria"
                        width={52}
                        height={52}
                        priority
                        className="object-contain"
                    />
                </motion.div>

                {/* ── Wordmark ── */}
                <motion.div
                    className="flex flex-col items-center gap-1"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span
                        className="text-[13.5px] font-black uppercase tracking-[0.24em] leading-none"
                        style={{ fontFamily: "var(--font-display)", color: "var(--tx-primary)" }}
                    >
                        Mechelin
                    </span>
                    <span
                        className="text-[9px] font-semibold uppercase tracking-[0.28em]"
                        style={{ color: "var(--tx-muted)" }}
                    >
                        Metals Nigeria
                    </span>
                </motion.div>

                {/* ── Progress shimmer ── */}
                <motion.div
                    className="w-12 h-[2px] rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35, duration: 0.4 }}
                    style={{ background: "var(--bg-subtle)" }}
                >
                    <motion.div
                        className="h-full rounded-full"
                        style={{ background: "var(--clr-green)" }}
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                            duration: 1.3,
                            repeat: Infinity,
                            ease: [0.4, 0, 0.6, 1],
                            delay: 0.35,
                        }}
                    />
                </motion.div>

            </div>
        </div>
    );
}