"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { archiveInquiryAction } from '@/controllers/inquiryController';
import type { Inquiry } from '@/lib/types';

interface InquiriesPageProps {
  initialInquiries: Inquiry[];
}

export default function InquiriesPage({ initialInquiries }: InquiriesPageProps) {
  const router = useRouter();
  const [inquiries, setInquiries] = useState(initialInquiries);

  const handleArchiveInquiry = async (id: string) => {
    try {
      await archiveInquiryAction(id);
      setInquiries((prev) => prev.filter((item) => item._id !== id));
      toast.success('Inquiry archived successfully');
    } catch (error) {
      toast.error('Unable to archive inquiry.');
    }
  };

  const handleOpenProduct = (slug: string) => {
    router.push(`/products/${slug}`);
  };

  return (
    <div className="space-y-6 text-left" id="subview-admin-inquiries">
      <div>
        <h2 className="text-bebas text-3xl text-tx-primary tracking-wide">Mechelin Trade Desk Request Stream</h2>
        <p className="text-xs text-tx-secondary">Strictly lists active B2B inquires and laboratory sample requests received directly from product pages.</p>
      </div>

      <div className="rounded-xl border border-border-subtle bg-white p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h4 className="font-bebas text-lg uppercase text-tx-primary">Client Submissions Queue</h4>
          <span className="rounded-full bg-gold-brand text-white text-[10px] font-bold px-2.5 py-0.5">
            {inquiries.length} Active Requests
          </span>
        </div>

        {inquiries.length === 0 ? (
          <div className="p-8 text-center bg-bg-subtle rounded-lg text-tx-muted text-xs">
            All submitted inquiries have been reviewed and archived. Submit an RFQ request on any product details catalog page to register new submissions.
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
                  <tr key={inq._id || idx} className="hover:bg-bg-subtle/50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-tx-primary">{inq.companyName}</div>
                      <div className="text-[10px] text-tx-muted">{inq.contactName} ({inq.contactEmail})</div>
                    </td>
                    <td className="py-3 px-3">
                      <button
                        type="button"
                        onClick={() => handleOpenProduct(inq.productSlug)}
                        className="cursor-pointer text-green-brand font-medium hover:underline"
                      >
                        {inq.productTitle}
                      </button>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        inq.inquiryType.includes('Sample')
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-green-100 text-green-800 border border-green-200'
                      }`}>
                        {inq.inquiryType}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono-custom font-semibold text-tx-primary">
                      {inq.quantityRequested} {inq.quantityUnit || 'tonne'}
                    </td>
                    <td className="py-3 px-3">
                      <p className="max-w-xs text-[11px] truncate" title={inq.notes}>{inq.notes || 'No special requests outlined.'}</p>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => void handleArchiveInquiry(inq._id)}
                        className="cursor-pointer text-[10px] text-red-500 hover:text-red-700 font-bold uppercase transition-colors"
                        title="Review and Archive"
                      >
                        Archive
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
