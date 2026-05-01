import React, { useState, useEffect } from 'react';
import ReelCard from './ReelCard';
import Lightbox from './Lightbox';
import { getVisitorId } from '../../utils/visitor';

export default function Gallery() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReel, setSelectedReel] = useState(null);

  useEffect(() => {
    const vid = getVisitorId();
    fetch(`/api/reels?visitor_id=${vid}`)
      .then(res => res.json())
      .then(data => {
        // Backend handles sorting now
        setReels(data);
      })
      .catch(err => console.error('Failed to fetch reels:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="w-full max-w-6xl mx-auto pb-24 px-4">
        {loading ? (
          <p className="text-center text-charcoal/50">Loading collection...</p>
        ) : reels.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-charcoal/60">Nothing here yet... 🐱</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reels.map(reel => (
              <ReelCard key={reel.id} reel={reel} onClick={() => setSelectedReel(reel)} />
            ))}
          </div>
        )}
      </section>

      {selectedReel && (
        <Lightbox 
          reel={selectedReel} 
          onClose={() => setSelectedReel(null)} 
        />
      )}
    </>
  );
}
