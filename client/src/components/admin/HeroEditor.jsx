import { useState, useEffect } from 'react';

export default function HeroEditor() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });

  useEffect(() => {
    fetch('/api/site_content')
      .then(res => res.json())
      .then(data => {
        if (data.hero_message) {
          setMessage(data.hero_message);
        }
      })
      .catch(err => console.error('Failed to load site content', err))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setStatus({ type: '', text: '' });
    
    try {
      const res = await fetch('/api/site_content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hero_message: message })
      });
      
      if (res.ok) {
        setStatus({ type: 'success', text: 'Message saved successfully.' });
        setTimeout(() => setStatus({ type: '', text: '' }), 3000);
      } else {
        const err = await res.json();
        setStatus({ type: 'error', text: err.error || 'Failed to save message.' });
      }
    } catch (error) {
      setStatus({ type: 'error', text: 'Network error occurred.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="animate-pulse h-32 bg-dusty-rose/10 rounded-xl" />;

  return (
    <div className="bg-white/60 p-6 rounded-2xl shadow-sm border border-dusty-rose/20">
      <h2 className="text-xl font-serif text-charcoal mb-4">Hero Message</h2>
      <p className="text-sm text-charcoal/60 mb-4">
        This is the main message displayed to the visitor on the landing page, right below the title.
      </p>
      
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        className="w-full p-4 rounded-xl border border-dusty-rose/30 focus:outline-none focus:ring-2 focus:ring-terracotta/50 bg-white resize-y mb-4"
        placeholder="A small collection of things that made me think of you."
      />
      
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving || !message.trim()}
          className="px-6 py-2 bg-terracotta text-white rounded-xl font-medium hover:bg-terracotta/90 transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        
        {status.text && (
          <span className={`text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
            {status.text}
          </span>
        )}
      </div>
    </div>
  );
}
