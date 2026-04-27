import { motion } from 'framer-motion';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-pavbg/80 to-pavdark -z-10"></div>
      
      {/* Animated Elements */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <h3 className="text-sm md:text-base font-bold text-pavgold/60 tracking-[0.4em] mb-6 uppercase">
          {t('hero_subtitle')}
        </h3>
        
        <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight">
          {t('hero_title').split(' ').map((word, i) => (
            <span key={i} className={i === 2 ? "text-pavgold glow-gold" : ""}>
              {word}{' '}
            </span>
          ))}
        </h1>
        
        <p className="text-gray-400 text-lg md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
          {t('hero_desc')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a href="https://wa.me/244951752335" target="_blank" rel="noopener noreferrer" className="btn-primary !px-12 !py-5 text-lg shadow-2xl shadow-pavgold/20">
            <MessageSquare size={24} />
            {t('talk_to_us')}
          </a>
          <Link to="/projects" className="group flex items-center gap-3 text-white font-bold text-lg hover:text-pavgold transition-colors px-8 py-5">
            {t('see_portfolio')}
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-pavgold/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pavgold/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] -z-20"></div>
    </section>
  );
};

export default Hero;
