import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Heart } from 'lucide-react';
import ReelFormModal from './ReelFormModal';

export default function ReelsTable() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReel, setEditingReel] = useState(null);

  const fetchReels = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/reels');
      const data = await res.json();
      setReels(data);
    } catch (err) {
      console.error('Failed to fetch reels', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReels();
  }, []);

  const handleAdd = () => {
    setEditingReel(null);
    setIsModalOpen(true);
  };

  const handleEdit = (reel) => {
    setEditingReel(reel);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this reel?')) return;
    
    try {
      const res = await fetch(`/api/reels/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchReels();
      } else {
        alert('Failed to delete reel');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  if (loading && reels.length === 0) return <div className="animate-pulse h-64 bg-dusty-rose/10 rounded-2xl" />;

  return (
    <div className="bg-white/60 rounded-2xl shadow-sm border border-dusty-rose/20 overflow-hidden">
      <div className="p-6 border-b border-dusty-rose/20 flex items-center justify-between bg-cream/30">
        <h2 className="text-xl font-serif text-charcoal">Curated Reels</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-terracotta text-white rounded-xl font-medium hover:bg-terracotta/90 transition-colors text-sm"
        >
          <Plus size={16} />
          Add Reel
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-dusty-rose/5 border-b border-dusty-rose/10 text-charcoal/60 text-sm">
              <th className="px-6 py-4 font-medium w-24">Thumbnail</th>
              <th className="px-6 py-4 font-medium">Note</th>
              <th className="px-6 py-4 font-medium w-24 text-center">Reactions</th>
              <th className="px-6 py-4 font-medium w-32 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dusty-rose/10">
            {reels.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center text-charcoal/50 italic">
                  No reels added yet.
                </td>
              </tr>
            ) : (
              reels.map(reel => (
                <tr key={reel.id} className="hover:bg-white/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-16 h-24 bg-dusty-rose/20 rounded-lg overflow-hidden relative shadow-sm">
                      {reel.thumbnail_url ? (
                        <img src={reel.thumbnail_url} alt="Thumbnail" className="w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-xs text-charcoal/40 text-center p-1">No Img</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-charcoal/80 line-clamp-3 whitespace-pre-wrap">
                      {reel.personal_note || <span className="italic text-charcoal/40">No note added.</span>}
                    </p>
                    <a href={reel.instagram_url} target="_blank" rel="noreferrer" className="text-xs text-terracotta/70 hover:text-terracotta hover:underline mt-2 inline-block">
                      View Original URL
                    </a>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-dusty-rose">
                      <Heart size={16} fill="currentColor" />
                      <span className="font-medium text-charcoal">{reel.reaction_count || 0}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => handleEdit(reel)} className="text-charcoal/40 hover:text-terracotta transition-colors p-2" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(reel.id)} className="text-charcoal/40 hover:text-red-500 transition-colors p-2" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ReelFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={fetchReels}
        initialData={editingReel}
      />
    </div>
  );
}
