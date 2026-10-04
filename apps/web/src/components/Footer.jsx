import { useState, useEffect } from 'react';
import { Github, Instagram, Youtube, Facebook, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { settingsService } from '../services/api';

const Footer = () => {
  const [settings, setSettings] = useState({
    email: 'contato@pavsoftware.com',
    phone: '+244 951 752 335',
    github: '#',
    instagram: '#',
    youtube: '#',
    facebook: '#'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await settingsService.get();
        if (response.data.success) setSettings(response.data.data);
      } catch (error) {
        console.error('Footer settings fetch error:', error);
      }
    };
    fetchSettings();
  }, []);

  const socialLinks = [
    { icon: Github, link: settings.github },
    { icon: Instagram, link: settings.instagram },
    { icon: Youtube, link: settings.youtube },
    { icon: Facebook, link: settings.facebook }
  ];

  return (
    <footer className="bg-pavdark py-24 border-t border-pavborder relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-pavgold/5 blur-[100px] -z-10"></div>
      
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-8">
            <div className="flex items-center gap-4">
              <img src="/assets/img/PavSoftwareLogo.png" alt="Logo" className="h-12 rounded-full border border-pavgold/20" />
              <h2 className="text-3xl font-black text-white tracking-tighter">PavSoftware</h2>
            </div>
            <p className="text-gray-500 font-medium leading-relaxed">
              Elevating digital standards through uncompromising innovation and elegant technical execution.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h3 className="text-white font-black text-xs uppercase tracking-[0.3em]">Navigation</h3>
            <ul className="space-y-4">
              {['Home', 'Sobre', 'Projects', 'Gallery', 'Testimonials'].map((link) => (
                <li key={link}>
                  <Link to={link === 'Home' ? '/' : `/#${link.toLowerCase()}`} className="text-gray-500 hover:text-pavgold transition-colors font-bold text-sm tracking-widest uppercase">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h3 className="text-white font-black text-xs uppercase tracking-[0.3em]">Communication</h3>
            <div className="space-y-6">
              <p className="flex items-center gap-4 text-gray-500 group">
                <div className="p-3 rounded-xl bg-pavmid border border-pavborder group-hover:border-pavgold/30 transition-all">
                  <Phone size={18} className="text-pavgold" />
                </div>
                <span className="font-bold text-sm">{settings.phone}</span>
              </p>
              <p className="flex items-center gap-4 text-gray-500 group">
                <div className="p-3 rounded-xl bg-pavmid border border-pavborder group-hover:border-pavgold/30 transition-all">
                  <Mail size={18} className="text-pavgold" />
                </div>
                <span className="font-bold text-sm">{settings.email}</span>
              </p>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-8">
            <h3 className="text-white font-black text-xs uppercase tracking-[0.3em]">Social Matrix</h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.link && social.link !== '#' ? social.link : undefined} 
                  target="_blank" 
                  rel="noreferrer"
                  className={`w-14 h-14 rounded-2xl bg-pavmid border border-pavborder flex items-center justify-center text-gray-500 hover:text-pavgold hover:border-pavgold/40 transition-all shadow-xl ${(!social.link || social.link === '#') ? 'opacity-20 cursor-not-allowed' : ''}`}
                >
                  <social.icon size={22} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-pavborder flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} PavSoftware Elite Systems — All rights reserved.
          </p>
          <div className="flex gap-10 text-gray-700 font-bold text-[10px] uppercase tracking-widest">
            <a href="#" className="hover:text-pavgold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-pavgold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
