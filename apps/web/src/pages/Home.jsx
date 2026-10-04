import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  ArrowRight, 
  Github, 
  ExternalLink, 
  ChevronRight, 
  ChevronLeft,
  Quote,
  Star,
  Send,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  Youtube,
  Facebook
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectService, galleryService, testimonialService, settingsService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { formatCurrency } from '../utils/format';
import Hero from '../components/Hero';
import ImageModal from '../components/ImageModal';

const Home = () => {
  const { t } = useLanguage();
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [latestProjects, setLatestProjects] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [siteSettings, setSiteSettings] = useState({ phone: '+244 951 752 335', email: 'contato@pavsoftware.com' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuredRes, latestRes, galleryRes, testimonialRes, settingsRes] = await Promise.all([
          projectService.getAll({ isFeatured: true, limit: 3 }),
          projectService.getAll({ limit: 4 }),
          galleryService.getAll(),
          testimonialService.getAll(),
          settingsService.get()
        ]);

        if (featuredRes.data.success) setFeaturedProjects(featuredRes.data.data);
        if (latestRes.data.success) setLatestProjects(latestRes.data.data);
        if (galleryRes.data.success) setGalleryImages(galleryRes.data.data.slice(0, 6));
        if (testimonialRes.data.success) setTestimonials(testimonialRes.data.data);
        if (settingsRes.data.success) setSiteSettings(settingsRes.data.data);
      } catch (error) {
        console.error('Data fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-pavbg min-h-screen">
      <Hero />

      {/* ABOUT SECTION */}
      <section id="about" className="py-32 px-6">
        <div className="container-custom flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <h2 className="text-pavgold text-sm font-black uppercase tracking-[0.5em] mb-6">Manifesto</h2>
            <h1 className="section-title mb-10">{t('about')}</h1>
            <p className="text-gray-400 text-xl md:text-2xl font-medium leading-relaxed mb-16">
              A PavSoftware é uma startup que une inovação e estética para desenvolver softwares, aplicações web e mobile com excelência técnica e impacto real. Nosso foco é entregar experiências digitais de alto nível que geram valor para os nossos clientes.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Projetos', val: '24+' },
                { label: 'Clientes', val: '12+' },
                { label: 'Países', val: '03' },
                { label: 'Anos', val: '02' }
              ].map((stat, i) => (
                <div key={i} className="p-8 bg-pavcard border border-pavborder rounded-3xl">
                  <p className="text-3xl font-black text-white mb-2">{stat.val}</p>
                  <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section id="featured" className="py-32 bg-pavdark/50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <h2 className="text-pavgold text-sm font-black uppercase tracking-[0.5em] mb-4">Elite Selection</h2>
              <h1 className="section-title !mb-0">{t('featured_projects')}</h1>
            </div>
            <Link to="/projects" className="group flex items-center gap-3 text-white font-black text-xs uppercase tracking-[0.2em] hover:text-pavgold transition-colors pb-2">
              Explore All Works <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="space-y-24">
            {featuredProjects.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div 
                  className="w-full lg:w-3/5 group relative rounded-[3rem] overflow-hidden border border-pavborder shadow-premium bg-pavcard cursor-zoom-in"
                  onClick={() => setSelectedImage({ imageUrl: project.imageUrl, caption: project.title })}
                >
                  <img src={project.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-pavdark/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
                    <a href={project.liveUrl} onClick={(e) => e.stopPropagation()} className="p-5 bg-white rounded-full text-black hover:bg-pavgold transition-all"><ExternalLink size={24} /></a>
                    <a href={project.githubUrl} onClick={(e) => e.stopPropagation()} className="p-5 bg-white rounded-full text-black hover:bg-pavgold transition-all"><Github size={24} /></a>
                  </div>
                </div>
                <div className="w-full lg:w-2/5 space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-[2px] bg-pavgold"></span>
                    <span className="text-pavgold text-xs font-black uppercase tracking-widest">{project.type}</span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black text-white leading-tight">{project.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-6 items-center pt-4">
                    <Link to={`/projects/${project.id}`} className="btn-primary">Detalhes</Link>
                    {!project.isFree && (
                      <span className="text-pavgold font-black text-xl tracking-tight">
                        {formatCurrency(project.price)}
                      </span>
                    )}
                    <a href="https://wa.me/244951752335" className="text-white/40 hover:text-pavgold font-black text-[10px] uppercase tracking-widest transition-all">Queres Semelhante?</a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST PROJECTS GRID */}
      <section className="py-32">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 className="text-pavgold text-sm font-black uppercase tracking-[0.5em] mb-4">{t('latest')}</h2>
            <h1 className="section-title">{t('latest_projects')}</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {latestProjects.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="pav-card group"
              >
                <div className="aspect-square relative overflow-hidden bg-pavdark">
                  <img src={project.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                  <div className="absolute inset-0 bg-pavdark/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-3">
                    <Link to={`/projects/${project.id}`} className="p-3 bg-white rounded-full text-black hover:bg-pavgold transition-all"><ChevronRight size={20} /></Link>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-pavgold text-[10px] font-black uppercase tracking-widest mb-3 opacity-60">{project.type}</p>
                  <h4 className="text-white font-bold text-lg mb-2">{project.title}</h4>
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{project.isFree ? 'Free' : formatCurrency(project.price)}</span>
                    <Link to={`/projects/${project.id}`} className="text-white hover:text-pavgold transition-colors"><ArrowRight size={18} /></Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="py-32 bg-pavdark/30">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <h2 className="text-pavgold text-sm font-black uppercase tracking-[0.5em] mb-4">Aesthetics</h2>
              <h1 className="section-title !mb-0">{t('gallery')}</h1>
            </div>
            <Link to="/gallery" className="btn-outline">View Collection</Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
            {galleryImages.map((img, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="aspect-square rounded-3xl overflow-hidden border border-pavborder bg-pavcard cursor-zoom-in"
                onClick={() => setSelectedImage({ imageUrl: img.imageUrl, caption: img.caption })}
              >
                <img src={img.imageUrl} alt="" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SLIDER (SIMPLIFIED) */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] -z-10"></div>
        <div className="container-custom text-center">
          <h2 className="text-pavgold text-sm font-black uppercase tracking-[0.5em] mb-4">Feedback</h2>
          <h1 className="section-title mb-20">{t('testimonials')}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-left">
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-pavcard p-12 rounded-[3.5rem] border border-pavborder relative shadow-2xl"
              >
                <Quote className="absolute top-10 right-12 text-pavgold/10 w-16 h-16" />
                <div className="flex gap-1 mb-8 text-pavgold">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-300 text-lg italic mb-10 leading-relaxed font-medium">"{t.content}"</p>
                <div className="flex items-center gap-4 pt-8 border-t border-pavborder">
                  <img src={t.avatarUrl || 'https://via.placeholder.com/100'} alt="" className="w-14 h-14 rounded-full border-2 border-pavgold/20" />
                  <div>
                    <h4 className="text-white font-bold">{t.name}</h4>
                    <p className="text-pavgold text-[10px] font-black uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-32 px-6">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-pavgold/10 via-pavcard to-pavdark rounded-[4rem] border border-pavgold/20 p-16 md:p-24 relative overflow-hidden flex flex-col md:flex-row gap-20 items-center shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-pavgold/5 rounded-full blur-[120px] -z-10"></div>
            
            <div className="flex-grow space-y-10 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">Vamos construir <br/> algo <span className="text-pavgold glow-gold">lendário?</span></h1>
              <div className="flex flex-col sm:flex-row gap-8 justify-center md:justify-start text-gray-500 font-bold uppercase tracking-widest text-xs">
                <span className="flex items-center gap-3"><Phone size={16} className="text-pavgold" /> {siteSettings.phone}</span>
                <span className="flex items-center gap-3"><Mail size={16} className="text-pavgold" /> {siteSettings.email}</span>
              </div>
              <div className="flex gap-4 justify-center md:justify-start">
                <button className="btn-primary !px-12 !py-6 text-base">{t('talk_to_us')}</button>
                <Link to="/projects" className="btn-outline !py-6">{t('see_portfolio')}</Link>
              </div>
            </div>

            <div className="flex flex-col gap-6 w-full max-w-md bg-pavdark/50 backdrop-blur-xl p-10 rounded-[3rem] border border-pavborder shadow-premium">
              <h3 className="text-white font-black text-xl mb-4">Direct Message</h3>
              <input type="text" placeholder="Nome" className="admin-input w-full" />
              <input type="email" placeholder="Email" className="admin-input w-full" />
              <textarea placeholder="Mensagem" rows="3" className="admin-input w-full"></textarea>
              <button className="btn-primary w-full justify-center mt-4">
                Enviar <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
      <ImageModal 
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage?.imageUrl}
        caption={selectedImage?.caption}
      />
    </div>
  );
};

export default Home;
