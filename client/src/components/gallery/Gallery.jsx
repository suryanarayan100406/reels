import React, { useState, useEffect } from 'react';
import ReelCard from './ReelCard';
import Lightbox from './Lightbox';
import { getVisitorId } from '../../utils/visitor';
import { LoadingState, EmptyState, ErrorState } from './GalleryStates';

export default function Gallery() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedReel, setSelectedReel] = useState(null);

  useEffect(() => {
    const vid = getVisitorId();
    fetch(`/api/reels?visitor_id=${vid}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setReels(data);
      })
      .catch(err => {
        console.error('Failed to fetch reels:', err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="w-full max-w-6xl mx-auto pb-24 px-4">
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState />
        ) : reels.length === 0 ? (
          <EmptyState />
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
