"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { deleteContactAction } from '@/controllers/contactController';
import type { Contact } from '@/lib/types';

interface AdminContactPageProps {
  initialContacts: Contact[];
}

export default function AdminContactPage({ initialContacts }: AdminContactPageProps) {
  const [contacts, setContacts] = useState(initialContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  const openDrawer = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDrawerOpen(true);
  };

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedContact(null), 300);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDrawerOpen) {
        closeDrawer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  const handleDeleteContact = async (id: string) => {
    try {
      await deleteContactAction(id);
      setContacts((prev) => prev.filter((item) => item._id !== id));
      if (selectedContact?._id === id) closeDrawer();
      toast.success('Contact deleted successfully');
    } catch {
      toast.error('Unable to delete contact.');
    }
  };

  return (
    <div className="space-y-4 text-left" id="subview-admin-contacts">
      <div>
        <h2 className="text-bebas text-3xl text-tx-primary tracking-wide">
          Contact Inquiry Ledger
        </h2>
        <p className="text-xs text-tx-secondary">
          Tracks all contact form submissions, support requests, and business leads received from the public portal.
        </p>
      </div>

      <div className="rounded-xl border border-border-subtle bg-white p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h4 className="tracking-wide font-bebas text-lg uppercase text-tx-primary">
            Contact Records
          </h4>
          <span className="rounded-full bg-gold-brand text-white text-[10px] font-bold px-2.5 py-0.5">
            {contacts.length} Active Contacts
          </span>
        </div>

        {contacts.length === 0 ? (
          <div className="p-8 text-center bg-bg-subtle rounded-lg text-tx-muted text-xs">
            No contact submissions are available yet. Messages will appear here as soon as the contact form is used.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-tx-muted uppercase font-semibold">
                  <th className="py-2.5 px-3">Name</th>
                  <th className="py-2.5 px-3">Company</th>
                  <th className="py-2.5 px-3">Email</th>
                  <th className="py-2.5 px-3">Channel</th>
                  <th className="py-2.5 px-3">Message</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-tx-secondary">
                {contacts.map((contact, idx) => (
                  <tr
                    key={contact._id || idx}
                    onClick={() => openDrawer(contact)}
                    className="hover:bg-bg-subtle/50 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-3">
                      <div className="font-semibold text-tx-primary">{contact.name}</div>
                      <div className="text-[10px] text-tx-muted">
                        {contact.country || 'Unknown region'}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-tx-secondary">{contact.company || 'N/A'}</td>
                    <td className="py-3 px-3">
                      <a href={`mailto:${contact.email}`} className="text-green-brand font-medium hover:underline">
                        {contact.email}
                      </a>
                    </td>
                    <td className="py-3 px-3 capitalize">{contact.channel}</td>
                    <td
                      className="py-3 px-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDrawer(contact);
                      }}
                    >
                      <p className="max-w-xs text-[11px] truncate text-tx-muted italic">
                        {contact.message
                          ? `${contact.message.slice(0, 60)}${contact.message.length > 60 ? '…' : ''}`
                          : 'No special requests outlined.'}
                      </p>
                      <span className="self-end text-[10px] text-brand-green font-semibold mt-0.5 block align-right hover:underline">
                          View →
                        </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          void handleDeleteContact(contact._id);
                        }}
                        className="cursor-pointer text-[10px] text-red-500 hover:text-red-700 font-bold uppercase transition-colors"
                        title="Delete contact"
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

      <AnimatePresence>
        {isDrawerOpen && selectedContact && (
          <>
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

            <motion.aside
              key="drawer"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-full sm:max-w-[480px] xl:max-w-[460px] bg-white/95 backdrop-blur-xl border-l border-white/60 shadow-2xl flex-col h-full"
              aria-label="Contact detail drawer"
            >
              <div className="flex items-start justify-between px-5 py-4 border-b border-gray-100">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-tx-muted mb-0.5">
                    Contact Detail
                  </p>
                  <h3 className="font-bebas text-xl text-tx-primary tracking-wide leading-none">
                    {selectedContact.name}
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

              <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 min-h-0">
                <DrawerSection label="Primary Contact">
                  <DrawerRow label="Name" value={selectedContact.name} />
                  <DrawerRow label="Company" value={selectedContact.company || 'N/A'} />
                  <DrawerRow
                    label="Email"
                    value={
                      <a href={`mailto:${selectedContact.email}`} className="text-green-brand hover:underline">
                        {selectedContact.email}
                      </a>
                    }
                  />
                  <DrawerRow label="Phone" value={selectedContact.phone || 'N/A'} />
                </DrawerSection>

                <DrawerSection label="Request Details">
                  <DrawerRow label="Channel" value={selectedContact.channel} />
                  <DrawerRow label="Country" value={selectedContact.country || 'N/A'} />
                  <DrawerRow label="Type" value={selectedContact.type || 'N/A'} />
                  <DrawerRow label="Product" value={selectedContact.product || 'N/A'} />
                  <DrawerRow label="Volume" value={selectedContact.volume || 'N/A'} />
                </DrawerSection>

                <DrawerSection label="Message">
                  <div className="rounded-lg bg-bg-subtle border border-gray-100 p-3 text-xs text-tx-secondary leading-relaxed whitespace-pre-wrap">
                    {selectedContact.message || (
                      <span className="text-tx-muted italic">No message content was submitted.</span>
                    )}
                  </div>
                </DrawerSection>
              </div>

              <div className="sticky bottom-0 z-10 px-5 py-4 border-t border-gray-100 bg-white/95 backdrop-blur-xl flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => void handleDeleteContact(selectedContact._id)}
                  className="w-full  text-red-500 hover:text-red-700 text-sm font-semibold uppercase tracking-[0.16em] py-3 rounded-2xl shadow-lg shadow-red-600/10 transition-all duration-200"
                >
                  Delete contact
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
