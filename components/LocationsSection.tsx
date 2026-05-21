"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
// Ensure your icon imports (MapPin, Phone, Clock, ArrowRight) are active at the top

// TypeScript structure definitions for strict compile compliance
interface BranchDetails {
    id: string;
    tag: string;
    title: string;
    address: string;
    mapQuery: string;
    mapsLink: string;
    hours: string;
}

export default function LocationsSection() {
    const [activeBranch, setActiveBranch] = useState<string>('branch1');

    // Explicit type configuration mapping preventing implicit type crash sequences
    const branches: Record<string, BranchDetails> = {
        branch1: {
            id: 'branch1',
            tag: 'Branch 01',
            title: 'Awada – Head Office',
            address: 'No. 23 Nathan Okafor St, Awada Obosi, Anambra State, Nigeria',
            mapQuery: 'No.+23+Nathan+Okafor+St,+Awada+Obosi,+Anambra,+Nigeria',
            mapsLink: 'https://maps.google.com/?q=No+23+Nathan+Okafor+Street+Awada+Obosi+Anambra+Nigeria',
            hours: 'Mon – Sat: 8am – 6pm',
        },
        branch2: {
            id: 'branch2',
            tag: 'Branch 02',
            title: 'Woliwo Layout – Commercial Hub',
            address: 'No. 32 Louis Mbanefo St, Woliwo Layout, Anambra State, Nigeria',
            mapQuery: 'No.+32+Louis+Mbanefo+St,+Woliwo+Layout,+Anambra,+Nigeria',
            mapsLink: 'https://maps.google.com/?q=No+32+Louis+Mbanefo+Street+Woliwo+Layout+Anambra+Nigeria',
            hours: 'Mon – Fri: 8am – 5pm',
        }
    };

    const currentBranch = branches[activeBranch];

    return (
        <div className="wrap max-w-6xl mx-auto px-1">

            {/* Replaced AOS with Native Framer Motion Viewport Trigger */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                {/* Section Header */}
                <div className="mb-12">
                    <span
                        className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-md mb-3"
                        style={{ color: 'var(--clr-green)', background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.15)' }}
                    >
                        Our Network
                    </span>
                    <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)' }}>
                        OUR BRANCHES
                    </h3>
                    <p className="text-sm md:text-base mt-2" style={{ color: 'var(--tx-muted)' }}>
                        Click on a branch panel below to smoothly swap the map view and get live direction markers.
                    </p>
                </div>

                {/* Split-Screen Layout */}
                <div className="grid lg:grid-cols-12 gap-8 items-stretch">

                    {/* LEFT COLUMN: Interactive Cards */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        {Object.values(branches).map((branch) => {
                            const isActive = activeBranch === branch.id;

                            return (
                                <motion.div
                                    key={branch.id}
                                    onClick={() => setActiveBranch(branch.id)}
                                    className="p-6 rounded-2xl cursor-pointer relative overflow-hidden"
                                    style={{ background: 'var(--bg-1)' }}
                                    animate={{
                                        scale: isActive ? 1.01 : 1,
                                        opacity: isActive ? 1 : 0.7,
                                        boxShadow: isActive ? '0 12px 30px rgba(22,163,74,0.06)' : '0 0px 0px rgba(0,0,0,0)'
                                    }}
                                    whileHover={{ opacity: 1, scale: isActive ? 1.01 : 1.005 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                >
                                    {/* Sliding green active border layer */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeBorder"
                                            className="absolute inset-0 pointer-events-none rounded-2xl"
                                            style={{ border: '2.5px solid var(--clr-green)', zIndex: 10 }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}

                                    <div className="flex items-start justify-between gap-3 mb-4">
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                                                style={{
                                                    background: isActive ? 'rgba(22,163,74,0.12)' : 'var(--bg-2)',
                                                    color: isActive ? 'var(--clr-green)' : 'var(--tx-muted)'
                                                }}
                                            >
                                                {branch.tag}
                                            </span>
                                            <h4 className="font-bold text-lg mt-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)' }}>
                                                {branch.title}
                                            </h4>
                                        </div>

                                        <motion.div
                                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                            style={{ background: isActive ? 'rgba(22,163,74,0.08)' : 'var(--bg-2)' }}
                                            animate={{ scale: isActive ? 1.1 : 1 }}
                                        >
                                            <MapPin size={16} style={{ color: isActive ? 'var(--clr-green)' : 'var(--tx-faint)' }} />
                                        </motion.div>
                                    </div>

                                    <div className="space-y-3 text-sm pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
                                        <p style={{ color: 'var(--tx-secondary)' }}>
                                            <strong className="text-xs uppercase tracking-wider block opacity-60 mb-0.5">Address</strong>
                                            {branch.address}
                                        </p>
                                        <div className="flex flex-col justify-between gap-2 text-xs" style={{ color: 'var(--tx-muted)' }}>
                                            <div><strong>Hours:</strong> {branch.hours}</div>
                                            <div><strong>Phone:</strong> On Request</div>
                                        </div>
                                    </div>

                                    <div className="pt-3 flex justify-end">
                                        <a
                                            href={branch.mapsLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-bold flex items-center gap-1 transition-all hover:gap-2"
                                            style={{ color: 'var(--clr-green)' }}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Open Map Route <ArrowRight size={12} />
                                        </a>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* RIGHT COLUMN: Crossfading Map Component */}
                    <div className="lg:col-span-7 min-h-[420px] lg:min-h-full rounded-3xl overflow-hidden relative bg-neutral-900" style={{ border: '1px solid var(--border)' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentBranch.id}
                                initial={{ opacity: 0, scale: 0.99 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.01 }}
                                transition={{ duration: 0.35, ease: 'easeInOut' }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <iframe
                                    title={`${currentBranch.title} Location Map`}
                                    src={`https://maps.google.com/maps?q=${currentBranch.mapQuery}&t=&z=16&ie=UTF8&iwloc=near&output=embed`}
                                    width="100%"
                                    height="100%"
                                    style={{
                                        border: 'none',
                                        display: 'block',
                                        filter: 'saturate(0.95) contrast(1.02)'
                                    }}
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}