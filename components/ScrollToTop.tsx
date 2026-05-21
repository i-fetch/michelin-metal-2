'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-green-700 text-white shadow-2xl duration-300 hover:scale-110 ${
      // className={`hidden fixed bottom-6 right-6 z-50 p-3 rounded-full bg-linear-to-r from-blue-600 to-cyan-600 text-white shadow-2xl transition-opacity duration-300 hover:scale-110 ${
        isVisible
          ? 'opacity-100 pointer-events-auto animate animate-pulse'
          : 'opacity-0 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}