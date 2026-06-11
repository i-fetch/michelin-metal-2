import React from "react";

export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-border-subtle bg-white shadow-sm overflow-hidden">
      <div className="h-52 w-full bg-slate-200" />
      <div className="p-5 space-y-4">
        <div className="h-5 w-3/4 rounded-full bg-slate-200" />
        <div className="h-3 w-full rounded-full bg-slate-200" />
        <div className="h-3 w-5/6 rounded-full bg-slate-200" />
        <div className="grid grid-cols-2 gap-2 pt-3">
          <div className="h-10 rounded-xl bg-slate-200" />
          <div className="h-10 rounded-xl bg-slate-200" />
          <div className="col-span-2 h-10 rounded-xl bg-slate-200" />
        </div>
        <div className="flex items-center justify-between pt-3">
          <div className="h-4 w-24 rounded-full bg-slate-200" />
          <div className="h-9 w-24 rounded-full bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
