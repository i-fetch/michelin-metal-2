"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { deleteInquiryAction } from '@/controllers/inquiryController';
import type { Inquiry } from '@/lib/types';

interface InquiriesPageProps {
  initialInquiries: Inquiry[];
}

export default function InquiriesPage({ initialInquiries }: InquiriesPageProps) {
  const router = useRouter();
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Lock background scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  const openDrawer = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsDrawerOpen(true);
  };

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    // Delay clearing selected so exit animation plays with data intact
    setTimeout(() => setSelectedInquiry(null), 300);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) closeDrawer();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  const handleDeleteInquiry = async (id: string) => {
    try {
      await deleteInquiryAction(id);
      setInquiries((prev) => prev.filter((item) => item._id !== id));
      if (selectedInquiry?._id === id) closeDrawer();
      toast.success('Inquiry deleted successfully');
    } catch {
      toast.error('Unable to delete inquiry.');
    }
  };

  const handleOpenProduct = (slug: string) => {
    router.push(`/products/${slug}`);
  };

  return (
    <div className="space-y-4 text-left" id="subview-admin-inquiries">
      {/* ── Page Header ── */}
      <div>
        <h2 className="text-bebas text-3xl text-tx-primary tracking-wide">
          Mechelin Trade Desk Request Stream
        </h2>
        <p className="text-xs text-tx-secondary">
          Strictly lists active B2B inquiries and laboratory sample requests received directly from
          product pages.
        </p>
      </div>

      {/* ── Table Card ── */}
      <div className="rounded-xl border border-border-subtle bg-white p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h4 className="tracking-wide font-bebas text-lg uppercase text-tx-primary">
            Client Submissions Queue
          </h4>
          <span className="rounded-full bg-gold-brand text-white text-[10px] font-bold px-2.5 py-0.5">
            {inquiries.length} Active Requests
          </span>
        </div>

        {inquiries.length === 0 ? (
          <div className="p-8 text-center bg-bg-subtle rounded-lg text-tx-muted text-xs">
            All submitted inquiries have been reviewed and archived. Submit an RFQ request on any
            product details catalog page to register new submissions.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-tx-muted uppercase font-semibold">
                  <th className="py-2.5 px-3">Company Name</th>
                  <th className="py-2.5 px-3">Material Focus</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Qty Requested</th>
                  <th className="py-2.5 px-3">Spec Demands</th>
                  <th className="py-2.5 px-3 text-right">Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-tx-secondary">
                {inquiries.map((inq, idx) => (
                  <tr
                    key={inq._id || idx}
                    onClick={() => openDrawer(inq)}
                    className="hover:bg-bg-subtle/50 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-3">
                      <div className="font-semibold text-tx-primary">{inq.companyName}</div>
                      <div className="text-[10px] text-tx-muted">
                        {inq.contactName} ({inq.contactEmail})
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenProduct(inq.productSlug);
                        }}
                        className="cursor-pointer text-green-brand font-medium hover:underline"
                      >
                        {inq.productTitle}
                      </button>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          inq.inquiryType.includes('Sample')
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-green-100 text-green-800 border border-green-200'
                        }`}
                      >
                        {inq.inquiryType}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono-custom font-semibold text-tx-primary">
                      {inq.quantityRequested} {inq.quantityUnit || 'tonne'}
                    </td>
                    <td
                      className="py-3 px-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDrawer(inq);
                      }}
                    >
                      <p className="max-w-xs text-[11px] truncate text-tx-muted italic">
                        {inq.notes
                          ? `${inq.notes.slice(0, 60)}${inq.notes.length > 60 ? '…' : ''}`
                          : 'No special requests outlined.'}
                      </p>
                      {inq.notes && inq.notes.length > 60 && (
                        <span className="text-[10px] text-brand-green font-semibold mt-0.5 block">
                          View full spec →
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          void handleDeleteInquiry(inq._id);
                        }}
                        className="cursor-pointer text-[10px] text-red-500 hover:text-red-700 font-bold uppercase transition-colors"
                        title="Delete inquiry"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Drawer Portal ── */}
      <AnimatePresence>
        {isDrawerOpen && selectedInquiry && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeDrawer}
              className="fixed inset-0 z-40 bg-black/0 backdrop-blur-[1px]"
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.aside
              key="drawer"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-full sm:max-w-[480px] xl:max-w-[460px] bg-white/95 backdrop-blur-xl border-l border-white/60 shadow-2xl flex-col h-full"
              aria-label="Inquiry detail drawer"
            >
              {/* Drawer Header */}
              <div className="flex items-start justify-between px-5 py-4 border-b border-gray-100">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-tx-muted mb-0.5">
                    Inquiry Detail
                  </p>
                  <h3 className="font-bebas text-xl text-tx-primary tracking-wide leading-none">
                    {selectedInquiry.companyName}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="ml-4 mt-0.5 flex-shrink-0 text-tx-muted hover:text-tx-primary transition-colors p-1 rounded-md hover:bg-gray-100"
                  aria-label="Close drawer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Drawer Body — scrollable */}
              <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 min-h-0">

                {/* Contact Block */}
                <DrawerSection label="Contact">
                  <DrawerRow label="Company" value={selectedInquiry.companyName} />
                  <DrawerRow label="Contact" value={selectedInquiry.contactName} />
                  <DrawerRow
                    label="Email"
                    value={
                      <a
                        href={`mailto:${selectedInquiry.contactEmail}`}
                        className="text-green-brand hover:underline"
                      >
                        {selectedInquiry.contactEmail}
                      </a>
                    }
                  />
                </DrawerSection>

                {/* Product Block */}
                <DrawerSection label="Material Focus">
                  <DrawerRow
                    label="Product"
                    value={
                      <button
                        type="button"
                        onClick={() => handleOpenProduct(selectedInquiry.productSlug)}
                        className="text-green-brand font-medium hover:underline text-left"
                      >
                        {selectedInquiry.productTitle}
                      </button>
                    }
                  />
                  <DrawerRow
                    label="Catalog Slug"
                    value={
                      <span className="font-mono text-[10px] bg-gray-50 border border-gray-200 rounded px-1.5 py-0.5 text-tx-muted">
                        {selectedInquiry.productSlug}
                      </span>
                    }
                  />
                </DrawerSection>

                {/* Request Block */}
                <DrawerSection label="Request Details">
                  <DrawerRow
                    label="Inquiry Type"
                    value={
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          selectedInquiry.inquiryType.includes('Sample')
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-green-100 text-green-800 border border-green-200'
                        }`}
                      >
                        {selectedInquiry.inquiryType}
                      </span>
                    }
                  />
                  <DrawerRow
                    label="Quantity"
                    value={
                      <span className="font-mono-custom font-semibold text-tx-primary">
                        {selectedInquiry.quantityRequested} {selectedInquiry.quantityUnit || 'tonne'}
                      </span>
                    }
                  />
                </DrawerSection>

                {/* Spec Demands Block */}
                <DrawerSection label="Spec Demands">
                  <div className="rounded-lg bg-bg-subtle border border-gray-100 p-3 text-xs text-tx-secondary leading-relaxed whitespace-pre-wrap">
                    {selectedInquiry.notes || (
                      <span className="text-tx-muted italic">No special requests outlined.</span>
                    )}
                  </div>
                </DrawerSection>
              </div>

              {/* Drawer Footer — actions */}
              <div className="sticky bottom-0 z-10 px-5 py-4 border-t border-gray-100 bg-white/95 backdrop-blur-xl flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => void handleDeleteInquiry(selectedInquiry._id)}
                  className="w-full  text-red-500 hover:text-red-700 text-sm font-semibold uppercase tracking-[0.16em] py-3 rounded-2xl shadow-lg shadow-red-600/10 transition-all duration-200"
                >
                  Delete inquiry
                </button>
                {/* <button
                  type="button"
                  onClick={closeDrawer}
                  className="w-full border border-gray-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold uppercase tracking-[0.16em] py-3 rounded-2xl transition-all duration-200"
                >
                  Close details
                </button> */}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Sub-components ── */

function DrawerSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-bold uppercase tracking-widest text-tx-muted border-b border-gray-100 pb-1">
        {label}
      </p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function DrawerRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 text-xs">
      <span className="text-tx-muted flex-shrink-0 w-24">{label}</span>
      <span className="text-tx-primary text-right flex-1">{value}</span>
    </div>
  );
}