import React, { useState } from "react";
import type { Product } from "@/lib/types";
import { X, CheckCircle, Mail, Building, Database } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuoteModalProps {
  product: Product;
  onClose: () => void;
  onSubmitInquiry: (inquiry: {
    id: string;
    productTitle: string;
    productSlug: string;
    companyName: string;
    contactName: string;
    contactEmail: string;
    quantityRequested: number;
    quantityUnit: string;
    inquiryType: string;
    notes?: string;
    createdAt: string;
  }) => void;
}

export default function QuoteModal({ product, onClose, onSubmitInquiry }: QuoteModalProps) {
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [quantity, setQuantity] = useState<number>(product.moq.value);
  const [inquiryType, setInquiryType] = useState("Commercial Price Quote");
  const [notes, setNotes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName || !contactName || !contactEmail || !quantity) {
      alert("Please complete all required fields.");
      return;
    }

    const newInquiry = {
      id: "inq-" + Date.now(),
      productTitle: product.title,
      productSlug: product.slug,
      companyName,
      contactName,
      contactEmail,
      quantityRequested: Number(quantity),
      quantityUnit: product.moq.unit,
      inquiryType,
      notes,
      createdAt: new Date().toISOString(),
    };

    onSubmitInquiry(newInquiry);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs" id="quote-modal-backdrop">
      <motion.div
        className="relative w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl border border-border-subtle"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        id="quote-modal-card"
      >
        {/* Modal Top Header Banner */}
        <div className="bg-green-600/10 p-5 border-b border-border-subtle flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-brand-green" />
            <div>
              <h3 className="font-bebas text-lg tracking-wider text-tx-primary">RFQ & Sample Request</h3>
              <p className="text-xs text-tx-secondary">Direct routing to Mechelin Sales Engineers Desk</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer text-tx-muted hover:text-tx-primary p-1.5 hover:bg-black/5 rounded-full transition-all"
            aria-label="Close RFQ dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form
              onSubmit={handleSubmit}
              className="p-6 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="p-3 bg-green-600/10 rounded-lg text-xs leading-relaxed text-tx-secondary">
                You are requesting specifications on <span className="font-semibold text-tx-primary">{product.title}</span>.
                Minimum Order Quantity is <span className="font-semibold text-brand-green">{product.moq.value} {product.moq.unit}</span>.
              </div>

              {/* Inquiry Type selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-tx-secondary mb-1.5">
                  Request Intent *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["Commercial Price Quote", "Free Lab Sample Tube"].map((type) => (
                    <label
                      key={type}
                      className={`cursor-pointer flex items-center justify-center border p-3 rounded-lg text-xs font-medium transition-all ${inquiryType === type
                        ? "border-green-600 bg-green-600/10 text-green-600 font-semibold scale-102"
                        : "border-gray-200 hover:border-gray-300 text-tx-secondary"
                        }`}
                    >
                      <input
                        type="radio"
                        name="inquiryType"
                        value={type}
                        checked={inquiryType === type}
                        onChange={() => setInquiryType(type)}
                        className="sr-only"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Company Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company-name" className="block text-xs font-semibold uppercase tracking-wider text-tx-secondary mb-1">
                    Company Name *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3.5 h-4 w-4 text-tx-muted" />
                    <input
                      id="company-name"
                      type="text"
                      required
                      placeholder="e.g. Global Alloys Inc"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green active:border-brand-green outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-tx-secondary mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Dr. Sarah Miller"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none"
                  />
                </div>
              </div>

              {/* Email and Quantity Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-tx-secondary mb-1">
                    Corporate Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-4 w-4 text-tx-muted" />
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="s.miller@globalalloys.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="quantity-input" className="block text-xs font-semibold uppercase tracking-wider text-tx-secondary mb-1">
                    Estimated Volume ({product.moq.unit}) *
                  </label>
                  <input
                    id="quantity-input"
                    type="number"
                    required
                    min={product.moq.value}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(product.moq.value, Number(e.target.value)))}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none"
                  />
                  <p className="text-[10px] text-tx-muted mt-1">Must be at least the MOQ of {product.moq.value}</p>
                </div>
              </div>

              {/* Requirement Notes */}
              <div>
                <label htmlFor="notes-input" className="block text-xs font-semibold uppercase tracking-wider text-tx-secondary mb-1">
                  Custom Chemical Specifications / Curing Targets
                </label>
                <textarea
                  id="notes-input"
                  rows={2}
                  placeholder="Include any critical purity limits, test certifications, packaging dimensions or delivery schedules desired."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group relative w-full overflow-hidden rounded-lg bg-brand-green px-4 py-3 text-xs font-medium uppercase tracking-wider text-white shadow-md shadow-brand-green/10 transition-all hover:bg-brand-green/80 active:scale-[0.98]"
              >
                <span className="relative z-10">Send Direct Request</span>

                {/* subtle hover shine */}
                <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-full" />
              </button>
            </motion.form>
          ) : (
            <motion.div
              className="p-8 text-center flex flex-col items-center justify-center space-y-4"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              id="quote-success-state"
            >
              <div className="rounded-full bg-green-alpha p-4 text-brand-green">
                <CheckCircle className="h-12 w-12" />
              </div>
              <div>
                <h4 className="text-lg font-bebas tracking-wide text-tx-primary">RFQ Route Established!</h4>
                <p className="text-xs text-tx-secondary mt-1 max-w-sm">
                  Our industrial sales desk has logged your interest for <span className="font-semibold text-tx-primary">{product.title}</span>.
                  A professional engineering specs sheet and pricing estimate has been queued for <span className="text-brand-green font-medium">{contactEmail}</span>.
                </p>
              </div>

              <div className="bg-green-600/10 p-3 rounded text-[11px] font-mono-custom text-tx-muted w-full text-left">
                <strong>ID:</strong> inq-{Date.now().toString().slice(-6)} <br />
                <strong>Status:</strong> QUEUED IN MONGODB SCHEMA
              </div>

              <button
                onClick={onClose}
                className="cursor-pointer px-6 py-2.5 bg-tx-primary hover:bg-tx-secondary text-white rounded-lg text-xs font-semibold uppercase tracking-wider"
              >
                Return to Product Detail
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
