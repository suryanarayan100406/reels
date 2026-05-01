import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroEditor from './HeroEditor';
import ReelsTable from './ReelsTable';
import { LogOut } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('reels');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white/80 backdrop-blur-md border-b border-dusty-rose/20 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="font-serif text-2xl text-terracotta">Admin Panel</h1>
          
          <div className="flex items-center gap-6">
            <nav className="flex gap-4">
              <button 
                onClick={() => setActiveTab('reels')}
                className={`text-sm font-medium transition-colors ${activeTab === 'reels' ? 'text-terracotta' : 'text-charcoal/60 hover:text-charcoal'}`}
              >
                Reels
              </button>
              <button 
                onClick={() => setActiveTab('hero')}
                className={`text-sm font-medium transition-colors ${activeTab === 'hero' ? 'text-terracotta' : 'text-charcoal/60 hover:text-charcoal'}`}
              >
                Hero Message
              </button>
            </nav>
            <button 
              onClick={handleLogout}
              className="text-charcoal/60 hover:text-terracotta transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'reels' ? <ReelsTable /> : <HeroEditor />}
      </main>
    </div>
  );
}
