import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t, lang, setLang } = useLanguage();
  const { admin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('about'), path: '/#about' },
    { name: t('projects'), path: '/projects' },
    { name: t('gallery'), path: '/gallery' },
    { name: t('testimonials'), path: '/testimonials' },
    { name: t('contact'), path: '/#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-pavdark/90 backdrop-blur-md py-3 shadow-lg border-b border-pavgold/10' : 'bg-transparent py-5'}`}>
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-full border border-pavgold/30 overflow-hidden bg-pavdark flex items-center justify-center transition-transform group-hover:scale-110">
            <img src="/assets/img/PavSoftwareLogo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-2xl font-bold text-pavgold glow-gold tracking-tight">PavSoftware</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-pavgold ${location.pathname === link.path ? 'text-pavgold' : 'text-gray-300'}`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-4 pl-4 border-l border-gray-800">
            <button 
              onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
              className="flex items-center gap-2 text-gray-400 hover:text-pavgold transition-colors text-xs font-bold uppercase"
            >
              <Globe size={16} />
              {lang.toUpperCase()}
            </button>

            {admin ? (
              <button 
                onClick={logout}
                className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors text-xs font-bold uppercase"
              >
                <LogOut size={16} />
                {t('logout')}
              </button>
            ) : (
              <Link to="/login" className="bg-pavgold hover:bg-pavgold-hover text-black px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all">
                {t('admin')}
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-pavmid border-t border-pavgold/10 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-lg font-bold text-gray-300 hover:text-pavgold transition"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="flex flex-col gap-6 pt-6 border-t border-gray-800">
                <button 
                  onClick={() => {
                    setLang(lang === 'pt' ? 'en' : 'pt');
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 text-gray-300 font-bold"
                >
                  <Globe size={20} className="text-pavgold" />
                  {lang === 'pt' ? 'English' : 'Português'}
                </button>

                {admin ? (
                  <button 
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 text-red-500 font-bold"
                  >
                    <LogOut size={20} />
                    {t('logout')}
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="bg-pavgold text-black text-center py-4 rounded-2xl font-black text-lg uppercase tracking-widest"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('admin')}
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
