import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageCarouselProps {
  images: string[];
  productTitle: string;
}

export default function ImageCarousel({ images, productTitle }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const resolveSrc = (img?: string) => {
    if (!img) return "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&auto=format&fit=crop&q=60";
    if (/^[a-fA-F0-9]{24}$/.test(img)) return `/api/files/${img}`;
    return img;
  };

  const listImages = images && images.length > 0 
    ? images.map(resolveSrc)
    : ["https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&auto=format&fit=crop&q=60"];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % listImages.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + listImages.length) % listImages.length);
  };

  return (
    <div className="w-full flex flex-col space-y-3" id="carousel-outer">
      {/* Primary Main Image Container */}
      <div 
        className="group relative cursor-zoom-in overflow-hidden rounded-xl border border-border-subtle bg-bg-subtle aspect-4/3 flex items-center justify-center shadow-inner"
        onClick={() => setIsOpen(true)}
        id="main-image-viewport"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={listImages[currentIndex]}
            alt={`${productTitle} visual view ${currentIndex + 1}`}
            className="h-full w-full object-cover transition-all duration-300"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>

        {/* Hover Highlight Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
          <div className="rounded-full bg-white/90 p-2.5 shadow-md flex items-center space-x-1">
            <Maximize2 className="h-4 w-4 text-tx-primary" />
            <span className="text-[10px] font-bold text-tx-primary uppercase tracking-wider pr-1">Click to Expand</span>
          </div>
        </div>

        {/* Previous Button */}
        {listImages.length > 1 && (
          <button
            onClick={handlePrev}
            className="cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-tx-primary shadow-sm hover:bg-white transition-all hover:scale-105"
            aria-label="Previous Image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {/* Next Button */}
        {listImages.length > 1 && (
          <button
            onClick={handleNext}
            className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-tx-primary shadow-sm hover:bg-white transition-all hover:scale-105"
            aria-label="Next Image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}

        {/* Floating Indicator */}
        <div className="absolute bottom-3 right-3 rounded bg-tx-primary/75 px-2 py-1 text-[11px] font-semibold text-white uppercase tracking-wider backdrop-blur-xs font-mono-custom">
          {currentIndex + 1} / {listImages.length}
        </div>
      </div>

      {/* Thumbnails Row */}
      {listImages.length > 1 && (
        <div className="flex items-center space-x-2 overflow-x-auto pb-1" id="thumbnail-row">
          {listImages.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`cursor-pointer h-16 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                currentIndex === idx 
                  ? "border-green-brand bg-white scale-102" 
                  : "border-transparent hover:border-gray-300 opacity-75 hover:opacity-100"
              }`}
            >
              <img
                src={image}
                alt={`Thumb ${idx + 1}`}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>
      )}

      {/* Modern Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="lightbox-backdrop"
          >
            {/* Close handle */}
            <button
              onClick={() => setIsOpen(false)}
              className="cursor-pointer absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
              id="close-lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Lightbox Central Viewer */}
            <div className="relative flex max-h-[85vh] max-w-[90vw] items-center justify-center">
              {/* Prev */}
              <button
                onClick={handlePrev}
                className="cursor-pointer absolute -left-12 sm:left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-all hover:scale-110"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Main image */}
              <motion.img
                key={currentIndex}
                src={listImages[currentIndex]}
                alt={productTitle}
                className="max-h-[80vh] max-w-full rounded-lg object-contain shadow-2xl"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                referrerPolicy="no-referrer"
              />

              {/* Next */}
              <button
                onClick={handleNext}
                className="cursor-pointer absolute -right-12 sm:right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-all hover:scale-110"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Bottom Info Bar */}
            <div className="mt-4 text-center text-white" id="lightbox-info">
              <h4 className="text-sm font-semibold tracking-wide uppercase text-bebas text-lg tracking-wider text-green-light">
                {productTitle}
              </h4>
              <p className="text-xs text-gray-400 mt-1 font-mono-custom">
                Image {currentIndex + 1} of {listImages.length} • High Resolution Studio Spec
              </p>
              
              {/* Thumbnails in Lightbox for ease of switches */}
              <div className="flex justify-center space-x-2 mt-4 overflow-x-auto max-w-sm mx-auto">
                {listImages.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`cursor-pointer h-10 w-12 rounded-sm border transition-all ${
                      currentIndex === idx 
                        ? "border-green-light scale-105" 
                        : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img src={image} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
