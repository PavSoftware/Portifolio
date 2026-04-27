import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { Image as ImageIcon, Maximize2 } from 'lucide-react';
import ImageModal from '../components/ImageModal';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await galleryService.getAll();
        if (response.data.success) {
          setImages(response.data.data);
        }
      } catch (error) {
        console.error('Gallery API Error:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="pt-40 pb-32 px-6 min-h-screen">
      <div className="container-custom">
        <div className="max-w-4xl mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-pavgold/10 text-pavgold border border-pavgold/20">
              <ImageIcon size={28} />
            </div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-pavgold opacity-60">Visual Assets</h2>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tight leading-none">
            {t('gallery')}
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl font-medium leading-relaxed max-w-2xl">
            A visual showcase of our technical journey, creative processes, and the premium results we deliver.
          </p>
        </div>

        {loading ? (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-8 space-y-8">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="w-full bg-pavmid rounded-[2.5rem] animate-pulse border border-gray-800" style={{ height: `${200 + Math.random() * 300}px` }}></div>
            ))}
          </div>
        ) : images.length > 0 ? (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-8 space-y-8">
            <AnimatePresence>
              {images.map((img, idx) => (
                <motion.div 
                  key={img.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  className="relative group overflow-hidden rounded-[2.5rem] bg-pavmid border border-gray-800/50 hover:border-pavgold/40 transition-all shadow-2xl break-inside-avoid cursor-zoom-in"
                  onClick={() => setSelectedImage(img)}
                >
                  <img 
                    src={img.imageUrl} 
                    alt={img.caption} 
                    className="w-full h-auto object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pavdark via-pavdark/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                    <div className="translate-y-6 group-hover:translate-y-0 transition-all duration-500 delay-75">
                      <h4 className="text-pavgold font-black text-xl mb-2 tracking-tight">
                        {img.caption || 'Project Asset'}
                      </h4>
                      <p className="text-gray-400 text-sm font-medium">
                        PavSoftware Digital Excellence
                      </p>
                    </div>
                    <div className="absolute top-8 right-8 p-3 rounded-full bg-white/10 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110 hover:bg-pavgold hover:text-black">
                      <Maximize2 size={20} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-40 bg-pavmid/20 rounded-[4rem] border-2 border-dashed border-gray-800/50">
            <div className="p-8 rounded-full bg-pavmid/50 w-24 h-24 flex items-center justify-center mx-auto mb-8 border border-gray-800">
              <ImageIcon size={40} className="text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No images found</h3>
            <p className="text-gray-500">Our visual gallery is currently being curated.</p>
          </div>
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

export default Gallery;
