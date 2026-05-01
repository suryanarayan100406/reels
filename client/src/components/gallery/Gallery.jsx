import React, { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getVisitorId } from '../../utils/visitor';
import { LoadingState, EmptyState, ErrorState } from './GalleryStates';

function extractShortcode(url) {
  const match = url.match(/\/reel\/([^/?]+)/);
  return match ? match[1] : null;
}

function ReelFeedItem({ reel }) {
  const [reacted, setReacted] = useState(reel.has_reacted);
  const [showHeart, setShowHeart] = useState(false);
  const containerRef = useRef(null);

  const handleReact = async () => {
    const newState = !reacted;
    setReacted(newState);

    // Show the big heart animation on like
    if (newState) {
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 800);
    }

    try {
      const res = await fetch(`/api/reels/${reel.id}/react`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitor_id: getVisitorId() })
      });
      if (!res.ok) throw new Error('Failed');
    } catch (err) {
      setReacted(!newState);
    }
  };

  const handleDoubleTap = () => {
    if (!reacted) handleReact();
    else {
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 800);
    }
  };

  const shortcode = extractShortcode(reel.instagram_url);
  const embedSrc = `https://www.instagram.com/reel/${shortcode}/embed/?cr=1&v=14&wp=540`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative"
    >
      {/* Reel Video Container — clips IG header & footer */}
      <div
        ref={containerRef}
        className="relative rounded-2xl overflow-hidden bg-black shadow-lg"
        onDoubleClick={handleDoubleTap}
        style={{ aspectRatio: '9/16', maxHeight: '75vh' }}
      >
        <iframe
          src={embedSrc}
          className="absolute border-0"
          style={{
            top: '-64px',
            left: 0,
            width: '100%',
            height: 'calc(100% + 64px + 220px)',
          }}
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          loading="lazy"
          title={`Reel ${reel.id}`}
        />

        {/* Big heart animation on double tap */}
        <AnimatePresence>
          {showHeart && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            >
              <Heart size={80} className="fill-white text-white drop-shadow-lg" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Custom Note + Like Button below the reel */}
      <div className="flex items-start gap-3 mt-3 px-1">
        <p className="text-charcoal/80 text-[15px] leading-relaxed whitespace-pre-wrap flex-1">
          {reel.personal_note}
        </p>
        <button
          onClick={handleReact}
          className="shrink-0 mt-0.5 group"
          aria-label="React to reel"
        >
          <motion.div whileTap={{ scale: 1.3 }}>
            <Heart
              size={24}
              className={`transition-all duration-300 ${
                reacted
                  ? 'fill-terracotta text-terracotta scale-110'
                  : 'text-charcoal/30 group-hover:text-terracotta/60'
              }`}
            />
          </motion.div>
        </button>
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
    <section className="w-full max-w-md mx-auto pb-24 px-4">
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState />
      ) : reels.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-10">
          {reels.map(reel => (
            <ReelFeedItem key={reel.id} reel={reel} />
          ))}
        </div>
      )}
    </section>
  );
}
