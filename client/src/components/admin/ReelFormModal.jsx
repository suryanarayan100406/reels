import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function ReelFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [url, setUrl] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setUrl(initialData.instagram_url || '');
      setNote(initialData.personal_note || '');
    } else {
      setUrl('');
      setNote('');
    }
    setError('');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = initialData ? `/api/reels/${initialData.id}` : '/api/reels';
    const method = initialData ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instagram_url: url, personal_note: note })
      });

      if (res.ok) {
        onSubmit();
        onClose();
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to save reel');
      }
    } catch (err) {
      setError('Network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-dusty-rose/20 bg-cream/30">
          <h2 className="font-serif text-xl text-terracotta">{initialData ? 'Edit Reel' : 'Add Reel'}</h2>
          <button onClick={onClose} className="text-charcoal/50 hover:text-charcoal">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal/80 mb-2">Instagram Reel URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.instagram.com/reel/..."
                className="w-full px-4 py-3 rounded-xl border border-dusty-rose/30 focus:outline-none focus:ring-2 focus:ring-terracotta/50 bg-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-charcoal/80 mb-2">Personal Note</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={5}
                placeholder="Why did you choose this reel?"
                className="w-full px-4 py-3 rounded-xl border border-dusty-rose/30 focus:outline-none focus:ring-2 focus:ring-terracotta/50 bg-white resize-y"
              />
            </div>
          </div>
          
          {error && <div className="mt-4 text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</div>}
          
          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-medium text-charcoal/60 hover:bg-dusty-rose/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl font-medium bg-terracotta text-white hover:bg-terracotta/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
