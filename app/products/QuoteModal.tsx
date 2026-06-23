import React, { useState } from "react";
import type { Product } from "@/lib/types";
import { X, CheckCircle, Mail, Building, Database } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuoteModalProps {
  product: Product;
  onClose: () => void;
}

export default function QuoteModal({ product, onClose }: QuoteModalProps) {
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("Commercial Price Quote");
  const [quantity, setQuantity] = useState<number>(product.moq.value);
  const [notes, setNotes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    if (!companyName || !contactName || !contactEmail || !quantity) {
      setSubmitError("Please complete all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productTitle: product.title,
          productSlug: product.slug,
          companyName,
          contactName,
          contactEmail,
          inquiryType,
          quantityRequested: quantity,
          quantityUnit: product.moq.unit,
          notes,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit inquiry");
      }

      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setSubmitError(error instanceof Error ? error.message : "Unable to submit your inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs" id="quote-modal-backdrop">
      <motion.div
        className="relative w-full max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl border border-border-subtle flex flex-col sm:max-w-lg md:max-w-xl lg:max-w-2xl"
        initial={{ y: 30, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        id="quote-modal-card"
      >
        {/* Modal Top Header Banner - Sticky */}
        <div className="sticky top-0 z-10 bg-green-600/10 p-4 sm:p-5 border-b border-border-subtle flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2 min-w-0">
            <Database className="h-5 w-5 text-brand-green flex-shrink-0" />
            <div className="min-w-0">
              <h3 className="font-bebas text-base sm:text-lg tracking-wider text-tx-primary truncate">RFQ & Sample Request</h3>
              <p className="text-xs text-tx-secondary truncate">Direct routing to Mechelin Sales Engineers Desk</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer text-tx-muted hover:text-tx-primary p-1.5 hover:bg-black/5 rounded-full transition-all flex-shrink-0 ml-2"
            aria-label="Close RFQ dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto flex-1">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                onSubmit={handleSubmit}
                className="p-4 sm:p-6 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="p-3 bg-green-600/10 rounded-lg text-xs leading-relaxed text-tx-secondary">
                  You are requesting specifications on <span className="font-semibold text-tx-primary">{product.title}</span>.
                  Minimum Order Quantity is <span className="font-semibold text-brand-green">{product.moq.value} {product.moq.unit}</span>.
                </div>

                {/* Inquiry Type selection */}
                {/* <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-tx-secondary mb-1.5">
                    Request Intent *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Commercial Price Quote", "Free Lab Sample Tube"].map((type) => (
                      <label
                        key={type}
                        className={`cursor-pointer flex items-center justify-center border p-3 rounded-lg text-xs font-medium transition-all ${inquiryType === type
                          ? "border-green-600 bg-green-600/10 text-green-600 font-semibold"
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
                </div> */}

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
                        name="companyName"
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
                      name="contactName"
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
                      // value={quantity}
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

                {/* Error message if any */}
                {submitError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                    {submitError}
                  </div>
                )}

                {/* Sticky Submit Button */}
                <div className="sticky bottom-0 pt-4 bg-white border-t border-border-subtle -mx-4 sm:-mx-6 px-4 sm:px-6 py-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full overflow-hidden rounded-lg bg-brand-green px-4 py-3 text-xs font-medium uppercase tracking-wider text-white shadow-md shadow-brand-green/10 transition-all hover:bg-brand-green/80 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10">{isSubmitting ? "Sending..." : "Send Direct Request"}</span>
                    <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-full" />
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                className="p-6 sm:p-8 text-center flex flex-col items-center justify-center space-y-4"
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
                  <strong>Status:</strong> SENT
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
        </div>
      </motion.div>
    </div>
  );
}
