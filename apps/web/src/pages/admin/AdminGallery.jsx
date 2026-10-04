import { useState, useEffect } from 'react';
import { galleryService } from '../../services/api';
import { Plus, Trash2, X, Image as ImageIcon, Check, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ caption: '', image: null });

  useEffect(() => { fetchImages(); }, []);

  const fetchImages = async () => {
    try {
      const response = await galleryService.getAll();
      if (response.data.success) setImages(response.data.data);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) return;

    const data = new FormData();
    data.append('caption', formData.caption);
    data.append('image', formData.image);
    try {
      await galleryService.upload(data);
      setShowModal(false);
      setFormData({ caption: '', image: null });
      fetchImages();
    } catch (error) { alert('Error uploading'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Erase this asset from gallery?')) {
      try {
        await galleryService.delete(id);
        fetchImages();
      } catch (error) { alert('Error deleting'); }
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">Gallery Assets</h1>
          <p className="text-gray-500 font-medium">Visual library for your portfolio showcase.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)} 
          className="btn-primary !px-10"
        >
          <Plus size={20} />
          New Asset
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-40">
          <div className="w-12 h-12 border-4 border-pavgold border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {images.map((img) => (
            <motion.div 
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group bg-pavcard rounded-[2rem] overflow-hidden border border-pavborder shadow-premium aspect-square"
            >
              <img src={img.imageUrl} alt="" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-pavdark/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 p-4 text-center">
                <p className="text-white text-xs font-bold uppercase tracking-widest mb-2 line-clamp-2">{img.caption || 'No Caption'}</p>
                <div className="flex gap-2">
                  <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-pavgold hover:text-black transition-all">
                    <Maximize2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(img.id)} className="p-3 bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          {images.length === 0 && (
            <div className="col-span-full py-40 text-center bg-pavcard rounded-[3rem] border border-dashed border-pavborder">
              <ImageIcon size={48} className="mx-auto text-pavborder mb-4" />
              <p className="text-gray-600 font-bold uppercase tracking-widest">Gallery is Empty</p>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-md bg-pavcard rounded-[3rem] border border-pavborder shadow-2xl p-10"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black text-white">Upload Asset</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white"><X size={24} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Asset Caption</label>
                  <input type="text" value={formData.caption} onChange={(e) => setFormData({...formData, caption: e.target.value})} className="admin-input w-full" placeholder="e.g. System Interface" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Image File</label>
                  <div className="relative">
                    <input type="file" onChange={(e) => setFormData({...formData, image: e.target.files[0]})} required className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                    <div className="admin-input w-full flex items-center gap-4 text-gray-600 border-dashed">
                      <Plus size={18} />
                      <span>{formData.image ? formData.image.name : 'Select image...'}</span>
                    </div>
                  </div>
                </div>
                <div className="pt-6 flex gap-4">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-grow btn-outline">Cancel</button>
                  <button type="submit" className="flex-[2] btn-primary justify-center">
                    <Check size={20} />
                    Confirm Upload
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminGallery;
