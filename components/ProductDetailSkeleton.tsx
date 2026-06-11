import React from "react";

export default function ProductDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="h-10 w-1/3 rounded-full bg-slate-200 animate-pulse" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4">
          <div className="h-[420px] rounded-3xl bg-slate-200 animate-pulse" />
          <div className="rounded-3xl bg-slate-200 p-6 space-y-4 animate-pulse">
            <div className="h-4 w-1/2 rounded-full bg-slate-300" />
            <div className="h-4 w-5/6 rounded-full bg-slate-300" />
          </div>
        </div>
        <div className="lg:col-span-7 space-y-4">
          <div className="h-10 w-2/3 rounded-full bg-slate-200 animate-pulse" />
          <div className="h-4 w-full rounded-full bg-slate-200 animate-pulse" />
          <div className="h-4 w-4/6 rounded-full bg-slate-200 animate-pulse" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-28 rounded-3xl bg-slate-200 animate-pulse" />
            <div className="h-28 rounded-3xl bg-slate-200 animate-pulse" />
          </div>
          <div className="h-10 rounded-full bg-slate-200 animate-pulse" />
          <div className="h-[320px] rounded-3xl bg-slate-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
