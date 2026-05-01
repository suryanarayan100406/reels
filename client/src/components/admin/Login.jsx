import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        navigate('/admin');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to login');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-dusty-rose/20 w-full max-w-md"
      >
        <h1 className="font-serif text-3xl text-terracotta mb-6 text-center">Admin Login</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-charcoal/80 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-dusty-rose/30 focus:outline-none focus:ring-2 focus:ring-terracotta/50 bg-white"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-terracotta text-white rounded-xl font-medium hover:bg-terracotta/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Enter'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
