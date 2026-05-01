import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PawPrint } from 'lucide-react';

export default function Hero() {
  const [message, setMessage] = useState('A small collection of things that made me think of you.');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/site_content')
      .then(res => res.json())
      .then(data => {
        if (data.hero_message) {
          setMessage(data.hero_message);
        }
      })
      .catch(err => console.error('Failed to fetch hero message:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center pt-24 pb-12 w-full max-w-3xl mx-auto"
    >
      <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-terracotta text-center mb-8 tracking-tight">
        If You Ever Wondered
      </h1>
      
      <p className={`text-center text-lg md:text-xl mb-6 text-charcoal/80 leading-relaxed transition-opacity duration-500 ${loading ? 'opacity-50' : 'opacity-100'}`}>
        {message}
      </p>
      
      <p className="text-sm italic text-dusty-rose text-center mb-16">
        curated by Silent Admirer
      </p>
      
      <div className="flex items-center justify-center gap-4 text-dusty-rose/30 w-full max-w-xs mb-8">
        <div className="h-px bg-dusty-rose/20 flex-1"></div>
        <PawPrint size={24} />
        <div className="h-px bg-dusty-rose/20 flex-1"></div>
      </div>
    </motion.section>
  );
}
