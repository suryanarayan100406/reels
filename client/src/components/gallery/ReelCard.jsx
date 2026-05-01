import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { getVisitorId } from '../../utils/visitor';

export default function ReelCard({ reel, onClick }) {
  const [reacted, setReacted] = useState(reel.has_reacted);

  const handleReact = async (e) => {
    e.stopPropagation(); // Don't open the lightbox
    
    // Optimistic UI toggle
    setReacted(!reacted);
    
    try {
      const res = await fetch(`/api/reels/${reel.id}/react`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitor_id: getVisitorId() })
      });
      
      if (!res.ok) {
        throw new Error('Failed to react');
      }
    } catch (err) {
      console.error(err);
      // Revert state if failed
      setReacted(reacted);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onClick={onClick} 
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-[0_8px_30px_rgb(193,127,92,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full border border-warm-cream/50 relative"
    >
      <button
        onClick={handleReact}
        className={`absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-sm ${
          reacted 
            ? 'bg-white/90 scale-110' 
            : 'bg-black/20 hover:bg-black/40'
        }`}
        aria-label="React to reel"
      >
        <Heart 
          size={18} 
          className={`transition-colors ${
            reacted 
              ? 'fill-terracotta text-terracotta' 
              : 'text-white'
          }`} 
        />
      </button>

      {reel.thumbnail_url ? (
        <img 
          src={reel.thumbnail_url} 
          alt="Reel thumbnail" 
          className="w-full aspect-[4/5] object-cover bg-warm-cream/50"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextElementSibling.style.display = 'flex';
          }}
        />
      ) : null}
      
      {/* Fallback box if no image or image fails to load */}
      <div 
        className="w-full aspect-[4/5] bg-warm-cream/50 flex items-center justify-center text-dusty-rose"
        style={{ display: reel.thumbnail_url ? 'none' : 'flex' }}
      >
        <span>No thumbnail</span>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <p className="text-charcoal/80 text-sm leading-relaxed line-clamp-3 mb-2 flex-grow whitespace-pre-wrap">
          {reel.personal_note}
        </p>
        <span className="text-dusty-rose text-xs italic font-medium">read more</span>
      </div>
    </motion.div>
  );
}
