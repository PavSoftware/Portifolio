import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Github, ExternalLink, MessageSquare, ChevronLeft, Calendar, Tag, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { projectService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import ImageModal from '../components/ImageModal';
import { formatCurrency } from '../utils/format';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLightbox, setShowLightbox] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await projectService.getById(id);
        if (response.data.success) {
          setProject(response.data.data);
        }
      } catch (error) {
        console.error('API Error:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return (
    <div className="pt-40 pb-20 px-6 min-h-screen container-custom">
      <div className="animate-pulse">
        <div className="h-10 w-48 bg-pavmid rounded-xl mb-12"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="h-[600px] bg-pavmid rounded-[3rem]"></div>
          <div className="space-y-10">
            <div className="h-20 w-3/4 bg-pavmid rounded-3xl"></div>
            <div className="h-40 w-full bg-pavmid rounded-3xl"></div>
            <div className="h-12 w-1/2 bg-pavmid rounded-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!project) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pavdark">
      <h2 className="text-3xl font-bold text-white mb-6">Project not found</h2>
      <Link to="/projects" className="btn-primary">
        <ChevronLeft size={20} />
        {t('back_to_projects')}
      </Link>
    </div>
  );

  return (
    <div className="pt-40 pb-32 px-6 min-h-screen">
      <div className="container-custom max-w-7xl">
        <Link to="/projects" className="flex items-center gap-3 text-gray-500 hover:text-pavgold transition-all mb-16 w-fit group">
          <div className="p-3 rounded-2xl bg-pavmid/50 border border-gray-800 group-hover:bg-pavgold group-hover:text-black transition-all group-hover:scale-110">
            <ChevronLeft size={24} />
          </div>
          <span className="font-black uppercase tracking-widest text-sm">{t('back_to_projects')}</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Image/Media Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[3rem] overflow-hidden bg-pavmid border-4 border-gray-800/50 shadow-[0_0_100px_rgba(0,0,0,0.5)] lg:sticky lg:top-40 cursor-zoom-in"
            onClick={() => setShowLightbox(true)}
          >
            <img src={project.imageUrl} alt={project.title} className="w-full h-auto hover:scale-105 transition-transform duration-1000" />
            <div className="absolute top-8 left-8">
              <span className="bg-pavdark/90 backdrop-blur-xl text-pavgold text-[10px] font-black px-6 py-3 rounded-full border border-pavgold/30 tracking-[0.3em] uppercase shadow-2xl">
                {project.type}
              </span>
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col pt-4"
          >
            <div className="flex flex-wrap gap-4 mb-10">
              <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-pavmid/50 border border-gray-800 text-gray-400 text-xs font-bold uppercase tracking-widest">
                <Calendar size={16} className="text-pavgold" />
                {new Date(project.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-pavmid/50 border border-gray-800 text-gray-400 text-xs font-bold uppercase tracking-widest">
                <Tag size={16} className="text-pavgold" />
                {project.isFree ? 'Free Access' : `Premium License - ${formatCurrency(project.price)}`}
              </div>
              <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-pavgold/10 border border-pavgold/20 text-pavgold text-xs font-bold uppercase tracking-widest">
                <ShieldCheck size={16} />
                Verified by PavSoftware
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-10 leading-[1.1] tracking-tight">
              {project.title}
            </h1>

            <div className="prose prose-invert max-w-none mb-16">
              <p className="text-gray-400 text-xl md:text-2xl leading-relaxed font-medium">
                {project.description}
              </p>
            </div>

            {project.stack && project.stack.length > 0 && (
              <div className="mb-16 p-10 rounded-[2.5rem] bg-pavmid/30 border border-gray-800/50 backdrop-blur-sm">
                <h3 className="text-white font-black mb-8 uppercase tracking-[0.3em] text-[10px] opacity-40">{t('tech_stack')}</h3>
                <div className="flex flex-wrap gap-3">
                  {project.stack.map(tech => (
                    <span key={tech} className="bg-pavdark/80 border border-gray-800 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:border-pavgold/50 hover:text-pavgold transition-all cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary !py-6 !px-10 justify-center shadow-2xl shadow-pavgold/30 hover:scale-[1.02] active:scale-95 text-lg font-black uppercase tracking-widest">
                    <ExternalLink size={24} />
                    {t('live_demo')}
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="px-10 py-6 rounded-full border-2 border-gray-800 text-white hover:bg-gray-800 transition-all flex items-center gap-4 justify-center font-black uppercase tracking-widest text-lg active:scale-95">
                    <Github size={24} />
                    {t('source_code')}
                  </a>
                )}
              </div>
              <a href="https://wa.me/244951752335" target="_blank" rel="noreferrer" className="group w-full flex items-center justify-center gap-4 py-8 rounded-[2rem] bg-[#25D366]/5 text-[#25D366] hover:bg-[#25D366]/10 border-2 border-[#25D366]/20 transition-all font-black text-xl mt-4 shadow-2xl overflow-hidden relative">
                <motion.div 
                  className="absolute inset-0 bg-[#25D366]/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                />
                <MessageSquare size={30} className="relative z-10" />
                <span className="relative z-10 uppercase tracking-widest">{t('contact_similar')}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <ImageModal 
        isOpen={showLightbox}
        onClose={() => setShowLightbox(false)}
        imageUrl={project.imageUrl}
        caption={project.title}
      />
    </div>
  );
};

export default ProjectDetails;
