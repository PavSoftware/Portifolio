import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, MessageSquareQuote } from 'lucide-react';
import { testimonialService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await testimonialService.getAll();
        if (response.data.success) {
          setTestimonials(response.data.data);
        }
      } catch (error) {
        console.error('Testimonials API Error:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="pt-40 pb-32 px-6 min-h-screen">
      <div className="container-custom">
        <div className="max-w-4xl mb-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-pavgold/10 text-pavgold border border-pavgold/20">
              <MessageSquareQuote size={28} />
            </div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-pavgold opacity-60">Client Success</h2>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tight leading-none">
            {t('testimonials')}
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl font-medium leading-relaxed max-w-2xl">
            Hear directly from the visionaries and leaders who partnered with PavSoftware to redefine their digital presence.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="h-[400px] bg-pavmid rounded-[3rem] animate-pulse border border-gray-800"></div>
            ))}
          </div>
        ) : testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatePresence>
              {testimonials.map((t, idx) => (
                <motion.div 
                  key={t.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="bg-pavmid/50 p-12 rounded-[3.5rem] border border-gray-800/50 relative group hover:border-pavgold/30 transition-all shadow-[0_30px_100px_rgba(0,0,0,0.3)] flex flex-col backdrop-blur-sm"
                >
                  <Quote className="absolute top-10 right-12 text-pavgold/5 w-24 h-24 group-hover:text-pavgold/10 transition-colors" />
                  
                  <div className="flex gap-1.5 mb-10">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} className="fill-pavgold text-pavgold shadow-pavgold/20" />
                    ))}
                  </div>

                  <p className="text-gray-300 text-2xl md:text-3xl font-medium italic mb-12 leading-[1.6] relative z-10">
                    "{t.content}"
                  </p>

                  <div className="mt-auto flex items-center gap-6 pt-10 border-t border-gray-800/50">
                    <div className="relative">
                      <div className="absolute inset-0 bg-pavgold blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                      <img 
                        src={t.avatarUrl || `https://i.pravatar.cc/150?u=${t.id}`} 
                        alt={t.name} 
                        className="w-20 h-20 rounded-full border-2 border-pavgold/30 object-cover shadow-2xl relative z-10"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-black text-xl tracking-tight mb-1">{t.name}</h4>
                      <p className="text-pavgold text-sm font-black uppercase tracking-widest opacity-80">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-40 bg-pavmid/20 rounded-[4rem] border-2 border-dashed border-gray-800/50">
            <p className="text-gray-500 text-xl font-medium">No testimonials found.</p>
          </div>
        )}

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 p-20 rounded-[4rem] bg-gradient-to-br from-pavgold/10 via-pavmid to-pavdark border border-pavgold/20 text-center shadow-[0_50px_150px_rgba(212,175,55,0.05)] relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-pavgold/5 rounded-full blur-[100px] -z-10 group-hover:bg-pavgold/10 transition-colors"></div>
          <h2 className="text-3xl md:text-6xl font-black text-white mb-8 tracking-tight">
            {t('be_success_story')}
          </h2>
          <p className="text-gray-400 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Ready to bring your idea to life? Contact us today and let's build something amazing together.
          </p>
          <a href="https://wa.me/244951752335" target="_blank" rel="noreferrer" className="btn-primary mx-auto w-fit !px-16 !py-6 text-xl shadow-2xl shadow-pavgold/30">
            {t('get_started')}
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
