import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function Lightbox({ reel, onClose }) {
  const modalRef = useRef(null);

  // Lock body scroll when mounted
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Process Instagram embed script
  useEffect(() => {
    // We give React a moment to flush the DOM with the raw html
    const timer = setTimeout(() => {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [reel.embed_html]);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <button 
        className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white transition-colors"
        onClick={onClose}
      >
        <X size={32} />
      </button>

      <div 
        ref={modalRef}
        className="bg-white rounded-2xl w-full max-w-lg max-h-[95vh] overflow-y-auto shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* We use bg-white to blend with the IG player background */}
        <div 
          className="w-full flex justify-center bg-white pt-4 px-2 md:px-4"
          dangerouslySetInnerHTML={{ __html: reel.embed_html }} 
        />
        
        <div className="p-6 md:p-8 bg-warm-cream/30 border-t border-warm-cream flex-grow">
          <p className="text-charcoal whitespace-pre-wrap leading-relaxed text-[15px] md:text-base">
            {reel.personal_note}
          </p>
        </div>
      </div>
    </div>
  );
}
