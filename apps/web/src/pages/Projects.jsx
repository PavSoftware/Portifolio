import { useState, useEffect } from 'react';
import { Search, ExternalLink, Github, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projectService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import ImageModal from '../components/ImageModal';
import { formatCurrency } from '../utils/format';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectService.getAll();
        if (response.data.success) {
          setProjects(response.data.data);
        }
      } catch (error) {
        console.error('API Error:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(p => {
    const matchesFilter = filter === 'all' || p.type === filter;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-40 pb-32 px-6 min-h-screen">
      <div className="container-custom">
        <div className="max-w-4xl mb-20">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
            {t('all_projects')}
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl font-medium leading-relaxed">
            Explore our complete catalog of innovative solutions, from web platforms to complex APIs.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row gap-8 mb-20 items-center justify-between">
          <div className="relative w-full lg:w-[450px]">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 w-6 h-6" />
            <input 
              type="text" 
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-pavmid/50 backdrop-blur-sm border border-gray-800 rounded-3xl py-5 pl-16 pr-8 text-white focus:border-pavgold focus:outline-none transition-all shadow-2xl"
            />
          </div>

          <div className="flex gap-4 overflow-x-auto w-full lg:w-auto pb-4 lg:pb-0 scrollbar-hide">
            {['all', 'web', 'mobile', 'api', 'template'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-10 py-4 rounded-2xl border-2 transition-all capitalize font-black tracking-widest text-sm ${filter === type ? 'bg-pavgold border-pavgold text-black shadow-2xl shadow-pavgold/30' : 'border-gray-800 text-gray-500 hover:text-white hover:border-gray-700 bg-pavmid/30'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="h-[500px] bg-pavmid rounded-[3rem] animate-pulse border border-gray-800"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div 
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="bg-pavmid/50 rounded-[3rem] overflow-hidden border border-gray-800/50 group hover:border-pavgold/40 transition-all shadow-2xl flex flex-col backdrop-blur-sm"
                >
                  <div 
                    className="aspect-[16/10] bg-pavdark overflow-hidden relative cursor-zoom-in"
                    onClick={() => setSelectedImage({ imageUrl: project.imageUrl, caption: project.title })}
                  >
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="absolute top-6 right-6">
                      <span className="bg-pavdark/90 backdrop-blur-md text-pavgold text-[10px] font-black px-4 py-2 rounded-full border border-pavgold/20 tracking-[0.2em] uppercase">
                        {project.isFree ? 'FREE' : formatCurrency(project.price)}
                      </span>
                    </div>
                  </div>
                  <div className="p-10 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-2 h-2 rounded-full bg-pavgold animate-pulse"></span>
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                        {project.isFree ? 'FREE' : formatCurrency(project.price)}
                      </span>
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4 group-hover:text-pavgold transition-colors tracking-tight leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-10 line-clamp-2 font-medium">
                      {project.description}
                    </p>
                    
                    <div className="mt-auto flex gap-4">
                      <Link to={`/projects/${project.id}`} className="flex-grow py-5 rounded-2xl bg-white text-black hover:bg-pavgold font-black transition-all text-center text-sm uppercase tracking-widest shadow-xl">
                        {t('view_details')}
                      </Link>
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="p-5 rounded-2xl border border-gray-800 text-gray-500 hover:text-white hover:bg-gray-800 transition-all backdrop-blur-md">
                        <Github size={24} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-40 bg-pavmid/20 rounded-[4rem] border-2 border-dashed border-gray-800/50"
          >
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No projects found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query.</p>
          </motion.div>
        )}
      </div>

      <ImageModal 
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage?.imageUrl}
        caption={selectedImage?.caption}
      />
    </div>
  );
};

export default Projects;
