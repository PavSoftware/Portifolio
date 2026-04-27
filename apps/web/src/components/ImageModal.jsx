import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Download } from 'lucide-react';

const ImageModal = ({ isOpen, onClose, imageUrl, caption }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/95 backdrop-blur-xl cursor-zoom-out"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative max-w-7xl w-full h-full flex flex-col items-center justify-center pointer-events-none"
        >
          {/* Controls */}
          <div className="absolute top-0 right-0 p-6 flex gap-4 pointer-events-auto">
            <a 
              href={imageUrl} 
              download 
              className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-pavgold hover:text-black transition-all shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Download size={24} />
            </a>
            <button 
              onClick={onClose}
              className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-red-500 transition-all shadow-2xl"
            >
              <X size={24} />
            </button>
          </div>

          {/* Image Container */}
          <div className="relative group flex flex-col items-center pointer-events-auto">
            <img 
              src={imageUrl} 
              alt={caption} 
              className="max-h-[80vh] w-auto object-contain rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
            
            {caption && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 px-8 py-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10"
              >
                <p className="text-white font-black uppercase tracking-[0.3em] text-sm">{caption}</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ImageModal;
