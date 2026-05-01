import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { getVisitorId } from '../../utils/visitor';
import { LoadingState, EmptyState, ErrorState } from './GalleryStates';

function ReelFeedItem({ reel }) {
  const embedRef = useRef(null);
  const [reacted, setReacted] = useState(reel.has_reacted);

  // Process Instagram embed when this item mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process(embedRef.current);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleReact = async (e) => {
    e.stopPropagation();
    setReacted(!reacted);
    try {
      const res = await fetch(`/api/reels/${reel.id}/react`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitor_id: getVisitorId() })
      });
      if (!res.ok) throw new Error('Failed');
    } catch (err) {
      setReacted(reacted);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-warm-cream/50 overflow-hidden"
    >
      {/* Embedded Instagram Player */}
      <div
        ref={embedRef}
        className="w-full flex justify-center bg-white pt-4 px-2"
        dangerouslySetInnerHTML={{ __html: reel.embed_html }}
      />

      {/* Personal Note + React Button */}
      <div className="p-5 md:p-6 bg-warm-cream/20 border-t border-warm-cream/40">
        <div className="flex items-start justify-between gap-4">
          <p className="text-charcoal/80 text-[15px] leading-relaxed whitespace-pre-wrap flex-1">
            {reel.personal_note}
          </p>
          <button
            onClick={handleReact}
            className={`shrink-0 p-2.5 rounded-full transition-all duration-300 ${
              reacted
                ? 'bg-terracotta/10 scale-110'
                : 'bg-charcoal/5 hover:bg-terracotta/10'
            }`}
            aria-label="React to reel"
          >
            <Heart
              size={20}
              className={`transition-colors ${
                reacted
                  ? 'fill-terracotta text-terracotta'
                  : 'text-charcoal/40'
              }`}
            />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function Gallery() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const vid = getVisitorId();
    fetch(`/api/reels?visitor_id=${vid}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => setReels(data))
      .catch(err => {
        console.error('Failed to fetch reels:', err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="w-full max-w-xl mx-auto pb-24 px-4">
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState />
      ) : reels.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-8">
          {reels.map(reel => (
            <ReelFeedItem key={reel.id} reel={reel} />
          ))}
        </div>
      )}
    </section>
  );
}
